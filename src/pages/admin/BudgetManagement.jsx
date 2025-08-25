import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const BudgetManagement = () => {
  const { user } = useAuth()
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBudgetForm, setShowBudgetForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  
  const [budgetFormData, setBudgetFormData] = useState({
    category: '',
    allocated_amount: '',
    year: new Date().getFullYear(),
    description: ''
  })

  const [expenseFormData, setExpenseFormData] = useState({
    budget_id: '',
    amount: '',
    description: '',
    expense_date: new Date().toISOString().split('T')[0],
    receipt_url: '',
    approved_by: user?.id
  })

  // Fetch budgets and expenses
  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch budgets for selected year
      const { data: budgetData, error: budgetError } = await supabase
        .from('budgets')
        .select('*')
        .eq('year', selectedYear)
        .order('category')

      if (budgetError) throw budgetError

      // Fetch expenses for selected year
      const { data: expenseData, error: expenseError } = await supabase
        .from('expenses')
        .select(`
          *,
          budget:budgets(category)
        `)
        .gte('expense_date', `${selectedYear}-01-01`)
        .lte('expense_date', `${selectedYear}-12-31`)
        .order('expense_date', { ascending: false })

      if (expenseError) throw expenseError

      setBudgets(budgetData || [])
      setExpenses(expenseData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedYear])

  // Handle budget form submission
  const handleBudgetSubmit = async (e) => {
    e.preventDefault()
    try {
      const budgetData = {
        ...budgetFormData,
        allocated_amount: parseFloat(budgetFormData.allocated_amount)
      }

      if (editingBudget) {
        const { error } = await supabase
          .from('budgets')
          .update(budgetData)
          .eq('id', editingBudget.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('budgets')
          .insert([budgetData])

        if (error) throw error
      }

      setBudgetFormData({
        category: '',
        allocated_amount: '',
        year: new Date().getFullYear(),
        description: ''
      })
      setShowBudgetForm(false)
      setEditingBudget(null)
      fetchData()
    } catch (error) {
      console.error('Error saving budget:', error)
      alert('Error saving budget. Please try again.')
    }
  }

  // Handle expense form submission
  const handleExpenseSubmit = async (e) => {
    e.preventDefault()
    try {
      const expenseData = {
        ...expenseFormData,
        amount: parseFloat(expenseFormData.amount)
      }

      if (editingExpense) {
        const { error } = await supabase
          .from('expenses')
          .update(expenseData)
          .eq('id', editingExpense.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('expenses')
          .insert([expenseData])

        if (error) throw error
      }

      setExpenseFormData({
        budget_id: '',
        amount: '',
        description: '',
        expense_date: new Date().toISOString().split('T')[0],
        receipt_url: '',
        approved_by: user?.id
      })
      setShowExpenseForm(false)
      setEditingExpense(null)
      fetchData()
    } catch (error) {
      console.error('Error saving expense:', error)
      alert('Error saving expense. Please try again.')
    }
  }

  // Calculate budget utilization
  const getBudgetUtilization = (budgetId) => {
    const budgetExpenses = expenses.filter(expense => expense.budget_id === budgetId)
    return budgetExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount)
  }

  // Calculate totals
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated_amount, 0)
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBudget = totalAllocated - totalSpent

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading budget data...</p>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>Budget Management</h1>
          <p>Manage church budgets and track expenses</p>
        </div>
        <div className="admin-header-actions">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="admin-form-select"
          >
            {[...Array(5)].map((_, i) => {
              const year = new Date().getFullYear() - 2 + i
              return (
                <option key={year} value={year}>{year}</option>
              )
            })}
          </select>
          <button
            onClick={() => {
              setShowBudgetForm(true)
              setEditingBudget(null)
              setBudgetFormData({
                category: '',
                allocated_amount: '',
                year: selectedYear,
                description: ''
              })
            }}
            className="admin-btn-primary"
          >
            <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Budget
          </button>
          <button
            onClick={() => {
              setShowExpenseForm(true)
              setEditingExpense(null)
              setExpenseFormData({
                budget_id: '',
                amount: '',
                description: '',
                expense_date: new Date().toISOString().split('T')[0],
                receipt_url: '',
                approved_by: user?.id
              })
            }}
            className="admin-btn-secondary"
          >
            <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Expense
          </button>
        </div>
      </div>

      {/* Budget Summary Cards */}
      <div className="financial-summary-cards">
        <div className="financial-card total">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Total Budget</h3>
            <p className="financial-amount">{formatCurrency(totalAllocated)}</p>
            <span className="financial-period">{selectedYear}</span>
          </div>
        </div>

        <div className="financial-card spent">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Total Spent</h3>
            <p className="financial-amount">{formatCurrency(totalSpent)}</p>
            <span className="financial-period">{selectedYear}</span>
          </div>
        </div>

        <div className={`financial-card ${remainingBudget >= 0 ? 'remaining' : 'overbudget'}`}>
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>{remainingBudget >= 0 ? 'Remaining' : 'Over Budget'}</h3>
            <p className="financial-amount">{formatCurrency(Math.abs(remainingBudget))}</p>
            <span className="financial-period">{selectedYear}</span>
          </div>
        </div>

        <div className="financial-card utilization">
          <div className="financial-card-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="financial-card-content">
            <h3>Budget Utilization</h3>
            <p className="financial-amount">
              {totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0}%
            </p>
            <span className="financial-period">{selectedYear}</span>
          </div>
        </div>
      </div>

      {/* Budget Form Modal */}
      {showBudgetForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingBudget ? 'Edit Budget' : 'Add New Budget'}</h2>
              <button
                onClick={() => {
                  setShowBudgetForm(false)
                  setEditingBudget(null)
                }}
                className="admin-modal-close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="admin-modal-content">
              <form onSubmit={handleBudgetSubmit} className="admin-form">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      value={budgetFormData.category}
                      onChange={(e) => setBudgetFormData({...budgetFormData, category: e.target.value})}
                      required
                      className="admin-form-select"
                    >
                      <option value="">Select category</option>
                      <option value="pastoral_care">Pastoral Care</option>
                      <option value="worship_music">Worship & Music</option>
                      <option value="youth_ministry">Youth Ministry</option>
                      <option value="children_ministry">Children's Ministry</option>
                      <option value="outreach_evangelism">Outreach & Evangelism</option>
                      <option value="building_maintenance">Building & Maintenance</option>
                      <option value="utilities">Utilities</option>
                      <option value="office_supplies">Office Supplies</option>
                      <option value="missions">Missions</option>
                      <option value="special_events">Special Events</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Allocated Amount (KES) *</label>
                    <input
                      type="number"
                      value={budgetFormData.allocated_amount}
                      onChange={(e) => setBudgetFormData({...budgetFormData, allocated_amount: e.target.value})}
                      required
                      min="0"
                      step="0.01"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Year *</label>
                    <input
                      type="number"
                      value={budgetFormData.year}
                      onChange={(e) => setBudgetFormData({...budgetFormData, year: parseInt(e.target.value)})}
                      required
                      min="2020"
                      max="2030"
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    value={budgetFormData.description}
                    onChange={(e) => setBudgetFormData({...budgetFormData, description: e.target.value})}
                    rows={3}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBudgetForm(false)
                      setEditingBudget(null)
                    }}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    {editingBudget ? 'Update Budget' : 'Create Budget'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
              <button
                onClick={() => {
                  setShowExpenseForm(false)
                  setEditingExpense(null)
                }}
                className="admin-modal-close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="admin-modal-content">
              <form onSubmit={handleExpenseSubmit} className="admin-form">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Budget Category *</label>
                    <select
                      value={expenseFormData.budget_id}
                      onChange={(e) => setExpenseFormData({...expenseFormData, budget_id: e.target.value})}
                      required
                      className="admin-form-select"
                    >
                      <option value="">Select budget category</option>
                      {budgets.map((budget) => (
                        <option key={budget.id} value={budget.id}>
                          {budget.category.replace('_', ' ')} - {formatCurrency(budget.allocated_amount)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Amount (KES) *</label>
                    <input
                      type="number"
                      value={expenseFormData.amount}
                      onChange={(e) => setExpenseFormData({...expenseFormData, amount: e.target.value})}
                      required
                      min="0"
                      step="0.01"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Expense Date *</label>
                    <input
                      type="date"
                      value={expenseFormData.expense_date}
                      onChange={(e) => setExpenseFormData({...expenseFormData, expense_date: e.target.value})}
                      required
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Description *</label>
                  <textarea
                    value={expenseFormData.description}
                    onChange={(e) => setExpenseFormData({...expenseFormData, description: e.target.value})}
                    required
                    rows={3}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Receipt URL</label>
                  <input
                    type="url"
                    value={expenseFormData.receipt_url}
                    onChange={(e) => setExpenseFormData({...expenseFormData, receipt_url: e.target.value})}
                    placeholder="Link to receipt or invoice"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowExpenseForm(false)
                      setEditingExpense(null)
                    }}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    {editingExpense ? 'Update Expense' : 'Record Expense'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Budget Overview */}
      <div className="budget-overview">
        <div className="financial-section-header">
          <h3>Budget Overview - {selectedYear}</h3>
          <p>Budget allocation and utilization by category</p>
        </div>

        {budgets.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h3>No budgets created</h3>
            <p>Start by creating your first budget category</p>
          </div>
        ) : (
          <div className="budget-categories">
            {budgets.map((budget) => {
              const spent = getBudgetUtilization(budget.id)
              const remaining = budget.allocated_amount - spent
              const utilizationPercent = budget.allocated_amount > 0 ? (spent / budget.allocated_amount) * 100 : 0
              
              return (
                <div key={budget.id} className="budget-category-card">
                  <div className="budget-category-header">
                    <h4>{budget.category.replace('_', ' ')}</h4>
                    <div className="budget-category-actions">
                      <button
                        onClick={() => {
                          setEditingBudget(budget)
                          setBudgetFormData({
                            category: budget.category,
                            allocated_amount: budget.allocated_amount.toString(),
                            year: budget.year,
                            description: budget.description || ''
                          })
                          setShowBudgetForm(true)
                        }}
                        className="admin-btn-sm admin-btn-secondary"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="budget-category-amounts">
                    <div className="budget-amount-item">
                      <span className="budget-amount-label">Allocated</span>
                      <span className="budget-amount-value">{formatCurrency(budget.allocated_amount)}</span>
                    </div>
                    <div className="budget-amount-item">
                      <span className="budget-amount-label">Spent</span>
                      <span className="budget-amount-value spent">{formatCurrency(spent)}</span>
                    </div>
                    <div className="budget-amount-item">
                      <span className="budget-amount-label">Remaining</span>
                      <span className={`budget-amount-value ${remaining >= 0 ? 'remaining' : 'overbudget'}`}>
                        {formatCurrency(Math.abs(remaining))}
                      </span>
                    </div>
                  </div>

                  <div className="budget-progress">
                    <div className="budget-progress-bar">
                      <div 
                        className={`budget-progress-fill ${utilizationPercent > 100 ? 'overbudget' : ''}`}
                        style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                      ></div>
                    </div>
                    <span className="budget-progress-text">
                      {Math.round(utilizationPercent)}% utilized
                    </span>
                  </div>

                  {budget.description && (
                    <p className="budget-category-description">{budget.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Recent Expenses */}
      <div className="financial-recent-expenses">
        <div className="financial-section-header">
          <h3>Recent Expenses</h3>
          <p>Latest expense records for {selectedYear}</p>
        </div>
        
        {expenses.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3>No expenses recorded</h3>
            <p>Expense records will appear here</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Receipt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 10).map((expense) => (
                  <tr key={expense.id}>
                    <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                    <td>
                      <span className="admin-type-badge">
                        {expense.budget?.category?.replace('_', ' ') || 'Unknown'}
                      </span>
                    </td>
                    <td>{expense.description}</td>
                    <td className="financial-amount-cell">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td>
                      {expense.receipt_url ? (
                        <a 
                          href={expense.receipt_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="admin-link"
                        >
                          View Receipt
                        </a>
                      ) : (
                        <span className="text-gray-400">No receipt</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => {
                            setEditingExpense(expense)
                            setExpenseFormData({
                              budget_id: expense.budget_id,
                              amount: expense.amount.toString(),
                              description: expense.description,
                              expense_date: expense.expense_date,
                              receipt_url: expense.receipt_url || '',
                              approved_by: expense.approved_by
                            })
                            setShowExpenseForm(true)
                          }}
                          className="admin-btn-sm admin-btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this expense?')) {
                              try {
                                const { error } = await supabase
                                  .from('expenses')
                                  .delete()
                                  .eq('id', expense.id)

                                if (error) throw error
                                fetchData()
                              } catch (error) {
                                console.error('Error deleting expense:', error)
                                alert('Error deleting expense. Please try again.')
                              }
                            }
                          }}
                          className="admin-btn-sm admin-btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetManagement
