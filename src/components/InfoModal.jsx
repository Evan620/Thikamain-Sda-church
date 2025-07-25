import React from 'react'
import Modal from './Modal'

const InfoModal = ({ isOpen, onClose, type, data }) => {
  const getModalContent = () => {
    switch (type) {
      case 'service':
        return {
          title: `${data.name} Service`,
          content: (
            <div>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                border: '1px solid #0ea5e9'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '1rem'
                }}>
                  Service Details
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Time:</span>
                    <span style={{ color: '#6b7280' }}>{data.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Location:</span>
                    <span style={{ color: '#6b7280' }}>Main Sanctuary</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Duration:</span>
                    <span style={{ color: '#6b7280' }}>{data.duration || '1.5 hours'}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '0.75rem'
                }}>
                  What to Expect
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {data.description}
                </p>
                
                {data.activities && (
                  <div>
                    <h5 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Service Activities:
                    </h5>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {data.activities.map((activity, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          color: '#6b7280'
                        }}>
                          <span style={{ color: '#2d5a27' }}>•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '0.75rem'
                }}>
                  First Time Visitors
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  We warmly welcome first-time visitors! Feel free to come as you are. 
                  Our greeters will be happy to help you find your way and answer any questions.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => {
                      alert(`📍 Plan Your Visit:\n\nService: ${data.name} Service\nTime: ${data.time}\nLocation: Main Sanctuary\nAddress: Thika Main SDA Church\n\nWhat to bring:\n• Bible (or use our provided Bibles)\n• Comfortable clothing\n• Open heart for worship\n\nParking is available on-site. Greeters will welcome you at the entrance!`)
                    }}
                    style={{
                    backgroundColor: '#2d5a27',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    Plan Your Visit
                  </button>
                  <button
                    onClick={() => {
                      alert(`📞 Contact Information:\n\nPhone: +254 723 379 186\nEmail: effiemuthoni3@gmail.com\nChurch Clerk: Effie Muthoni\n\nOffice Hours:\nMonday - Friday: 9:00 AM - 5:00 PM\nSaturday: 8:00 AM - 2:00 PM\n\nFeel free to call or visit us anytime!`)
                    }}
                    style={{
                    backgroundColor: 'transparent',
                    color: '#2d5a27',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: '2px solid #2d5a27',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          )
        }

      case 'ministry':
        return {
          title: `${data.name} Ministry`,
          content: (
            <div>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                border: '1px solid #0ea5e9'
              }}>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  fontSize: '1.1rem'
                }}>
                  {data.description}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '0.75rem'
                }}>
                  How to Get Involved
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  We welcome anyone who feels called to serve in this ministry. 
                  Whether you're experienced or just starting, there's a place for you.
                </p>
                
                <div style={{
                  display: 'grid',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Meeting Time:</span>
                    <span style={{ color: '#6b7280' }}>{data.meetingTime || 'Contact for details'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Leader:</span>
                    <span style={{ color: '#6b7280' }}>{data.leader}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Contact:</span>
                    <span style={{ color: '#6b7280' }}>{data.contact}</span>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '0.75rem'
                }}>
                  Ready to Join?
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  Speak with any church member or visit us during service times to learn more
                  about how you can get involved and make a difference in this ministry.
                </p>
              </div>
            </div>
          )
        }

      case 'event':
        return {
          title: data.title,
          content: (
            <div>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                border: '1px solid #0ea5e9'
              }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Date:</span>
                    <span style={{ color: '#6b7280' }}>{data.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Time:</span>
                    <span style={{ color: '#6b7280' }}>{data.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Location:</span>
                    <span style={{ color: '#6b7280' }}>{data.location}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '0.75rem'
                }}>
                  Event Details
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {data.description}
                </p>
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d5a27',
                  marginBottom: '0.75rem'
                }}>
                  Join Us
                </h4>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  Everyone is welcome to attend this event. For more information or to RSVP, 
                  please contact the church office.
                </p>
                <button
                  onClick={() => {
                    alert(`📞 Church Contact Information:\n\nPhone: +254 723 379 186\nEmail: effiemuthoni3@gmail.com\n\nChurch Clerk: Effie Muthoni\n\nFeel free to call or email us for more information about this event!`)
                  }}
                  style={{
                  backgroundColor: '#2d5a27',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Contact Church Office
                </button>
              </div>
            </div>
          )
        }

      default:
        return {
          title: 'Information',
          content: (
            <div>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                More information coming soon. Please contact the church office for details.
              </p>
            </div>
          )
        }
    }
  }

  const { title, content } = getModalContent()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="medium">
      {content}
    </Modal>
  )
}

export default InfoModal
