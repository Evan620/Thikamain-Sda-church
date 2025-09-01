import React, { useState } from 'react'

const Giving = () => {
  // Mobile detection
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  // State for showing payment details
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mpesa')
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Modern Giving Header */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        padding: isMobile ? '2rem 0 1.5rem' : isTablet ? '2.5rem 0 1.75rem' : '3rem 0 2rem',
        borderBottom: '1px solid rgba(45, 90, 39, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1rem'
            }}>
              Generous Giving
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Give with a Joyful Heart
            </h1>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '800px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💝</div>
                <blockquote style={{
                  fontSize: '1.2rem',
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                </blockquote>
                <cite style={{
                  fontSize: '1rem',
                  color: '#2d5a27',
                  fontWeight: '600'
                }}>
                  - 2 Corinthians 9:7
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section style={{
        padding: '4rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem'
            }}>
              How to Give
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Choose your preferred method to support our ministry
            </p>
          </div>

          {/* Payment Method Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* M-PESA Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '2px solid rgba(22, 163, 74, 0.1)',
              borderLeft: '4px solid #16a34a',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(22, 163, 74, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#16a34a',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  📱
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#16a34a',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    M-PESA Paybill
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    Quick & secure mobile payment
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: '#16a34a',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Business Number
                  </div>
                  <div style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#374151'
                  }}>
                    247247
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: '#16a34a',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Account Number
                  </div>
                  <div style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#374151'
                  }}>
                    436520
                  </div>
                </div>
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#16a34a',
                  marginBottom: '0.5rem'
                }}>
                  📋 Steps to Pay:
                </h4>
                <ol style={{
                  fontSize: '0.85rem',
                  color: '#374151',
                  paddingLeft: '1rem',
                  margin: 0
                }}>
                  <li>Go to M-PESA on your phone</li>
                  <li>Select "Lipa na M-PESA"</li>
                  <li>Choose "Pay Bill"</li>
                  <li>Enter Business Number: <strong>247247</strong></li>
                  <li>Enter Account Number: <strong>436520</strong></li>
                  <li>Enter amount and confirm</li>
                </ol>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'rgba(22, 163, 74, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#16a34a',
                  fontWeight: '600'
                }}>
                  ✅ Instant confirmation via SMS
                </span>
              </div>
            </div>

            {/* Bank Transfer Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '2px solid rgba(124, 58, 237, 0.1)',
              borderLeft: '4px solid #7c3aed',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 58, 237, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  🏦
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#7c3aed',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    Bank Transfer
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    Direct bank deposit
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {[
                  { label: 'Bank Name', value: 'Equity Bank Kenya' },
                  { label: 'Account Name', value: 'Seventh Day Adventist Thika Main' },
                  { label: 'Account Number', value: '1710276436520' },
                  { label: 'Branch', value: 'Makongeni Thika' }
                ].map((detail, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(124, 58, 237, 0.05)',
                      borderRadius: '8px'
                    }}
                  >
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#7c3aed'
                    }}>
                      {detail.label}:
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'rgba(124, 58, 237, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#7c3aed',
                  fontWeight: '600'
                }}>
                  💜 Include "Church Offering" in reference
                </span>
              </div>
            </div>

            {/* Cash/Check Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '2px solid rgba(245, 158, 11, 0.1)',
              borderLeft: '4px solid #f59e0b',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  💰
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#f59e0b',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    In-Person Giving
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    Cash or check during service
                  </p>
                </div>
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.05)',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#f59e0b',
                  marginBottom: '0.75rem'
                }}>
                  🕐 Service Times:
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.5rem'
                }}>
                  {[
                    { service: 'Sabbath School', time: 'Saturday 9:00 AM' },
                    { service: 'Divine Service', time: 'Saturday 11:00 AM' },
                    { service: 'Prayer Meeting', time: 'Wednesday 6:00 PM' }
                  ].map((service, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        color: '#374151'
                      }}
                    >
                      <span style={{ fontWeight: '600' }}>{service.service}:</span>
                      <span>{service.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'rgba(245, 158, 11, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#f59e0b',
                  fontWeight: '600'
                }}>
                  🏛️ Visit us at Makongeni, Thika
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(45, 90, 39, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(45, 90, 39, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem'
            }}>
              Need Help with Your Donation?
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              Our finance team is here to assist you with any questions about giving
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#2d5a27',
                fontWeight: '600'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📞</span>
                <span>+254 700 000 000</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#2d5a27',
                fontWeight: '600'
              }}>
                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                <span>finance@thikamainsdachurch.org</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Impact Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem'
            }}>
              Your Impact
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              See how your generous giving transforms lives and advances God's kingdom
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🤝', number: '150+', label: 'Families Helped', subtitle: 'Monthly community support' },
              { icon: '👥', number: '80+', label: 'Youth Empowered', subtitle: 'Through programs & scholarships' },
              { icon: '⛪', number: '500+', label: 'Members Served', subtitle: 'Weekly worship & care' },
              { icon: '🌍', number: '12', label: 'Mission Projects', subtitle: 'Local & global outreach' }
            ].map((impact, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  {impact.icon}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '0.5rem'
                }}>
                  {impact.number}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  {impact.label}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  {impact.subtitle}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🙏</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Thank You for Your Faithful Giving!
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem'
            }}>
              Your generosity enables us to serve God and our community with excellence
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Giving