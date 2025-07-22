import React, { useState } from 'react'

const Departments = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

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
      contact: "Contact information pending",
      responsibilities: ["Strategic Planning", "Vision Implementation", "Policy Development", "Resource Allocation"],
      icon: "📊",
      color: "#2d5a27"
    },
    {
      id: 2,
      name: "Communication",
      category: "administrative", 
      description: "Manages church communications, media outreach, and information dissemination to members and community.",
      head: "Charles Kyalo Simon",
      contact: "Contact information pending",
      responsibilities: ["Media Management", "Church Communications", "Website Management", "Social Media"],
      icon: "📢",
      color: "#f59e0b"
    },
    {
      id: 3,
      name: "Finance & Treasury",
      category: "administrative",
      description: "Oversees church finances, budgeting, and financial stewardship with transparency and accountability.",
      head: "Elder Joseph Kimilu",
      contact: "Contact information pending",
      responsibilities: ["Financial Management", "Budget Planning", "Audit Oversight", "Stewardship"],
      icon: "💰",
      color: "#2d5a27"
    },
    {
      id: 4,
      name: "Church Secretary",
      category: "administrative",
      description: "Maintains church records, coordinates meetings, and handles administrative correspondence.",
      head: "Sister Effie Muthoni",
      contact: "Contact information pending",
      responsibilities: ["Record Keeping", "Meeting Coordination", "Correspondence", "Documentation"],
      icon: "📝",
      color: "#f59e0b"
    },

  ]

  const categories = [
    { id: 'all', label: 'All Departments', icon: '🏢' },
    { id: 'administrative', label: 'Administrative', icon: '📋' }
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
                <button style={{
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
    </div>
  )
}

export default Departments
