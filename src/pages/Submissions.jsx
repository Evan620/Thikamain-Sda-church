import React, { useState } from 'react'
import Modal from '../components/Modal'
import SubmissionForm from '../components/SubmissionForm'

const Submissions = () => {
  const [selectedSubmissionType, setSelectedSubmissionType] = useState(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  // Submission categories
  const submissionCategories = [
    {
      id: 'prayer',
      title: 'Prayer Requests',
      icon: '🙏',
      description: 'Submit prayer requests for yourself, family, or community members',
      color: '#2563eb',
      bgColor: '#eff6ff',
      borderColor: '#2563eb',
      examples: ['Health concerns', 'Family matters', 'Financial needs', 'Spiritual guidance']
    },
    {
      id: 'visitation',
      title: 'Visitation Requests',
      icon: '🏠',
      description: 'Request pastoral visits for sick members, new members, or special occasions',
      color: '#059669',
      bgColor: '#ecfdf5',
      borderColor: '#059669',
      examples: ['Hospital visits', 'Home visits', 'New member welcome', 'Bereavement support']
    },
    {
      id: 'reports',
      title: 'Department Reports',
      icon: '📊',
      description: 'Submit reports from departments, ministries, or church activities',
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#dc2626',
      examples: ['Ministry reports', 'Event summaries', 'Financial reports', 'Activity updates']
    },
    {
      id: 'counseling',
      title: 'Counseling Requests',
      icon: '💬',
      description: 'Request pastoral counseling or spiritual guidance sessions',
      color: '#7c3aed',
      bgColor: '#f3e8ff',
      borderColor: '#7c3aed',
      examples: ['Marriage counseling', 'Youth guidance', 'Spiritual mentoring', 'Life decisions']
    },
    {
      id: 'events',
      title: 'Event Proposals',
      icon: '📅',
      description: 'Propose new events, programs, or church activities',
      color: '#ea580c',
      bgColor: '#fff7ed',
      borderColor: '#ea580c',
      examples: ['Community outreach', 'Special programs', 'Workshops', 'Social events']
    },
    {
      id: 'maintenance',
      title: 'Facility Issues',
      icon: '🔧',
      description: 'Report facility maintenance needs or infrastructure issues',
      color: '#0891b2',
      bgColor: '#ecfeff',
      borderColor: '#0891b2',
      examples: ['Building repairs', 'Equipment issues', 'Safety concerns', 'Improvement suggestions']
    },
    {
      id: 'general',
      title: 'General Requests',
      icon: '📝',
      description: 'Any other requests or communications to church leadership',
      color: '#6b7280',
      bgColor: '#f9fafb',
      borderColor: '#6b7280',
      examples: ['Suggestions', 'Feedback', 'Questions', 'Other concerns']
    }
  ]

  const handleSubmissionClick = (category) => {
    setSelectedSubmissionType(category)
    setShowSubmissionModal(true)
  }

  const handleCloseModal = () => {
    setShowSubmissionModal(false)
    setSelectedSubmissionType(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      paddingTop: isMobile ? '1rem' : '2rem',
      paddingBottom: '3rem'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2d5a27 0%, #1e3a1a 100%)',
        color: 'white',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Submit Your Requests
          </h1>
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Connect with church leadership through our secure submission system. 
            Whether you need prayer, pastoral care, or want to share reports and suggestions, 
            we're here to serve you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        {/* Instructions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontWeight: '600',
            color: '#2d5a27',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            How It Works
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#eff6ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.5rem'
              }}>
                1️⃣
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Choose Category
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Select the type of request that best fits your needs
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ecfdf5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.5rem'
              }}>
                2️⃣
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Fill the Form
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Provide details about your request in the secure form
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.5rem'
              }}>
                3️⃣
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Get Response
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Church leadership will review and respond to your request
              </p>
            </div>
          </div>
        </div>

        {/* Submission Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {submissionCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleSubmissionClick(category)}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${category.borderColor}20`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 25px ${category.color}20`
                e.currentTarget.style.borderColor = category.borderColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
                e.currentTarget.style.borderColor = `${category.borderColor}20`
              }}
            >
              {/* Category Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: category.bgColor,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                border: `1px solid ${category.borderColor}30`
              }}>
                {category.icon}
              </div>

              {/* Category Title */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem'
              }}>
                {category.title}
              </h3>

              {/* Category Description */}
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                marginBottom: '1rem'
              }}>
                {category.description}
              </p>

              {/* Examples */}
              <div style={{
                backgroundColor: category.bgColor,
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem'
              }}>
                <p style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: category.color,
                  marginBottom: '0.5rem'
                }}>
                  Examples:
                </p>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1rem',
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {category.examples.map((example, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Button */}
              <button
                style={{
                  width: '100%',
                  backgroundColor: category.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Submit Request
              </button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: isMobile ? '1.5rem' : '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontWeight: '600',
            color: '#2d5a27',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Important Information
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🔒 Privacy & Confidentiality
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                All submissions are treated with strict confidentiality. Your personal information
                and requests are only shared with relevant church leadership as needed to provide
                appropriate care and response.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ⏰ Response Time
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                We aim to respond to all submissions within 24-48 hours. Urgent matters
                (medical emergencies, etc.) should be communicated directly by phone to
                the church office at +254 723 379 186.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={showSubmissionModal}
        onClose={handleCloseModal}
        title={selectedSubmissionType ? `${selectedSubmissionType.title}` : 'Submit Request'}
        size="large"
      >
        {selectedSubmissionType && (
          <SubmissionForm
            submissionType={selectedSubmissionType}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  )
}

export default Submissions
