import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Contact', href: '/contact' },
    { name: 'Give', href: '/giving' },
  ]

  const isActive = (path) => location.pathname === path

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
    height: '90px',
    padding: '0 1rem'
  }

  const mobileContainerStyle = {
    ...containerStyle,
    height: '70px',
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
    display: isOpen ? 'block' : 'none',
    zIndex: 50
  }

  const mobileMenuContainerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem'
  }

  const mobileLinkStyle = {
    display: 'block',
    padding: '16px 20px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
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

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768

  return (
    <nav style={navStyle}>
      <div style={isMobile ? mobileContainerStyle : containerStyle}>
        <Link to="/" style={logoStyle}>
          <div style={isMobile ? mobileLogoIconStyle : logoIconStyle}>T</div>
          <div>
            <div style={isMobile ? mobileLogoTextStyle : logoTextStyle}>Thika Main SDA</div>
            <div style={isMobile ? mobileLogoSubtextStyle : logoSubtextStyle}>Church</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          ...navLinksStyle,
          display: window.innerWidth >= 768 ? 'flex' : 'none'
        }}>
          {navigation.slice(0, -1).map((item) => (
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
      <div style={mobileMenuStyle}>
        <div style={mobileMenuContainerStyle}>
          {navigation.slice(0, -1).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              style={{
                ...mobileLinkStyle,
                color: isActive(item.href) ? '#2d5a27' : '#4b5563',
                backgroundColor: isActive(item.href) ? 'rgba(45, 90, 39, 0.05)' : 'transparent'
              }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => {
                if (!isActive(item.href)) {
                  e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.05)'
                  e.target.style.color = '#2d5a27'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#4b5563'
                }
              }}
            >
              {item.name}
            </Link>
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
