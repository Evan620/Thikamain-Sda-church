import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

const SystemSettings = () => {
  const { user, hasRole } = useAuth()
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  // Settings structure
  const settingsConfig = {
    general: {
      title: 'General Settings',
      icon: '⚙️',
      fields: {
        church_name: { label: 'Church Name', type: 'text', required: true },
        church_address: { label: 'Church Address', type: 'textarea' },
        church_phone: { label: 'Phone Number', type: 'tel' },
        church_email: { label: 'Email Address', type: 'email' },
        church_website: { label: 'Website URL', type: 'url' },
        pastor_name: { label: 'Pastor Name', type: 'text' },
        established_year: { label: 'Established Year', type: 'number' },
        denomination: { label: 'Denomination', type: 'text' }
      }
    },
    services: {
      title: 'Service Times',
      icon: '⏰',
      fields: {
        sabbath_service_time: { label: 'Sabbath Service Time', type: 'time' },
        prayer_meeting_time: { label: 'Prayer Meeting Time', type: 'time' },
        youth_meeting_time: { label: 'Youth Meeting Time', type: 'time' },
        bible_study_time: { label: 'Bible Study Time', type: 'time' },
        service_duration: { label: 'Average Service Duration (minutes)', type: 'number' }
      }
    },
    communication: {
      title: 'Communication Settings',
      icon: '📧',
      fields: {
        smtp_host: { label: 'SMTP Host', type: 'text' },
        smtp_port: { label: 'SMTP Port', type: 'number' },
        smtp_username: { label: 'SMTP Username', type: 'text' },
        smtp_password: { label: 'SMTP Password', type: 'password' },
        from_email: { label: 'From Email Address', type: 'email' },
        from_name: { label: 'From Name', type: 'text' },
        sms_provider: { label: 'SMS Provider', type: 'select', options: ['africas_talking', 'twilio', 'other'] },
        sms_api_key: { label: 'SMS API Key', type: 'password' },
        sms_sender_id: { label: 'SMS Sender ID', type: 'text' }
      }
    },
    financial: {
      title: 'Financial Settings',
      icon: '💰',
      fields: {
        currency: { label: 'Currency', type: 'select', options: ['KES', 'USD', 'EUR', 'GBP'] },
        mpesa_consumer_key: { label: 'M-Pesa Consumer Key', type: 'password' },
        mpesa_consumer_secret: { label: 'M-Pesa Consumer Secret', type: 'password' },
        mpesa_shortcode: { label: 'M-Pesa Shortcode', type: 'text' },
        mpesa_passkey: { label: 'M-Pesa Passkey', type: 'password' },
        enable_online_giving: { label: 'Enable Online Giving', type: 'checkbox' },
        financial_year_start: { label: 'Financial Year Start Month', type: 'select', options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] }
      }
    },
    security: {
      title: 'Security Settings',
      icon: '🔒',
      fields: {
        session_timeout: { label: 'Session Timeout (minutes)', type: 'number' },
        password_min_length: { label: 'Minimum Password Length', type: 'number' },
        require_2fa: { label: 'Require Two-Factor Authentication', type: 'checkbox' },
        login_attempts_limit: { label: 'Max Login Attempts', type: 'number' },
        lockout_duration: { label: 'Account Lockout Duration (minutes)', type: 'number' },
        enable_audit_logs: { label: 'Enable Audit Logging', type: 'checkbox' },
        backup_frequency: { label: 'Backup Frequency', type: 'select', options: ['daily', 'weekly', 'monthly'] }
      }
    },
    notifications: {
      title: 'Notification Settings',
      icon: '🔔',
      fields: {
        email_notifications: { label: 'Enable Email Notifications', type: 'checkbox' },
        sms_notifications: { label: 'Enable SMS Notifications', type: 'checkbox' },
        birthday_reminders: { label: 'Send Birthday Reminders', type: 'checkbox' },
        event_reminders: { label: 'Send Event Reminders', type: 'checkbox' },
        payment_confirmations: { label: 'Send Payment Confirmations', type: 'checkbox' },
        attendance_followups: { label: 'Send Attendance Follow-ups', type: 'checkbox' },
        reminder_hours_before: { label: 'Event Reminder Hours Before', type: 'number' }
      }
    }
  }

  // Fetch settings
  const fetchSettings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')

      if (error) throw error

      // Convert array to object for easier access
      const settingsObj = {}
      data?.forEach(setting => {
        settingsObj[setting.key] = setting.value
      })

      setSettings(settingsObj)
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  // Save settings
  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Prepare settings for upsert
      const settingsArray = Object.entries(settings).map(([key, value]) => ({
        key,
        value: typeof value === 'boolean' ? value : String(value),
        updated_by: user.id
      }))

      // Upsert settings
      const { error } = await supabase
        .from('system_settings')
        .upsert(settingsArray, { onConflict: 'key' })

      if (error) throw error

      // Log the activity
      await supabase
        .from('admin_activity_logs')
        .insert([{
          admin_id: user.id,
          action: 'settings_updated',
          details: { tab: activeTab, settings_count: settingsArray.length },
          ip_address: 'Unknown',
          user_agent: navigator.userAgent
        }])

      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Handle input change
  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Render field based on type
  const renderField = (key, field) => {
    const value = settings[key] || ''

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="admin-form-textarea"
            rows={3}
          />
        )
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="admin-form-select"
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        )
      
      case 'checkbox':
        return (
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={value === 'true' || value === true}
              onChange={(e) => handleInputChange(key, e.target.checked)}
              className="admin-checkbox"
            />
            <span>{field.label}</span>
          </label>
        )
      
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            required={field.required}
            className="admin-form-input"
          />
        )
    }
  }

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>Loading system settings...</p>
      </div>
    )
  }

  // Only Super Admins can access system settings
  if (!hasRole('SUPER_ADMIN')) {
    return (
      <div className="admin-access-denied">
        <div className="admin-access-denied-content">
          <svg className="admin-access-denied-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2>Access Denied</h2>
          <p>You need Super Admin privileges to access system settings.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-content-management">
      {/* Header */}
      <div className="admin-content-header">
        <div>
          <h1>System Settings</h1>
          <p>Configure church information and system preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary"
        >
          {saving ? (
            <>
              <div className="admin-btn-spinner"></div>
              Saving...
            </>
          ) : (
            <>
              <svg className="admin-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Settings
            </>
          )}
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="settings-tabs">
        <div className="settings-tab-list">
          {Object.entries(settingsConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`settings-tab ${activeTab === key ? 'active' : ''}`}
            >
              <span className="settings-tab-icon">{config.icon}</span>
              <span className="settings-tab-label">{config.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        <form onSubmit={handleSave}>
          <div className="settings-section">
            <div className="settings-section-header">
              <h2>
                <span className="settings-section-icon">
                  {settingsConfig[activeTab].icon}
                </span>
                {settingsConfig[activeTab].title}
              </h2>
              <p>Configure {settingsConfig[activeTab].title.toLowerCase()} for your church</p>
            </div>

            <div className="settings-fields">
              {Object.entries(settingsConfig[activeTab].fields).map(([key, field]) => (
                <div key={key} className="admin-form-group">
                  {field.type !== 'checkbox' && (
                    <label>
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>
                  )}
                  {renderField(key, field)}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Settings Info Panel */}
      <div className="settings-info-panel">
        <div className="settings-info-card">
          <h3>💡 Configuration Tips</h3>
          <div className="settings-tips">
            {activeTab === 'general' && (
              <ul>
                <li>Church name will appear on all official documents and communications</li>
                <li>Complete address helps with location-based features</li>
                <li>Pastor name is used in automated communications</li>
              </ul>
            )}
            {activeTab === 'communication' && (
              <ul>
                <li>SMTP settings are required for email notifications</li>
                <li>SMS provider integration enables automated messaging</li>
                <li>Test your settings after configuration</li>
              </ul>
            )}
            {activeTab === 'financial' && (
              <ul>
                <li>M-Pesa integration requires valid API credentials</li>
                <li>Currency setting affects all financial displays</li>
                <li>Financial year setting impacts reporting periods</li>
              </ul>
            )}
            {activeTab === 'security' && (
              <ul>
                <li>Strong password requirements improve security</li>
                <li>Session timeout prevents unauthorized access</li>
                <li>Regular backups protect your data</li>
              </ul>
            )}
            {activeTab === 'notifications' && (
              <ul>
                <li>Event reminders increase attendance</li>
                <li>Payment confirmations build trust</li>
                <li>Birthday reminders strengthen relationships</li>
              </ul>
            )}
          </div>
        </div>

        <div className="settings-info-card">
          <h3>🔒 Security Notice</h3>
          <p>
            Sensitive information like API keys and passwords are encrypted and stored securely. 
            Only Super Admins can view and modify these settings.
          </p>
        </div>

        <div className="settings-info-card">
          <h3>📞 Need Help?</h3>
          <p>
            If you need assistance configuring these settings, please contact your system administrator 
            or refer to the documentation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings
