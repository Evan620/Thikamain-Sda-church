import React, { useState } from 'react'

const Departments = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)

  // Responsive breakpoints
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  const departments = [
    // Administrative Departments
    {
      id: 1,
      name: "Strategic Planning",
      category: "administrative",
      description: "Responsible for long-term church planning, vision implementation, and strategic decision-making processes.",
      head: "Paul Odhiambo",
      contact: "odhiambop57@gmail.com",
      phone: "721153152",
      responsibilities: ["Strategic Planning", "Vision Implementation", "Policy Development", "Resource Allocation"],
      icon: "📊",
      color: "#2d5a27"
    },
    {
      id: 2,
      name: "Communication",
      category: "administrative",
      description: "Manages church communications, media outreach, and information dissemination to members and community.",
      head: "Charles Kyalo",
      contact: "charleskyalo77@gmail.com",
      phone: "722937200",
      responsibilities: ["Media Management", "Church Communications", "Website Management", "Social Media"],
      icon: "📢",
      color: "#f59e0b"
    },
    {
      id: 3,
      name: "Finance & Treasury",
      category: "administrative",
      description: "Oversees church finances, budgeting, and financial stewardship with transparency and accountability.",
      head: "Joseph Kimilu",
      contact: "jkimilu963@gmail.com",
      phone: "720930703",
      responsibilities: ["Financial Management", "Budget Planning", "Audit Oversight", "Stewardship"],
      icon: "💰",
      color: "#2d5a27"
    },
    {
      id: 4,
      name: "Church Secretary",
      category: "administrative",
      description: "Maintains church records, coordinates meetings, and handles administrative correspondence.",
      head: "Effie Muthoni",
      contact: "effiemuthoni3@gmail.com",
      phone: "723379186",
      responsibilities: ["Record Keeping", "Meeting Coordination", "Correspondence", "Documentation"],
      icon: "📝",
      color: "#f59e0b"
    },
    // Ministry Departments
    {
      id: 5,
      name: "Education",
      category: "ministry",
      description: "Oversees educational programs, Sabbath School curriculum, and learning initiatives for all age groups.",
      head: "Hellen Kiteme",
      contact: "alkobus@gmail.com",
      phone: "727752972",
      responsibilities: ["Sabbath School Coordination", "Educational Programs", "Curriculum Development", "Teacher Training"],
      icon: "📚",
      color: "#2d5a27"
    },

    {
      id: 6,
      name: "Development",
      category: "ministry",
      description: "Coordinates church development projects and community improvement initiatives.",
      head: "Margaret Nyambati",
      contact: "margymoraa@gmail.com",
      phone: "717688343",
      responsibilities: ["Project Management", "Community Development", "Infrastructure Planning", "Resource Mobilization"],
      icon: "🏗️",
      color: "#f59e0b"
    },
    {
      id: 7,
      name: "Personal Ministry",
      category: "ministry",
      description: "Equips members for personal evangelism and spiritual growth through training and outreach programs.",
      head: "Erick Mogeni",
      contact: "Contact information pending",
      phone: "713567192",
      responsibilities: ["Evangelism Training", "Outreach Programs", "Spiritual Growth", "Witnessing"],
      icon: "🙏",
      color: "#2d5a27"
    },
    {
      id: 8,
      name: "Stewardship",
      category: "ministry",
      description: "Teaches biblical principles of stewardship and manages church resource allocation and giving programs.",
      head: "Linet Kerubo",
      contact: "Contact information pending",
      phone: "726596243",
      responsibilities: ["Stewardship Education", "Giving Programs", "Resource Management", "Financial Literacy"],
      icon: "💝",
      color: "#f59e0b"
    },
    {
      id: 9,
      name: "Publishing & Chaplaincy",
      category: "ministry",
      description: "Manages church publications, literature distribution, and provides chaplaincy services.",
      head: "Monicah Mosoti",
      contact: "mosotikoreti05@gmail.com",
      phone: "712521766",
      responsibilities: ["Literature Distribution", "Publishing", "Chaplaincy Services", "Educational Materials"],
      icon: "📖",
      color: "#2d5a27"
    },
    {
      id: 10,
      name: "Welfare & Special Needs",
      category: "ministry",
      description: "Provides support for members with special needs and coordinates welfare assistance programs.",
      head: "Thomas Jachong",
      contact: "jachongthomas@gmail.com",
      phone: "721269038",
      responsibilities: ["Special Needs Support", "Welfare Programs", "Community Assistance", "Disability Services"],
      icon: "🤝",
      color: "#f59e0b"
    },
    {
      id: 11,
      name: "Singles Ministry",
      category: "ministry",
      description: "Provides fellowship, support, and programs specifically designed for single members.",
      head: "Joyce Ngure",
      contact: "marubejoyce747@gmail.com",
      phone: "722405223",
      responsibilities: ["Singles Fellowship", "Social Programs", "Support Groups", "Community Building"],
      icon: "💫",
      color: "#f59e0b"
    },
    {
      id: 12,
      name: "Sabbath School",
      category: "ministry",
      description: "Coordinates Sabbath School programs, curriculum, and systematic Bible study for all age groups.",
      head: "Charles Owiti",
      contact: "Contact information pending",
      phone: "719723194",
      responsibilities: ["Sabbath School Coordination", "Bible Study Programs", "Curriculum Management", "Teacher Training"],
      icon: "📚",
      color: "#2d5a27"
    },
    {
      id: 13,
      name: "Community Outreach",
      category: "ministry",
      description: "Coordinates community service programs and outreach initiatives to serve the local community.",
      head: "Abraham Sayah",
      contact: "sayahabraham22@gmail.com",
      phone: "705476095",
      responsibilities: ["Community Service", "Outreach Programs", "Evangelism Coordination", "Public Relations"],
      icon: "🤝",
      color: "#f59e0b"
    },
    {
      id: 14,
      name: "Pathfinder/Masterguide",
      category: "ministry",
      description: "Manages Pathfinder and Masterguide programs for character development and outdoor education.",
      head: "Judy Jaji",
      contact: "judyjaji99@gmail.com",
      phone: "722855747",
      responsibilities: ["Pathfinder Programs", "Character Development", "Outdoor Education", "Youth Leadership"],
      icon: "🏕️",
      color: "#2d5a27"
    },
    {
      id: 15,
      name: "Adventurer Club",
      category: "ministry",
      description: "Coordinates Adventurer Club programs for children ages 4-9, focusing on nature and character building.",
      head: "Jenniffer Kambua",
      contact: "Contact information pending",
      phone: "716902195",
      responsibilities: ["Adventurer Programs", "Children's Activities", "Nature Education", "Character Building"],
      icon: "🌟",
      color: "#f59e0b"
    },
    {
      id: 16,
      name: "Ambassadors Club",
      category: "ministry",
      description: "Manages Ambassadors Club programs for leadership development and service training.",
      head: "Gladys Arita",
      contact: "Contact information pending",
      phone: "721746143",
      responsibilities: ["Leadership Development", "Service Training", "Youth Programs", "Community Service"],
      icon: "🎖️",
      color: "#2d5a27"
    }

  ]

  const categories = [
    { id: 'all', label: 'All Departments', icon: '🏢' },
    { id: 'administrative', label: 'Administrative', icon: '📋' },
    { id: 'ministry', label: 'Ministry', icon: '⛪' }
  ]

  const filteredDepartments = selectedCategory === 'all' 
    ? departments 
    : departments.filter(dept => dept.category === selectedCategory)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
        color: 'white',
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }}></div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              padding: '12px 24px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '2rem',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              Church Organization
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Church Departments
            </h1>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Meet the administrative departments that handle church operations, planning, and organizational functions with excellence and dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{
        padding: '3rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  border: selectedCategory === category.id ? '2px solid #2d5a27' : '2px solid rgba(45, 90, 39, 0.15)',
                  backgroundColor: selectedCategory === category.id ? 'rgba(45, 90, 39, 0.1)' : 'white',
                  color: selectedCategory === category.id ? '#2d5a27' : '#6b7280',
                  fontWeight: selectedCategory === category.id ? '600' : '500',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: selectedCategory === category.id ? '0 4px 15px rgba(45, 90, 39, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(45, 90, 39, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
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
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {filteredDepartments.map((department) => (
              <div
                key={department.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
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
                {/* Department Icon */}
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: `linear-gradient(135deg, ${department.color}, ${department.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem'
                }}>
                  {department.icon}
                </div>

                {/* Department Name */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1rem'
                }}>
                  {department.name}
                </h3>

                {/* Department Head */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: `linear-gradient(135deg, ${department.color}, ${department.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    {department.head.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      {department.head}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      Department Head
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
                  {department.description}
                </p>

                {/* Responsibilities */}
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Key Responsibilities
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {department.responsibilities.map((responsibility, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: `${department.color}15`,
                          color: department.color,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {responsibility}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => setSelectedContact(department)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: department.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = department.color === '#2d5a27' ? '#1c3a1c' : '#d97706'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = department.color
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Contact Department
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Popup Modal */}
      {selectedContact && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
        onClick={() => setSelectedContact(null)}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedContact(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                color: '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                e.target.style.color = '#ef4444'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(107, 114, 128, 0.1)'
                e.target.style.color = '#6b7280'
              }}
            >
              ×
            </button>

            {/* Department Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              paddingRight: '2rem'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: `linear-gradient(135deg, ${selectedContact.color}, ${selectedContact.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                {selectedContact.icon}
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '0.5rem'
              }}>
                {selectedContact.name}
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem'
              }}>
                Department Contact Information
              </p>
            </div>

            {/* Contact Information */}
            <div style={{
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg style={{ width: '1.2rem', height: '1.2rem', color: selectedContact.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Department Head
              </h3>

              <div style={{
                backgroundColor: 'rgba(45, 90, 39, 0.05)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: `linear-gradient(135deg, ${selectedContact.color}, ${selectedContact.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    {selectedContact.head.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '1.1rem'
                    }}>
                      {selectedContact.head}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      {selectedContact.name} Head
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {/* Phone */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: selectedContact.color,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: '500'
                      }}>
                        Phone
                      </div>
                      <a
                        href={`tel:+254${selectedContact.phone}`}
                        style={{
                          fontSize: '1rem',
                          color: '#374151',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = selectedContact.color
                          e.target.style.textDecoration = 'underline'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#374151'
                          e.target.style.textDecoration = 'none'
                        }}
                      >
                        +254 {selectedContact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  {selectedContact.contact !== "Contact information pending" && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        backgroundColor: selectedContact.color,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '500'
                        }}>
                          Email
                        </div>
                        <a
                          href={`mailto:${selectedContact.contact}`}
                          style={{
                            fontSize: '1rem',
                            color: '#374151',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = selectedContact.color
                            e.target.style.textDecoration = 'underline'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#374151'
                            e.target.style.textDecoration = 'none'
                          }}
                        >
                          {selectedContact.contact}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: selectedContact.contact !== "Contact information pending" ? '1fr 1fr' : '1fr',
                gap: '1rem'
              }}>
                <a
                  href={`tel:+254${selectedContact.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: selectedContact.color,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = selectedContact.color === '#2d5a27' ? '#1c3a1c' : '#d97706'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = selectedContact.color
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>

                {selectedContact.contact !== "Contact information pending" && (
                  <a
                    href={`mailto:${selectedContact.contact}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(45, 90, 39, 0.1)',
                      color: selectedContact.color,
                      textDecoration: 'none',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      border: `1px solid ${selectedContact.color}`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = selectedContact.color
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.1)'
                      e.target.style.color = selectedContact.color
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Departments
