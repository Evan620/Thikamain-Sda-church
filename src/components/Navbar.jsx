import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [ministriesDropdownOpen, setMinistriesDropdownOpen] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState(null)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Sermons', href: '/sermons', icon: '🎤' },
    { name: 'Events', href: '/events', icon: '📅' },
    {
      name: 'Ministries',
      href: '/ministries',
      icon: '🤝',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Ministries', href: '/ministries', icon: '🤝' },
        { name: 'Departments', href: '/departments', icon: '🏢' }
      ]
    },
    { name: 'Contact', href: '/contact', icon: '📞' },
    { name: 'Give', href: '/giving', icon: '💝' },
  ]

  const isActive = (path) => location.pathname === path
  const isMinistryDropdownActive = () => location.pathname === '/ministries' || location.pathname === '/departments'

  // Dynamic button text based on current page
  const getDynamicButtonText = () => {
    if (location.pathname === '/departments') return 'Departments'
    return 'Ministries'
  }

  const getDynamicButtonIcon = () => {
    if (location.pathname === '/departments') return '🏢'
    return '🤝'
  }

  // Improved dropdown handlers
  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setMinistriesDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setMinistriesDropdownOpen(false)
    }, 300) // Increased delay for easier navigation
    setDropdownTimeout(timeout)
  }

  const navStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  }

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '95px',
    padding: '0 1rem'
  }

  const mobileContainerStyle = {
    ...containerStyle,
    height: '75px',
    padding: '0 1rem'
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    textDecoration: 'none'
  }

  const logoIconStyle = {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #2d5a27, #1c3a1c)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    boxShadow: '0 4px 12px rgba(45, 90, 39, 0.2)'
  }

  const mobileLogoIconStyle = {
    ...logoIconStyle,
    width: '40px',
    height: '40px',
    fontSize: '18px'
  }

  const logoTextStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2d5a27',
    letterSpacing: '-0.5px'
  }

  const mobileLogoTextStyle = {
    ...logoTextStyle,
    fontSize: '20px'
  }

  const logoSubtextStyle = {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '-2px',
    fontWeight: '500',
    letterSpacing: '0.5px'
  }

  const mobileLogoSubtextStyle = {
    ...logoSubtextStyle,
    fontSize: '11px'
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '4px',
    alignItems: 'center'
  }

  const linkStyle = {
    padding: '12px 20px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    position: 'relative'
  }

  const hamburgerStyle = {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  }

  const hamburgerLineStyle = {
    width: '24px',
    height: '3px',
    backgroundColor: '#2d5a27',
    margin: '2px 0',
    transition: 'all 0.3s ease',
    borderRadius: '2px'
  }

  const mobileMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 50,
    maxHeight: isOpen ? '70vh' : '0',
    overflow: isOpen ? 'auto' : 'hidden',
    WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
  }

  const mobileMenuContainerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem',
    paddingBottom: '1.5rem' // Extra padding at bottom for better scrolling
  }

  const mobileLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '18px 24px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    minHeight: '60px',
    position: 'relative',
    gap: '12px'
  }

  const mobileGiveButtonStyle = {
    display: 'block',
    margin: '1rem 20px',
    padding: '14px 24px',
    backgroundColor: '#f59e0b',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
    transition: 'all 0.3s ease'
  }

  // Enhanced mobile detection with resize listener
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)
  const [isTablet, setIsTablet] = React.useState(window.innerWidth >= 768 && window.innerWidth < 1024)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      if (window.innerWidth >= 768) {
        setIsOpen(false) // Close mobile menu on desktop
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }


        `}
      </style>
      <nav style={navStyle}>
      <div style={isMobile ? mobileContainerStyle : containerStyle}>
        <Link to="/" style={{
          ...logoStyle,
          alignItems: 'center',
          gap: isMobile ? '0.75rem' : '1rem'
        }}>
          <img
            src="/assets/seventhdayadventistchurch.png"
            alt="Seventh-day Adventist Church Logo"
            style={{
              width: isMobile ? '50px' : '65px',
              height: isMobile ? '50px' : '65px',
              objectFit: 'contain',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px',
              boxShadow: '0 2px 8px rgba(45, 90, 39, 0.15)',
              border: '1px solid rgba(45, 90, 39, 0.1)'
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '15px' : '17px',
              fontWeight: '700',
              color: '#2d5a27',
              letterSpacing: '-0.2px',
              lineHeight: '1.2',
              marginBottom: '1px'
            }}>
              Thika Main SDA
            </div>
            <div style={{
              fontSize: isMobile ? '10px' : '11px',
              color: '#6b7280',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Church
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          ...navLinksStyle,
          display: window.innerWidth >= 768 ? 'flex' : 'none'
        }}>
          {navigation.slice(0, -1).map((item) => (
            item.hasDropdown ? (
              <div
                key={item.name}
                style={{
                  position: 'relative',
                  display: 'inline-block'
                }}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div
                  style={{
                    ...linkStyle,
                    color: isMinistryDropdownActive() ? '#2d5a27' : '#4b5563',
                    backgroundColor: isMinistryDropdownActive() ? 'rgba(45, 90, 39, 0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => setMinistriesDropdownOpen(!ministriesDropdownOpen)}
                >
                  <span style={{
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>{getDynamicButtonIcon()}</span>
                    {getDynamicButtonText()}
                  </span>

                  {/* Active page indicator */}
                  {isMinistryDropdownActive() && (
                    <span style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#2d5a27',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}></span>
                  )}

                  <svg
                    style={{
                      width: '12px',
                      height: '12px',
                      transform: ministriesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      marginLeft: 'auto'
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {ministriesDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(45, 90, 39, 0.1)',
                      minWidth: '200px',
                      zIndex: 1000,
                      overflow: 'hidden',
                      marginTop: '4px',
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '14px 20px',
                          color: isActive(dropdownItem.href) ? '#2d5a27' : '#4b5563',
                          backgroundColor: isActive(dropdownItem.href) ? 'rgba(45, 90, 39, 0.1)' : 'transparent',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          fontWeight: isActive(dropdownItem.href) ? '600' : '500',
                          transition: 'all 0.2s ease',
                          borderBottom: dropdownItem === item.dropdownItems[item.dropdownItems.length - 1] ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
                          cursor: 'pointer'
                        }}
                        onClick={() => setMinistriesDropdownOpen(false)}
                        onMouseEnter={(e) => {
                          if (!isActive(dropdownItem.href)) {
                            e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.08)'
                            e.target.style.color = '#2d5a27'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(dropdownItem.href)) {
                            e.target.style.backgroundColor = 'transparent'
                            e.target.style.color = '#4b5563'
                          }
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>{dropdownItem.icon}</span>
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  ...linkStyle,
                  color: isActive(item.href) ? '#2d5a27' : '#4b5563',
                  backgroundColor: isActive(item.href) ? 'rgba(45, 90, 39, 0.08)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.target.style.color = '#2d5a27'
                    e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.05)'
                    e.target.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.target.style.color = '#4b5563'
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                {item.name}
              </Link>
            )
          ))}
          {/* Special Give Button */}
          <Link
            to="/giving"
            className="btn-secondary"
            style={{
              marginLeft: '24px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)'
            }}
          >
            Give
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div
          style={{
            ...hamburgerStyle,
            display: window.innerWidth < 768 ? 'flex' : 'none'
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={{
            ...hamburgerLineStyle,
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></div>
          <div style={{
            ...hamburgerLineStyle,
            opacity: isOpen ? 0 : 1
          }}></div>
          <div style={{
            ...hamburgerLineStyle,
            transform: isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }}></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle} className="mobile-menu-scrollable">
        <div style={mobileMenuContainerStyle}>
          {navigation.slice(0, -1).map((item, index) => (
            item.hasDropdown ? (
              <div key={item.name}>
                {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                  <Link
                    key={dropdownItem.name}
                    to={dropdownItem.href}
                    style={{
                      ...mobileLinkStyle,
                      color: isActive(dropdownItem.href) ? '#2d5a27' : '#4b5563',
                      backgroundColor: isActive(dropdownItem.href) ? 'rgba(45, 90, 39, 0.05)' : 'transparent',
                      animationDelay: `${(index + dropdownIndex) * 50}ms`,
                      paddingLeft: '1rem'
                    }}
                    onClick={() => setIsOpen(false)}
                    onTouchStart={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(45, 90, 39, 0.1)'
                    }}
                    onTouchEnd={(e) => {
                      setTimeout(() => {
                        if (!isActive(dropdownItem.href)) {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }, 150)
                    }}
                  >
                    <span style={{
                      fontSize: '1.25rem',
                      width: '24px',
                      textAlign: 'center',
                      flexShrink: 0
                    }}>
                      {dropdownItem.icon}
                    </span>
                    <span style={{ flex: 1 }}>{dropdownItem.name}</span>
                    {isActive(dropdownItem.href) && (
                      <span style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#2d5a27',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  ...mobileLinkStyle,
                  color: isActive(item.href) ? '#2d5a27' : '#4b5563',
                  backgroundColor: isActive(item.href) ? 'rgba(45, 90, 39, 0.05)' : 'transparent',
                  animationDelay: `${index * 50}ms`
                }}
                onClick={() => setIsOpen(false)}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(45, 90, 39, 0.1)'
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }, 150)
                }}
              >
                <span style={{
                  fontSize: '1.25rem',
                  width: '24px',
                  textAlign: 'center',
                  flexShrink: 0
                }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{item.name}</span>
                {isActive(item.href) && (
                  <span style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#2d5a27',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></span>
                )}
              </Link>
            )
          ))}
          <Link
            to="/giving"
            style={mobileGiveButtonStyle}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            Give
          </Link>

          {/* Scroll indicator for mobile */}
          {isOpen && (
            <div style={{
              textAlign: 'center',
              padding: '0.5rem 0',
              color: '#6b7280',
              fontSize: '0.75rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              marginTop: '0.5rem'
            }}>
              <span style={{ opacity: 0.7 }}>↕️ Scroll for more options</span>
            </div>
          )}
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
