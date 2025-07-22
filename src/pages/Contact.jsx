import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  return (
    <div className="min-h-screen">
      {/* Modern Contact Header */}
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
              Get In Touch
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Contact Us
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '800px',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              We'd love to hear from you! Whether you have questions about our services, want to learn more about our ministries,
              or need prayer support, we're here to help.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Reach out to us through any of the methods below, and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Quick Contact Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: '📞', title: 'Call Us', subtitle: 'Available 24/7', color: '#2d5a27' },
              { icon: '✉️', title: 'Email Us', subtitle: 'Quick Response', color: '#f59e0b' },
              { icon: '📍', title: 'Visit Us', subtitle: 'Always Welcome', color: '#2d5a27' },
              { icon: '💬', title: 'Message Us', subtitle: 'Easy Contact', color: '#f59e0b' }
            ].map((item, index) => (
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
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: item.color,
                  marginBottom: '0.25rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280'
                }}>
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '3rem'
          }}>
          {/* Contact Information */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '2rem'
            }}>
              Get in Touch
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                {
                  icon: (
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Address",
                  content: "Makongeni, Thika, Kiambu County, Kenya",
                  subtitle: "P.O BOX 3478-01002 Madaraka Thika",
                  color: "#2d5a27"
                },
                {
                  icon: (
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: "Phone",
                  content: "+254 712 345 678",
                  subtitle: "Call us for immediate assistance",
                  color: "#f59e0b"
                },
                {
                  icon: (
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Email",
                  content: "info@thikasda.org",
                  subtitle: "We'll respond within 24 hours",
                  color: "#2d5a27"
                },
                {
                  icon: (
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Office Hours",
                  content: "Monday - Friday: 9:00 AM - 5:00 PM",
                  subtitle: "Saturday: 8:00 AM - 2:00 PM",
                  color: "#f59e0b"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: `linear-gradient(135deg, ${item.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${item.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                    border: `1px solid ${item.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 8px 25px ${item.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                    e.currentTarget.style.borderColor = `${item.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = `${item.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: item.color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: item.color,
                        marginBottom: '0.5rem'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.25rem'
                      }}>
                        {item.content}
                      </p>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280'
                      }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Times Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(245, 158, 11, 0.02) 100%)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              borderRadius: '16px',
              padding: '2rem',
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
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Service Times
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { service: "Sabbath School", time: "Saturday 9:00 AM", icon: "📚" },
                    { service: "Divine Service", time: "Saturday 11:00 AM", icon: "⛪" },
                    { service: "Prayer Meeting", time: "Wednesday 6:00 PM", icon: "🙏" },
                    { service: "Youth Meeting", time: "Friday 6:00 PM", icon: "👥" }
                  ].map((service, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '1rem',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(45, 90, 39, 0.1)',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        fontSize: '1.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {service.icon}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#2d5a27',
                        marginBottom: '0.25rem'
                      }}>
                        {service.service}
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        {service.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Send us a Message
              </h2>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Fill out the form below and we'll get back to you as soon as possible. We're here to help with any questions or concerns you may have.
              </p>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {/* Name and Email Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid rgba(45, 90, 39, 0.1)',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                      placeholder="Your full name"
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

                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid rgba(45, 90, 39, 0.1)',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                      placeholder="your.email@example.com"
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
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid rgba(45, 90, 39, 0.1)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      backgroundColor: 'white'
                    }}
                    placeholder="What is this regarding?"
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

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid rgba(45, 90, 39, 0.1)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      backgroundColor: 'white',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    placeholder="Tell us how we can help you, or share your prayer requests..."
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2d5a27'
                      e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 39, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(45, 90, 39, 0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  ></textarea>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </button>

                {/* Form Note */}
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  textAlign: 'center',
                  marginTop: '1rem'
                }}>
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Map and Location Section */}
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
              Find Us
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Visit Our Church
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              We're located in Makongeni, Thika and would love to welcome you
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* Google Maps Integration */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Map Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(45, 90, 39, 0.1)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)'
                }}>
                  📍
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    margin: '0 0 0.25rem 0'
                  }}>
                    Find Our Church
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    SDA Thika Main Church, Makongeni, Thika
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '280px' : '350px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(45, 90, 39, 0.1)',
                marginBottom: '1.5rem'
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0123456789!2d37.1108582!3d-1.053758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4fbb681042a9%3A0x39773ad0d5f57cee!2sSDA%20Thika%20Main%20Church%20Kenya!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    borderRadius: '12px'
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SDA Thika Main Church Location"
                ></iframe>
              </div>

              {/* Map Actions */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <a
                  href="https://www.google.com/maps/place/SDA+Thika+Main+Church+Kenya/@-1.053758,37.1108582,17z/data=!3m1!4b1!4m6!3m5!1s0x182f4fbb681042a9:0x39773ad0d5f57cee!8m2!3d-1.053758!4d37.1108582!16s%2Fg%2F11txs_8b0p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-btn"
                  style={{
                    backgroundColor: '#2d5a27',
                    color: 'white',
                    padding: isMobile ? '14px 16px' : '10px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    flex: 1,
                    justifyContent: 'center',
                    minWidth: isMobile ? 'auto' : '140px',
                    minHeight: isMobile ? '48px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#1c3a1c'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#2d5a27'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  onTouchStart={(e) => {
                    e.target.style.backgroundColor = '#1c3a1c'
                    e.target.style.transform = 'scale(0.98)'
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.target.style.backgroundColor = '#2d5a27'
                      e.target.style.transform = 'scale(1)'
                    }, 150)
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isMobile ? 'View on Maps' : 'View on Google Maps'}
                </a>
                <a
                  href="https://www.google.com/maps/dir//SDA+Thika+Main+Church+Kenya/@-1.053758,37.1108582,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-btn"
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: isMobile ? '14px 16px' : '10px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    flex: 1,
                    justifyContent: 'center',
                    minWidth: isMobile ? 'auto' : '120px',
                    minHeight: isMobile ? '48px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#d97706'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#f59e0b'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  onTouchStart={(e) => {
                    e.target.style.backgroundColor = '#d97706'
                    e.target.style.transform = 'scale(0.98)'
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.target.style.backgroundColor = '#f59e0b'
                      e.target.style.transform = 'scale(1)'
                    }, 150)
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
              </div>

              {/* Location Details */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(45, 90, 39, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(45, 90, 39, 0.1)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <strong style={{ color: '#2d5a27' }}>📍 Address:</strong>
                    <br />
                    <span style={{ color: '#6b7280' }}>Makongeni, Thika, Kenya</span>
                    <br />
                    <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>P.O BOX 3478-01002 Madaraka Thika</span>
                  </div>
                  <div>
                    <strong style={{ color: '#2d5a27' }}>🕐 Coordinates:</strong>
                    <br />
                    <span style={{ color: '#6b7280' }}>-1.053758, 37.1108582</span>
                  </div>
                  <div>
                    <strong style={{ color: '#2d5a27' }}>🚗 Parking:</strong>
                    <br />
                    <span style={{ color: '#6b7280' }}>Available on-site</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions and Transportation */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(45, 90, 39, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Getting Here
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {[
                  {
                    icon: (
                      <svg style={{ width: '1.2rem', height: '1.2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    ),
                    title: "By Car",
                    description: "Free parking available on church grounds",
                    details: "Located in Makongeni area, Thika"
                  },
                  {
                    icon: (
                      <svg style={{ width: '1.2rem', height: '1.2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    ),
                    title: "Public Transport",
                    description: "Multiple matatu routes serve Makongeni",
                    details: "Alight at Makongeni or Thika Main Stage"
                  },
                  {
                    icon: (
                      <svg style={{ width: '1.2rem', height: '1.2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ),
                    title: "Walking",
                    description: "Easily accessible from town center",
                    details: "5-minute walk from Thika CBD"
                  }
                ].map((transport, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: 'rgba(45, 90, 39, 0.02)',
                      borderRadius: '12px',
                      border: '1px solid rgba(45, 90, 39, 0.1)'
                    }}
                  >
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: '#2d5a27',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {transport.icon}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#2d5a27',
                        marginBottom: '0.25rem'
                      }}>
                        {transport.title}
                      </h4>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#374151',
                        marginBottom: '0.25rem'
                      }}>
                        {transport.description}
                      </p>
                      <p style={{
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        {transport.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Quick Answers
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Find quick answers to common questions about our church
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                question: "What time are your services?",
                answer: "Sabbath School starts at 9:00 AM, followed by Divine Service at 11:00 AM every Saturday. We also have Prayer Meeting on Wednesdays at 6:00 PM and Youth Meeting on Fridays at 6:00 PM."
              },
              {
                question: "Do I need to dress formally?",
                answer: "We welcome you to come as you are! While many choose to dress modestly and respectfully, the most important thing is that you feel comfortable joining us for worship."
              },
              {
                question: "Is there parking available?",
                answer: "Yes, we have free parking available on our church grounds. There's also street parking nearby if needed."
              },
              {
                question: "Do you have programs for children?",
                answer: "Absolutely! We have a dedicated Children's Ministry with age-appropriate Sabbath School classes, activities, and special programs throughout the year."
              },
              {
                question: "How can I get involved?",
                answer: "There are many ways to get involved! You can join one of our ministries, volunteer for community outreach, participate in our music ministry, or help with various church activities."
              },
              {
                question: "Do you offer Bible studies?",
                answer: "Yes, we offer regular Bible study sessions including Sabbath School, midweek Bible studies, and special study groups. Contact us to learn about current study opportunities."
              }
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${index % 2 === 0 ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${index % 2 === 0 ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = `0 8px 25px ${index % 2 === 0 ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: index % 2 === 0 ? '#2d5a27' : '#f59e0b',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {faq.question}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
