import React, { useState } from 'react'
import MpesaPaymentModal from '../components/MpesaPaymentModal'

const Giving = () => {
  const [amount, setAmount] = useState('')
  const [givingType, setGivingType] = useState('tithe')
  const [showMpesaModal, setShowMpesaModal] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate amount
    if (!amount || parseFloat(amount) < 1) {
      alert('Please enter a valid amount (minimum KES 1)')
      return
    }

    // Open M-PESA payment modal
    setShowMpesaModal(true)
  }

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData)
    setPaymentSuccess(true)
    setShowMpesaModal(false)

    // Show success message
    alert(`Thank you for your generous ${paymentData.givingType} of KES ${paymentData.amount}! Your payment has been processed successfully.`)

    // Reset form
    setAmount('')
    setGivingType('tithe')

    // Reset success state after 5 seconds
    setTimeout(() => setPaymentSuccess(false), 5000)
  }

  const handlePaymentError = (errorData) => {
    console.error('Payment error:', errorData)
    setShowMpesaModal(false)

    // Show error message
    alert(`Payment failed: ${errorData.error}. Please try again or contact support.`)
  }

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

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
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '60px',
                height: '60px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>
                  💝
                </div>
                <blockquote style={{
                  fontSize: '1.2rem',
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  position: 'relative'
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
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '700px',
              lineHeight: '1.6',
              marginTop: '1.5rem'
            }}>
              Your generous giving enables us to spread God's love, support our community, and advance His kingdom.
              Every gift, no matter the size, makes a meaningful difference in the lives we touch.
            </p>
          </div>

          {/* Giving Impact Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: '🏛️', number: '100%', label: 'Transparent Use', subtitle: 'Every donation tracked' },
              { icon: '❤️', number: '500+', label: 'Lives Impacted', subtitle: 'Monthly through ministries' },
              { icon: '🌍', number: '12', label: 'Outreach Programs', subtitle: 'Active in community' },
              { icon: '🙏', number: '24/7', label: 'Prayer Support', subtitle: 'For all our givers' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '0.25rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6b7280'
                }}>
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Impact Section */}
      <section style={{
        padding: '4rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(45, 90, 39, 0.1)',
              color: '#2d5a27',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Your Impact
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              See How Your Giving Makes a Difference
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Every donation directly supports our mission to serve God and our community
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: "Community Outreach",
                description: "Your donations help us provide food, clothing, and support to families in need throughout Thika and surrounding areas.",
                impact: "150+ families served monthly",
                icon: "🤝",
                color: "#2d5a27",
                stats: [
                  { label: "Food Packages", value: "200+" },
                  { label: "Clothing Items", value: "500+" },
                  { label: "Medical Support", value: "50+" }
                ]
              },
              {
                title: "Youth Development",
                description: "Supporting our youth ministry programs, educational scholarships, and mentorship initiatives for the next generation.",
                impact: "80+ young people empowered",
                icon: "👥",
                color: "#f59e0b",
                stats: [
                  { label: "Scholarships", value: "25" },
                  { label: "Youth Programs", value: "15" },
                  { label: "Mentorship Pairs", value: "40" }
                ]
              },
              {
                title: "Church Operations",
                description: "Maintaining our facilities, supporting pastoral care, and ensuring quality worship experiences for our congregation.",
                impact: "500+ members served weekly",
                icon: "⛪",
                color: "#2d5a27",
                stats: [
                  { label: "Weekly Services", value: "4" },
                  { label: "Pastoral Visits", value: "30+" },
                  { label: "Facility Maintenance", value: "100%" }
                ]
              },
              {
                title: "Global Missions",
                description: "Supporting missionary work and evangelism efforts both locally and internationally to spread God's love worldwide.",
                impact: "12 mission projects supported",
                icon: "🌍",
                color: "#f59e0b",
                stats: [
                  { label: "Mission Fields", value: "8" },
                  { label: "Missionaries", value: "15" },
                  { label: "Evangelism Events", value: "24" }
                ]
              }
            ].map((impact, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      background: `linear-gradient(135deg, ${impact.color}, ${impact.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {impact.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: impact.color,
                        marginBottom: '0.25rem'
                      }}>
                        {impact.title}
                      </h3>
                      <div style={{
                        backgroundColor: `${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                        color: impact.color,
                        padding: '3px 8px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        {impact.impact}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {impact.description}
                  </p>

                  {/* Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                  }}>
                    {impact.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          padding: '0.75rem',
                          textAlign: 'center',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: impact.color,
                          marginBottom: '0.25rem'
                        }}>
                          {stat.value}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontWeight: '500'
                        }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Form and Payment Methods Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '3rem'
          }}>
          {/* Enhanced Giving Form */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(45, 90, 39, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Make a Donation
              </h2>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Choose your donation amount and purpose. All transactions are secure and your information is protected.
              </p>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {/* Preset Amount Buttons */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '1rem'
                  }}>
                    Quick Amount Selection (KES)
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {[500, 1000, 2000, 5000, 10000].map((presetAmount) => (
                      <button
                        key={presetAmount}
                        type="button"
                        onClick={() => setAmount(presetAmount.toString())}
                        className="mobile-btn"
                        style={{
                          padding: isMobile ? '14px 16px' : '12px 16px',
                          borderRadius: '10px',
                          border: amount === presetAmount.toString() ? '2px solid #2d5a27' : '2px solid rgba(45, 90, 39, 0.1)',
                          backgroundColor: amount === presetAmount.toString() ? 'rgba(45, 90, 39, 0.1)' : 'white',
                          color: amount === presetAmount.toString() ? '#2d5a27' : '#6b7280',
                          fontSize: isMobile ? '1rem' : '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          minHeight: isMobile ? '48px' : 'auto',
                          minWidth: isMobile ? '48px' : 'auto'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile && amount !== presetAmount.toString()) {
                            e.target.style.borderColor = 'rgba(45, 90, 39, 0.3)'
                            e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.05)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile && amount !== presetAmount.toString()) {
                            e.target.style.borderColor = 'rgba(45, 90, 39, 0.1)'
                            e.target.style.backgroundColor = 'white'
                          }
                        }}
                        onTouchStart={(e) => {
                          if (amount !== presetAmount.toString()) {
                            e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.1)'
                            e.target.style.transform = 'scale(0.98)'
                          }
                        }}
                        onTouchEnd={(e) => {
                          setTimeout(() => {
                            if (amount !== presetAmount.toString()) {
                              e.target.style.backgroundColor = 'white'
                              e.target.style.transform = 'scale(1)'
                            }
                          }, 150)
                        }}
                      >
                        {presetAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div>
                  <label
                    htmlFor="amount"
                    style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Custom Amount (KES) *
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="1"
                    className="mobile-form-input"
                    style={{
                      width: '100%',
                      padding: isMobile ? '14px 16px' : '12px 16px',
                      border: '2px solid rgba(45, 90, 39, 0.1)',
                      borderRadius: '10px',
                      fontSize: isMobile ? '16px' : '1rem', // Prevents zoom on iOS
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      backgroundColor: 'white',
                      minHeight: isMobile ? '48px' : 'auto'
                    }}
                    placeholder="Enter custom amount"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2d5a27'
                      e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 39, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(45, 90, 39, 0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Type of Giving */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '1rem'
                  }}>
                    Type of Giving *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {[
                      { value: 'tithe', label: '💰 Tithe', desc: '10% of income' },
                      { value: 'offering', label: '🙏 Offering', desc: 'General giving' },
                      { value: 'special', label: '🎯 Special Project', desc: 'Specific purpose' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '1rem',
                          border: givingType === option.value ? '2px solid #2d5a27' : '2px solid rgba(45, 90, 39, 0.1)',
                          borderRadius: '12px',
                          backgroundColor: givingType === option.value ? 'rgba(45, 90, 39, 0.05)' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (givingType !== option.value) {
                            e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.3)'
                            e.currentTarget.style.backgroundColor = 'rgba(45, 90, 39, 0.02)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (givingType !== option.value) {
                            e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.1)'
                            e.currentTarget.style.backgroundColor = 'white'
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="givingType"
                          value={option.value}
                          checked={givingType === option.value}
                          onChange={(e) => setGivingType(e.target.value)}
                          style={{
                            marginRight: '0.75rem',
                            accentColor: '#2d5a27'
                          }}
                        />
                        <div>
                          <div style={{
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.25rem'
                          }}>
                            {option.label}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#6b7280'
                          }}>
                            {option.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#2d5a27',
                    color: 'white',
                    fontWeight: '600',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 8px 25px rgba(45, 90, 39, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 12px 40px rgba(45, 90, 39, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.3)'
                  }}
                >
                  <svg style={{ width: '1.2rem', height: '1.2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  📱 Pay with M-PESA
                </button>

                {/* Security Note */}
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  textAlign: 'center',
                  marginTop: '1rem'
                }}>
                  🔒 Your donation is secure and encrypted. We never store your payment information.
                </p>
              </form>
            </div>
          </div>
          
          {/* Enhanced Payment Methods & Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Payment Methods */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Secure Payment Methods
                </h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '2rem',
                  fontSize: '0.95rem'
                }}>
                  Choose your preferred payment method. All transactions are encrypted and secure.
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {[
                    {
                      name: 'M-PESA',
                      description: 'Mobile money payment',
                      details: 'Paybill: 247247 | Account: 436520#',
                      icon: '📱',
                      color: '#16a34a',
                      bgColor: 'rgba(22, 163, 74, 0.1)'
                    },
                    {
                      name: 'Credit/Debit Card',
                      description: 'Visa, Mastercard, American Express',
                      details: 'Secure SSL encryption',
                      icon: '💳',
                      color: '#2563eb',
                      bgColor: 'rgba(37, 99, 235, 0.1)'
                    },
                    {
                      name: 'Bank Transfer',
                      description: 'Direct bank transfer',
                      details: 'Equity Bank | Account: 1710276436520',
                      icon: '🏦',
                      color: '#7c3aed',
                      bgColor: 'rgba(124, 58, 237, 0.1)'
                    }
                  ].map((method, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.5rem',
                        backgroundColor: method.bgColor,
                        borderRadius: '12px',
                        border: `1px solid ${method.color}20`,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 8px 25px ${method.color}20`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: method.color,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0
                      }}>
                        {method.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: method.color,
                          marginBottom: '0.25rem'
                        }}>
                          {method.name}
                        </h4>
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#374151',
                          marginBottom: '0.25rem'
                        }}>
                          {method.description}
                        </p>
                        <p style={{
                          fontSize: '0.8rem',
                          color: '#6b7280'
                        }}>
                          {method.details}
                        </p>
                      </div>
                      <div style={{
                        padding: '0.5rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: `1px solid ${method.color}30`
                      }}>
                        <svg style={{ width: '1rem', height: '1rem', color: method.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security Badges */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(45, 90, 39, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap'
                  }}>
                    {[
                      { icon: '🔒', text: 'SSL Encrypted' },
                      { icon: '🛡️', text: 'PCI Compliant' },
                      { icon: '✅', text: 'Verified Secure' }
                    ].map((badge, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: '#2d5a27'
                        }}
                      >
                        <span>{badge.icon}</span>
                        <span>{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* M-PESA Instructions */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(22, 163, 74, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(22, 163, 74, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#16a34a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>
                    📱
                  </div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#16a34a',
                    margin: 0
                  }}>
                    How to Give via M-PESA
                  </h4>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { step: '1', text: 'Go to M-PESA menu', detail: 'On your phone' },
                    { step: '2', text: 'Select Lipa na M-PESA', detail: 'Choose Pay Bill' },
                    { step: '3', text: 'Enter Business No.', detail: '247247' },
                    { step: '4', text: 'Account Number', detail: '436520#' },
                    { step: '5', text: 'Enter Amount', detail: 'Your donation' },
                    { step: '6', text: 'Enter PIN & Send', detail: 'Complete payment' }
                  ].map((instruction, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid rgba(22, 163, 74, 0.1)'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>
                        {instruction.step}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '0.125rem'
                        }}>
                          {instruction.text}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280'
                        }}>
                          {instruction.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#16a34a',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    💚 Thank you for your generous giving! You will receive an M-PESA confirmation message.
                  </p>
                </div>
              </div>

              {/* Bank Transfer Instructions */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(124, 58, 237, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(124, 58, 237, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#7c3aed',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>
                    🏦
                  </div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#7c3aed',
                    margin: 0
                  }}>
                    Bank Transfer Details
                  </h4>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { label: 'Bank Name', value: 'Equity Bank' },
                    { label: 'Account Name', value: 'Seventh Day Adventist Thika Main' },
                    { label: 'Account Number', value: '1710276436520' },
                    { label: 'Branch', value: 'Makongeni Thika' }
                  ].map((detail, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid rgba(124, 58, 237, 0.1)',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#7c3aed',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {detail.label}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#7c3aed',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    💜 Please include your name and "Church Offering" in the transfer reference for proper record keeping.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Give Section */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(245, 158, 11, 0.02) 100%)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(45, 90, 39, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Why Your Giving Matters
                </h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  Your generous giving enables us to fulfill our mission and serve our community in meaningful ways.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { icon: '🤝', text: 'Support community outreach programs', color: '#2d5a27' },
                    { icon: '🏛️', text: 'Maintain and improve church facilities', color: '#f59e0b' },
                    { icon: '👥', text: 'Fund youth and children\'s ministries', color: '#2d5a27' },
                    { icon: '🌍', text: 'Support missionary work and evangelism', color: '#f59e0b' },
                    { icon: '💙', text: 'Provide pastoral care and counseling', color: '#2d5a27' },
                    { icon: '📚', text: 'Educational programs and scholarships', color: '#f59e0b' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(45, 90, 39, 0.1)'
                      }}
                    >
                      <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        backgroundColor: item.color,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        flexShrink: 0
                      }}>
                        {item.icon}
                      </div>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(45, 90, 39, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(45, 90, 39, 0.1)'
          }}>
            <p style={{
              color: '#2d5a27',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              🔒 All donations are secure and processed safely
            </p>
            <p style={{
              color: '#6b7280',
              fontSize: '0.95rem'
            }}>
              Thank you for your generous support and faithful giving!
            </p>
          </div>
        </div>
      </section>

      {/* M-PESA Payment Modal */}
      <MpesaPaymentModal
        isOpen={showMpesaModal}
        onClose={() => setShowMpesaModal(false)}
        amount={parseFloat(amount) || 0}
        givingType={givingType}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />

      {/* Success Message Overlay */}
      {paymentSuccess && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '10px',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideIn 0.3s ease'
        }}>
          <span style={{ fontSize: '1.2rem' }}>✅</span>
          <span style={{ fontWeight: '600' }}>Payment Successful!</span>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Giving
