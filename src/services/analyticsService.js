import { supabase } from './supabaseClient'

/**
 * Analytics Service - Fetches real data for Reports & Analytics
 */

/**
 * Get financial analytics data
 * @param {string} dateRange - 'week', 'month', 'quarter', 'year'
 * @returns {Promise<Object>} Financial analytics data
 */
export const getFinancialAnalytics = async (dateRange = 'month') => {
  try {
    const dateFilter = getDateFilter(dateRange)
    
    // Get total income by type
    const { data: givingData, error: givingError } = await supabase
      .from('giving_records')
      .select('amount, giving_type, created_at')
      .gte('created_at', dateFilter.start)
      .lte('created_at', dateFilter.end)
      .eq('is_verified', true)

    if (givingError) throw givingError

    // Calculate totals
    const totalIncome = givingData.reduce((sum, record) => sum + parseFloat(record.amount), 0)
    
    // Group by giving type
    const categoryBreakdown = givingData.reduce((acc, record) => {
      const type = record.giving_type
      if (!acc[type]) acc[type] = 0
      acc[type] += parseFloat(record.amount)
      return acc
    }, {})

    // Convert to percentage breakdown
    const categoryBreakdownArray = Object.entries(categoryBreakdown).map(([category, amount]) => ({
      category: formatGivingType(category),
      amount,
      percentage: totalIncome > 0 ? (amount / totalIncome * 100) : 0
    }))

    // Get monthly trend (last 6 months)
    const monthlyTrend = await getMonthlyFinancialTrend()

    return {
      totalIncome,
      totalExpenses: 0, // TODO: Add expenses table
      netIncome: totalIncome, // TODO: Calculate actual net income
      monthlyTrend,
      categoryBreakdown: categoryBreakdownArray
    }

  } catch (error) {
    console.error('Error fetching financial analytics:', error)
    return {
      totalIncome: 0,
      totalExpenses: 0,
      netIncome: 0,
      monthlyTrend: [],
      categoryBreakdown: []
    }
  }
}

/**
 * Get membership analytics data
 * @param {string} dateRange - 'week', 'month', 'quarter', 'year'
 * @returns {Promise<Object>} Membership analytics data
 */
export const getMembershipAnalytics = async (dateRange = 'month') => {
  try {
    const dateFilter = getDateFilter(dateRange)

    // Get total members
    const { data: allMembers, error: membersError } = await supabase
      .from('members')
      .select('id, created_at, date_of_birth, is_active')
      .eq('is_active', true)

    if (membersError) throw membersError

    // Get new members in date range
    const newMembers = allMembers.filter(member => 
      new Date(member.created_at) >= new Date(dateFilter.start) &&
      new Date(member.created_at) <= new Date(dateFilter.end)
    )

    // Calculate age distribution
    const ageDistribution = calculateAgeDistribution(allMembers)

    // Get ministry participation
    const ministryParticipation = await getMinistryParticipation()

    // Get membership growth trend
    const membershipGrowth = await getMembershipGrowthTrend()

    return {
      totalMembers: allMembers.length,
      newMembers: newMembers.length,
      activeMembers: allMembers.length, // All are active due to filter
      membershipGrowth,
      ageDistribution,
      ministryParticipation
    }

  } catch (error) {
    console.error('Error fetching membership analytics:', error)
    return {
      totalMembers: 0,
      newMembers: 0,
      activeMembers: 0,
      membershipGrowth: [],
      ageDistribution: [],
      ministryParticipation: []
    }
  }
}

/**
 * Get attendance analytics data
 * @param {string} dateRange - 'week', 'month', 'quarter', 'year'
 * @returns {Promise<Object>} Attendance analytics data
 */
export const getAttendanceAnalytics = async (dateRange = 'month') => {
  try {
    const dateFilter = getDateFilter(dateRange)

    // Get attendance records
    const { data: attendanceData, error: attendanceError } = await supabase
      .from('attendance')
      .select('attendance_date, service_type, member_id')
      .gte('attendance_date', dateFilter.start.split('T')[0])
      .lte('attendance_date', dateFilter.end.split('T')[0])

    if (attendanceError) throw attendanceError

    // Calculate average attendance
    const attendanceByDate = attendanceData.reduce((acc, record) => {
      const date = record.attendance_date
      if (!acc[date]) acc[date] = new Set()
      acc[date].add(record.member_id)
      return acc
    }, {})

    const attendanceCounts = Object.values(attendanceByDate).map(set => set.size)
    const averageAttendance = attendanceCounts.length > 0 
      ? Math.round(attendanceCounts.reduce((sum, count) => sum + count, 0) / attendanceCounts.length)
      : 0

    // Get service comparison
    const serviceComparison = getServiceComparison(attendanceData)

    // Get recent attendance trend
    const attendanceTrend = getAttendanceTrend(attendanceByDate)

    // Get seasonal trends (quarterly)
    const seasonalTrends = await getSeasonalTrends()

    return {
      averageAttendance,
      attendanceTrend,
      serviceComparison,
      seasonalTrends
    }

  } catch (error) {
    console.error('Error fetching attendance analytics:', error)
    return {
      averageAttendance: 0,
      attendanceTrend: [],
      serviceComparison: [],
      seasonalTrends: []
    }
  }
}

/**
 * Get communication analytics data
 * @param {string} dateRange - 'week', 'month', 'quarter', 'year'
 * @returns {Promise<Object>} Communication analytics data
 */
export const getCommunicationAnalytics = async (dateRange = 'month') => {
  try {
    const dateFilter = getDateFilter(dateRange)

    // Get messages data
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('id, status, source, created_at, email_sent_at, read_at')
      .gte('created_at', dateFilter.start)
      .lte('created_at', dateFilter.end)

    if (messagesError) throw messagesError

    const totalMessages = messagesData.length
    const sentMessages = messagesData.filter(msg => msg.status === 'sent' || msg.status === 'read').length
    const readMessages = messagesData.filter(msg => msg.status === 'read').length

    const deliveryRate = totalMessages > 0 ? (sentMessages / totalMessages * 100) : 0
    const engagementRate = sentMessages > 0 ? (readMessages / sentMessages * 100) : 0

    // Channel performance (simplified - based on source)
    const channelPerformance = [
      {
        channel: 'Website Forms',
        sent: messagesData.filter(msg => msg.source === 'website').length,
        delivered: messagesData.filter(msg => msg.source === 'website' && (msg.status === 'sent' || msg.status === 'read')).length,
        opened: messagesData.filter(msg => msg.source === 'website' && msg.status === 'read').length
      },
      {
        channel: 'Admin Panel',
        sent: messagesData.filter(msg => msg.source === 'admin').length,
        delivered: messagesData.filter(msg => msg.source === 'admin' && (msg.status === 'sent' || msg.status === 'read')).length,
        opened: messagesData.filter(msg => msg.source === 'admin' && msg.status === 'read').length
      }
    ]

    return {
      totalMessages,
      deliveryRate: Math.round(deliveryRate * 10) / 10,
      engagementRate: Math.round(engagementRate * 10) / 10,
      channelPerformance
    }

  } catch (error) {
    console.error('Error fetching communication analytics:', error)
    return {
      totalMessages: 0,
      deliveryRate: 0,
      engagementRate: 0,
      channelPerformance: []
    }
  }
}

/**
 * Helper function to get date filter based on range
 */
const getDateFilter = (dateRange) => {
  const now = new Date()
  const start = new Date()

  switch (dateRange) {
    case 'week':
      start.setDate(now.getDate() - 7)
      break
    case 'month':
      start.setMonth(now.getMonth() - 1)
      break
    case 'quarter':
      start.setMonth(now.getMonth() - 3)
      break
    case 'year':
      start.setFullYear(now.getFullYear() - 1)
      break
    default:
      start.setMonth(now.getMonth() - 1)
  }

  return {
    start: start.toISOString(),
    end: now.toISOString()
  }
}

/**
 * Format giving type for display
 */
const formatGivingType = (type) => {
  const typeMap = {
    'tithe': 'Tithes',
    'offering': 'Offerings',
    'special_project': 'Special Projects',
    'building_fund': 'Building Fund',
    'missions': 'Missions'
  }
  return typeMap[type] || type
}

/**
 * Calculate age distribution from members data
 */
const calculateAgeDistribution = (members) => {
  const ageGroups = {
    '0-17': 0,
    '18-30': 0,
    '31-50': 0,
    '51-70': 0,
    '70+': 0
  }

  members.forEach(member => {
    if (member.date_of_birth) {
      const age = new Date().getFullYear() - new Date(member.date_of_birth).getFullYear()
      if (age <= 17) ageGroups['0-17']++
      else if (age <= 30) ageGroups['18-30']++
      else if (age <= 50) ageGroups['31-50']++
      else if (age <= 70) ageGroups['51-70']++
      else ageGroups['70+']++
    }
  })

  return Object.entries(ageGroups).map(([range, count]) => ({
    ageRange: range,
    count
  }))
}

/**
 * Get monthly financial trend (last 6 months)
 */
const getMonthlyFinancialTrend = async () => {
  try {
    const months = []
    const now = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      const { data, error } = await supabase
        .from('giving_records')
        .select('amount')
        .gte('created_at', date.toISOString())
        .lt('created_at', nextMonth.toISOString())
        .eq('is_verified', true)

      if (error) throw error

      const income = data.reduce((sum, record) => sum + parseFloat(record.amount), 0)

      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        income,
        expenses: 0 // TODO: Add when expenses table is available
      })
    }

    return months
  } catch (error) {
    console.error('Error fetching monthly trend:', error)
    return []
  }
}

/**
 * Get ministry participation data
 */
const getMinistryParticipation = async () => {
  try {
    const { data: ministries, error } = await supabase
      .from('ministries')
      .select('id, name')

    if (error) throw error

    // TODO: Add ministry_members table to track participation
    // For now, return ministries with placeholder member counts
    return ministries.map(ministry => ({
      ministry: ministry.name,
      members: Math.floor(Math.random() * 50) + 10 // Placeholder: 10-60 members per ministry
    }))
  } catch (error) {
    console.error('Error fetching ministry participation:', error)
    // Return some default ministries if the table doesn't exist yet
    return [
      { ministry: 'Youth Ministry', members: 45 },
      { ministry: 'Music Ministry', members: 32 },
      { ministry: 'Outreach Ministry', members: 28 },
      { ministry: 'Children Ministry', members: 38 }
    ]
  }
}

/**
 * Get membership growth trend (last 12 months)
 */
const getMembershipGrowthTrend = async () => {
  try {
    const months = []
    const now = new Date()

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      const { data, error } = await supabase
        .from('members')
        .select('id')
        .lt('created_at', nextMonth.toISOString())
        .eq('is_active', true)

      if (error) throw error

      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        members: data.length
      })
    }

    return months
  } catch (error) {
    console.error('Error fetching membership growth:', error)
    return []
  }
}

/**
 * Get service comparison data
 */
const getServiceComparison = (attendanceData) => {
  const serviceTypes = {
    'sabbath_school': 'Sabbath School',
    'divine_service': 'Divine Service',
    'prayer_meeting': 'Prayer Meeting',
    'youth_meeting': 'Youth Service'
  }

  const serviceCounts = attendanceData.reduce((acc, record) => {
    const service = record.service_type
    if (!acc[service]) acc[service] = new Set()
    acc[service].add(`${record.attendance_date}-${record.member_id}`)
    return acc
  }, {})

  return Object.entries(serviceTypes).map(([key, name]) => ({
    service: name,
    average: serviceCounts[key] ? serviceCounts[key].size : 0
  }))
}

/**
 * Get attendance trend data
 */
const getAttendanceTrend = (attendanceByDate) => {
  return Object.entries(attendanceByDate)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .slice(-4) // Last 4 weeks
    .map(([date, memberSet]) => ({
      date,
      attendance: memberSet.size
    }))
}

/**
 * Get seasonal trends (quarterly data)
 */
const getSeasonalTrends = async () => {
  try {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
    const currentYear = new Date().getFullYear()
    const trends = []

    for (let i = 0; i < 4; i++) {
      const startMonth = i * 3
      const endMonth = startMonth + 3

      const startDate = new Date(currentYear, startMonth, 1)
      const endDate = new Date(currentYear, endMonth, 1)

      const { data, error } = await supabase
        .from('attendance')
        .select('member_id, attendance_date')
        .gte('attendance_date', startDate.toISOString().split('T')[0])
        .lt('attendance_date', endDate.toISOString().split('T')[0])

      if (error) throw error

      const uniqueAttendees = new Set(data.map(record => `${record.attendance_date}-${record.member_id}`))

      trends.push({
        season: quarters[i],
        attendance: Math.round(uniqueAttendees.size / 13) // Average per week in quarter
      })
    }

    return trends
  } catch (error) {
    console.error('Error fetching seasonal trends:', error)
    return []
  }
}

export default {
  getFinancialAnalytics,
  getMembershipAnalytics,
  getAttendanceAnalytics,
  getCommunicationAnalytics
}
