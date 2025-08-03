import React, { useState, useEffect } from 'react'
import { sendContactEmail, validateEmailConfig } from '../services/emailService'

const SubmissionForm = ({ submissionType, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
    anonymous: false,
    requestType: submissionType?.id || 'general',
    department: '',
    preferredContactMethod: 'email',
    // Prayer-specific fields
    prayerType: '',
    prayerPrivacy: 'private',
    // Visitation-specific fields
    visitationType: '',
    visitationAddress: '',
    visitationDate: '',
    visitationTime: '',
    // Report-specific fields
    reportType: '',
    reportPeriod: '',
    reportFiles: [],
    // Counseling-specific fields
    counselingType: '',
    counselingUrgency: 'normal',
    preferredCounselor: '',
    // Event-specific fields
    eventTitle: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventBudget: '',
    eventAttendees: '',
    // Maintenance-specific fields
    maintenanceLocation: '',
    maintenancePriority: 'normal',
    maintenanceImages: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isEmailConfigured, setIsEmailConfigured] = useState(true)

  useEffect(() => {
    setIsEmailConfigured(validateEmailConfig())
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const getRecipientInfo = () => {
    switch (submissionType?.id) {
      case 'prayer':
        return { name: 'Prayer Ministry Team', role: 'Prayer Coordinator', email: 'prayer@thikamainsdachurch.org' }
      case 'visitation':
        return { name: 'Pastoral Care Team', role: 'Visitation Coordinator', email: 'pastoral@thikamainsdachurch.org' }
      case 'reports':
        return { name: 'Church Secretary', role: 'Administrative Coordinator', email: 'secretary@thikamainsdachurch.org' }
      case 'counseling':
        return { name: 'Pastor', role: 'Senior Pastor', email: 'pastor@thikamainsdachurch.org' }
      case 'events':
        return { name: 'Events Committee', role: 'Events Coordinator', email: 'events@thikamainsdachurch.org' }
      case 'maintenance':
        return { name: 'Facilities Team', role: 'Maintenance Coordinator', email: 'facilities@thikamainsdachurch.org' }
      default:
        return { name: 'Church Leadership', role: 'Administrative Team', email: 'admin@thikamainsdachurch.org' }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      const recipient = getRecipientInfo()
      const submissionData = {
        ...formData,
        recipientName: recipient.name,
        recipientRole: recipient.role,
        submissionType: submissionType?.title || 'General Request',
        timestamp: new Date().toISOString()
      }

      await sendContactEmail(submissionData)
      setSubmitStatus('success')
      setTimeout(() => onClose(), 2500)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error?.message || 'Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isMobile = window.innerWidth < 768

  const getSpecificFields = () => {
    switch (submissionType?.id) {
      case 'prayer':
        return (
          <div>
            {/* Prayer Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Prayer Request Type <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select name="prayerType" value={formData.prayerType} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">Select type...</option>
                <option value="health">Health & Healing</option>
                <option value="family">Family Matters</option>
                <option value="financial">Financial Needs</option>
                <option value="spiritual">Spiritual Guidance</option>
                <option value="thanksgiving">Thanksgiving & Praise</option>
                <option value="church">Church & Ministry</option>
                <option value="community">Community & World</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Prayer Privacy */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Prayer Request Privacy
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="prayerPrivacy" value="private" checked={formData.prayerPrivacy === 'private'} onChange={handleChange} style={{ accentColor: '#2d5a27' }} />
                  <span style={{ fontSize: '0.9rem', color: '#374151' }}>Private (Pastor/Prayer Team only)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="prayerPrivacy" value="public" checked={formData.prayerPrivacy === 'public'} onChange={handleChange} style={{ accentColor: '#2d5a27' }} />
                  <span style={{ fontSize: '0.9rem', color: '#374151' }}>Public (Can be shared with congregation)</span>
                </label>
              </div>
            </div>
          </div>
        )

      case 'visitation':
        return (
          <div>
            {/* Visitation Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Visitation Type <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select name="visitationType" value={formData.visitationType} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">Select type...</option>
                <option value="hospital">Hospital Visit</option>
                <option value="home">Home Visit</option>
                <option value="newmember">New Member Welcome</option>
                <option value="bereavement">Bereavement Support</option>
                <option value="elderly">Elderly Care Visit</option>
                <option value="sick">Sick Member Visit</option>
                <option value="encouragement">Encouragement Visit</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Visit Address <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <textarea name="visitationAddress" value={formData.visitationAddress} onChange={handleChange} required rows={3} placeholder="Full address including directions if needed..." style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151', resize: 'vertical' }} />
            </div>

            {/* Preferred Date and Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Preferred Date
                </label>
                <input type="date" name="visitationDate" value={formData.visitationDate} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Preferred Time
                </label>
                <select name="visitationTime" value={formData.visitationTime} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                  <option value="">Any time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'reports':
        return (
          <div>
            {/* Department/Ministry */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Department/Ministry <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select name="department" value={formData.department} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">Select department...</option>
                <option value="youth">Youth Ministry</option>
                <option value="womens">Women's Ministry</option>
                <option value="mens">Men's Ministry</option>
                <option value="children">Children's Ministry</option>
                <option value="music">Music Ministry</option>
                <option value="evangelism">Evangelism</option>
                <option value="stewardship">Stewardship</option>
                <option value="health">Health Ministry</option>
                <option value="education">Education</option>
                <option value="deacons">Deacons</option>
                <option value="deaconesses">Deaconesses</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Report Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Report Type <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select name="reportType" value={formData.reportType} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">Select report type...</option>
                <option value="monthly">Monthly Activity Report</option>
                <option value="quarterly">Quarterly Report</option>
                <option value="annual">Annual Report</option>
                <option value="event">Event Report</option>
                <option value="financial">Financial Report</option>
                <option value="attendance">Attendance Report</option>
                <option value="project">Project Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Report Period */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Report Period <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input type="text" name="reportPeriod" value={formData.reportPeriod} onChange={handleChange} required placeholder="e.g., January 2024, Q1 2024, 2023 Annual" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Report Documents
              </label>
              <div style={{ border: '2px dashed #e5e7eb', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
                <input type="file" name="reportFiles" onChange={handleChange} multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png" style={{ display: 'none' }} id="reportFiles" />
                <label htmlFor="reportFiles" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                    Click to upload documents or drag and drop
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0 }}>
                    PDF, Word, Excel, PowerPoint, Images (Max 10MB each)
                  </p>
                </label>
                {formData.reportFiles.length > 0 && (
                  <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Selected Files:
                    </p>
                    {formData.reportFiles.map((file, index) => (
                      <div key={index} style={{ fontSize: '0.8rem', color: '#6b7280', padding: '0.25rem 0' }}>
                        📎 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 'counseling':
        return (
          <div>
            {/* Counseling Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Counseling Type <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select name="counselingType" value={formData.counselingType} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">Select counseling type...</option>
                <option value="marriage">Marriage Counseling</option>
                <option value="family">Family Counseling</option>
                <option value="youth">Youth Guidance</option>
                <option value="spiritual">Spiritual Mentoring</option>
                <option value="grief">Grief Counseling</option>
                <option value="addiction">Addiction Support</option>
                <option value="financial">Financial Guidance</option>
                <option value="career">Career/Life Decisions</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Preferred Counselor */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Preferred Counselor
              </label>
              <select name="preferredCounselor" value={formData.preferredCounselor} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">No preference</option>
                <option value="senior-pastor">Senior Pastor</option>
                <option value="associate-pastor">Associate Pastor</option>
                <option value="elder">Church Elder</option>
                <option value="female-counselor">Female Counselor (for women)</option>
                <option value="male-counselor">Male Counselor (for men)</option>
              </select>
            </div>

            {/* Counseling Urgency */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                How soon do you need counseling?
              </label>
              <select name="counselingUrgency" value={formData.counselingUrgency} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="normal">Within a week</option>
                <option value="soon">Within 2-3 days</option>
                <option value="urgent">As soon as possible</option>
                <option value="emergency">Emergency (same day)</option>
              </select>
            </div>
          </div>
        )

      case 'events':
        return (
          <div>
            {/* Event Title */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Event Title <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleChange} required placeholder="Name of the proposed event" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
            </div>

            {/* Event Date and Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Proposed Date <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Proposed Time <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
              </div>
            </div>

            {/* Event Location */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Proposed Location <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} required placeholder="Church sanctuary, fellowship hall, outdoor, etc." style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
            </div>

            {/* Expected Attendees and Budget */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Expected Attendees
                </label>
                <input type="number" name="eventAttendees" value={formData.eventAttendees} onChange={handleChange} placeholder="Estimated number" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Estimated Budget (KES)
                </label>
                <input type="number" name="eventBudget" value={formData.eventBudget} onChange={handleChange} placeholder="0" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }} />
              </div>
            </div>
          </div>
        )

      case 'maintenance':
        return (
          <div>
            {/* Maintenance Location */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Location of Issue <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select name="maintenanceLocation" value={formData.maintenanceLocation} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="">Select location...</option>
                <option value="sanctuary">Sanctuary</option>
                <option value="fellowship-hall">Fellowship Hall</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathrooms">Bathrooms</option>
                <option value="classrooms">Classrooms</option>
                <option value="office">Church Office</option>
                <option value="parking">Parking Area</option>
                <option value="exterior">Building Exterior</option>
                <option value="grounds">Church Grounds</option>
                <option value="equipment">Audio/Visual Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Priority Level */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Priority Level
              </label>
              <select name="maintenancePriority" value={formData.maintenancePriority} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
                <option value="low">Low - Can wait several weeks</option>
                <option value="normal">Normal - Should be addressed soon</option>
                <option value="high">High - Needs attention this week</option>
                <option value="urgent">Urgent - Safety concern or major disruption</option>
              </select>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Photos of the Issue
              </label>
              <div style={{ border: '2px dashed #e5e7eb', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
                <input type="file" name="maintenanceImages" onChange={handleChange} multiple accept="image/*" style={{ display: 'none' }} id="maintenanceImages" />
                <label htmlFor="maintenanceImages" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                    Click to upload photos or drag and drop
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0 }}>
                    JPG, PNG, GIF (Max 5MB each)
                  </p>
                </label>
                {formData.maintenanceImages.length > 0 && (
                  <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Selected Images:
                    </p>
                    {formData.maintenanceImages.map((file, index) => (
                      <div key={index} style={{ fontSize: '0.8rem', color: '#6b7280', padding: '0.25rem 0' }}>
                        🖼️ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: isMobile ? '100%' : '600px', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: submissionType?.bgColor || '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem auto', border: `2px solid ${submissionType?.borderColor || '#e5e7eb'}30` }}>
          {submissionType?.icon || '📝'}
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2d5a27', marginBottom: '0.5rem' }}>
          {submissionType?.title || 'Submit Request'}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          {submissionType?.description || 'Please fill out the form below'}
        </p>
      </div>

      {/* Email Configuration Warning */}
      {!isEmailConfigured && (
        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ color: '#92400e', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
            ⚠️ Demo Mode: Email service not configured. Submissions will be logged but not sent.
          </p>
        </div>
      )}

      {/* Personal Information */}
      <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>Personal Information</h4>

        {/* Anonymous Option */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#2d5a27' }} />
            <span style={{ fontSize: '0.9rem', color: '#374151' }}>Submit anonymously (name and contact info optional)</span>
          </label>
        </div>

        {/* Name Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Full Name {!formData.anonymous && <span style={{ color: '#dc2626' }}>*</span>}
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required={!formData.anonymous} disabled={formData.anonymous} placeholder={formData.anonymous ? "Anonymous submission" : "Enter your full name"} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: formData.anonymous ? '#f9fafb' : 'white', color: formData.anonymous ? '#9ca3af' : '#374151', cursor: formData.anonymous ? 'not-allowed' : 'text' }} />
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Email Address {!formData.anonymous && <span style={{ color: '#dc2626' }}>*</span>}
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required={!formData.anonymous} disabled={formData.anonymous} placeholder={formData.anonymous ? "Anonymous submission" : "Enter your email address"} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: formData.anonymous ? '#f9fafb' : 'white', color: formData.anonymous ? '#9ca3af' : '#374151', cursor: formData.anonymous ? 'not-allowed' : 'text' }} />
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone Number (Optional)</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={formData.anonymous} placeholder={formData.anonymous ? "Anonymous submission" : "e.g., +254 712 345 678"} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: formData.anonymous ? '#f9fafb' : 'white', color: formData.anonymous ? '#9ca3af' : '#374151', cursor: formData.anonymous ? 'not-allowed' : 'text' }} />
        </div>
      </div>

      {/* Request Details */}
      <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>Request Details</h4>

        {/* Specific Fields Based on Submission Type */}
        {getSpecificFields()}

        {/* Subject Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Subject <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder={
              submissionType?.id === 'prayer' ? "Brief description of your prayer request" :
              submissionType?.id === 'visitation' ? "Who needs to be visited and why" :
              submissionType?.id === 'reports' ? "Report title (e.g., Youth Ministry January 2024)" :
              submissionType?.id === 'counseling' ? "Brief description of counseling need" :
              submissionType?.id === 'events' ? "Event proposal summary" :
              submissionType?.id === 'maintenance' ? "Brief description of the maintenance issue" :
              "Brief description of your request"
            }
            style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}
          />
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Detailed Message <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder={
              submissionType?.id === 'prayer' ? "Please share your prayer request in detail. Include any specific needs, circumstances, or people you'd like us to pray for..." :
              submissionType?.id === 'visitation' ? "Please provide details about the person to be visited, their condition/situation, and any special considerations..." :
              submissionType?.id === 'reports' ? "Provide a summary of activities, achievements, challenges, and recommendations. Include key statistics and future plans..." :
              submissionType?.id === 'counseling' ? "Please describe your situation and what kind of support you're looking for. This information will be kept confidential..." :
              submissionType?.id === 'events' ? "Describe the event purpose, target audience, activities planned, resources needed, and expected outcomes..." :
              submissionType?.id === 'maintenance' ? "Describe the problem in detail, when it was first noticed, and any safety concerns or impact on church activities..." :
              "Please provide detailed information about your request..."
            }
            style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151', resize: 'vertical', minHeight: '120px' }}
          />
        </div>

        {/* Urgency Level */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Urgency Level</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
            <option value="low">Low - Can wait a week</option>
            <option value="normal">Normal - Within a few days</option>
            <option value="high">High - Within 24 hours</option>
            <option value="urgent">Urgent - Immediate attention needed</option>
          </select>
        </div>

        {/* Preferred Contact Method */}
        {!formData.anonymous && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Preferred Contact Method</label>
            <select name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', color: '#374151' }}>
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="both">Either Email or Phone</option>
            </select>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div style={{ backgroundColor: '#dcfce7', border: '1px solid #16a34a', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
          <p style={{ color: '#15803d', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
            ✅ Your request has been submitted successfully! Church leadership will review and respond soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #dc2626', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
          <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
            ❌ {errorMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button type="button" onClick={onClose} disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', border: '2px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white', color: '#6b7280', fontSize: '0.9rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.6 : 1, transition: 'all 0.3s ease' }}>
          Cancel
        </button>

        <button type="submit" disabled={isSubmitting || submitStatus === 'success'} style={{ padding: '0.75rem 2rem', border: 'none', borderRadius: '8px', backgroundColor: submitStatus === 'success' ? '#16a34a' : (submissionType?.color || '#2d5a27'), color: 'white', fontSize: '0.9rem', fontWeight: '600', cursor: (isSubmitting || submitStatus === 'success') ? 'not-allowed' : 'pointer', opacity: (isSubmitting || submitStatus === 'success') ? 0.8 : 1, transition: 'all 0.3s ease', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {isSubmitting ? (
            <>
              <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              Submitting...
            </>
          ) : submitStatus === 'success' ? (
            <>✅ Submitted</>
          ) : (
            'Submit Request'
          )}
        </button>
      </div>

      {/* Loading Animation CSS */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </form>
  )
}

export default SubmissionForm