import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-pattern"></div>
      <div className="footer-content">
        <div className="footer-grid">
          {/* Church Info */}
          <div className="footer-section">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src="/assets/seventhdayadventistchurch.png"
                alt="Seventh-day Adventist Church Logo"
                style={{
                  width: '3rem',
                  height: '3rem',
                  objectFit: 'contain',
                  marginRight: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '0.75rem',
                  padding: '0.25rem',
                  boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)'
                }}
              />
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                  Thika Main SDA
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>Church</p>
              </div>
            </div>

            <p style={{ color: '#d1d5db', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              A vibrant community of believers committed to sharing God's love and truth
              in Thika and beyond. Join us as we grow together in faith, hope, and love.
            </p>

            <div>
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div>Makongeni, Thika, Kiambu County, Kenya</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
                    P.O BOX 3478-01002 Madaraka Thika
                  </div>
                </div>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+254 XXX XXX XXX</span>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@thikamainsdachurch.org</span>
              </div>
            </div>

            <div className="footer-social">
              <a href="#" className="footer-social-link" title="Facebook">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a href="#" className="footer-social-link" title="WhatsApp">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>

              <a href="#" className="footer-social-link" title="YouTube">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a href="#" className="footer-social-link" title="Instagram">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.718.302 4.019.57a5.962 5.962 0 0 0-2.153 1.4A5.962 5.962 0 0 0 .466 4.123C.198 4.822.023 5.63-.032 6.86-.088 8.094-.104 8.5-.104 12.121s.016 4.027.072 5.261c.055 1.23.23 2.038.498 2.737a5.962 5.962 0 0 0 1.4 2.153 5.962 5.962 0 0 0 2.153 1.4c.699.268 1.507.443 2.737.498 1.234.056 1.64.072 5.261.072s4.027-.016 5.261-.072c1.23-.055 2.038-.23 2.737-.498a5.962 5.962 0 0 0 2.153-1.4 5.962 5.962 0 0 0 1.4-2.153c.268-.699.443-1.507.498-2.737.056-1.234.072-1.64.072-5.261s-.016-4.027-.072-5.261c-.055-1.23-.23-2.038-.498-2.737a5.962 5.962 0 0 0-1.4-2.153A5.962 5.962 0 0 0 19.881.57C19.182.302 18.374.127 17.144.072 15.91.016 15.504 0 11.883 0h.134zm-.283 2.178c.362-.003.766-.003 1.283-.003 3.573 0 3.994.014 5.402.067 1.3.06 2.006.278 2.476.462.622.242 1.066.532 1.532.998.466.466.756.91.998 1.532.184.47.402 1.176.462 2.476.053 1.408.067 1.829.067 5.402 0 3.573-.014 3.994-.067 5.402-.06 1.3-.278 2.006-.462 2.476-.242.622-.532 1.066-.998 1.532-.466.466-.91.756-1.532.998-.47.184-1.176.402-2.476.462-1.408.053-1.829.067-5.402.067-3.573 0-3.994-.014-5.402-.067-1.3-.06-2.006-.278-2.476-.462-.622-.242-1.066-.532-1.532-.998-.466-.466-.756-.91-.998-1.532-.184-.47-.402-1.176-.462-2.476-.053-1.408-.067-1.829-.067-5.402 0-3.573.014-3.994.067-5.402.06-1.3.278-2.006.462-2.476.242-.622.532-1.066.998-1.532.466-.466.91-.756 1.532-.998.47-.184 1.176-.402 2.476-.462 1.232-.056 1.708-.07 4.119-.07l.283.003zm5.674 2.053a1.265 1.265 0 1 0 0 2.53 1.265 1.265 0 0 0 0-2.53zm-4.108 1.05a4.773 4.773 0 1 0 0 9.546 4.773 4.773 0 0 0 0-9.546zm0 2.178a2.595 2.595 0 1 1 0 5.19 2.595 2.595 0 0 1 0-5.19z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/about" className="footer-link">
                  About Our Church
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/sermons" className="footer-link">
                  Sermons & Messages
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/events" className="footer-link">
                  Events & Activities
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/ministries" className="footer-link">
                  Our Ministries
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/giving" className="footer-link">
                  Give Online
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div className="footer-section">
            <h4 className="footer-title">Service Times</h4>
            <div style={{ color: '#d1d5db' }}>
              <div style={{
                background: 'rgba(45, 90, 39, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid rgba(45, 90, 39, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong style={{ color: '#f59e0b' }}>Sabbath School</strong>
                </div>
                <p style={{ margin: 0, paddingLeft: '1.5rem' }}>Saturday 9:00 AM</p>
              </div>

              <div style={{
                background: 'rgba(45, 90, 39, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid rgba(45, 90, 39, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <strong style={{ color: '#f59e0b' }}>Divine Service</strong>
                </div>
                <p style={{ margin: 0, paddingLeft: '1.5rem' }}>Saturday 11:00 AM</p>
              </div>

              <div style={{
                background: 'rgba(45, 90, 39, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid rgba(45, 90, 39, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong style={{ color: '#f59e0b' }}>Prayer Meeting</strong>
                </div>
                <p style={{ margin: 0, paddingLeft: '1.5rem' }}>Wednesday 6:00 PM</p>
              </div>

              <div style={{
                background: 'rgba(45, 90, 39, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(45, 90, 39, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <strong style={{ color: '#f59e0b' }}>Youth Meeting</strong>
                </div>
                <p style={{ margin: 0, paddingLeft: '1.5rem' }}>Friday 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Ministries */}
          <div className="footer-section">
            <h4 className="footer-title">Our Ministries</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>• Youth Ministry</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>• Women's Ministry</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>• Men's Ministry</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>• Children's Ministry</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>• Music Ministry</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>• Community Outreach</span>
              </li>
            </ul>

            <Link
              to="/ministries"
              className="btn-outline"
              style={{
                marginTop: '1rem',
                display: 'inline-block',
                fontSize: '0.875rem',
                padding: '0.5rem 1rem'
              }}
            >
              View All Ministries
            </Link>
          </div>
        </div>

        {/* Inspirational Verse */}
        <div className="footer-verse">
          <div className="footer-verse-text">
            "And let us consider how we may spur one another on toward love and good deeds,
            not giving up meeting together, as some are in the habit of doing, but encouraging
            one another—and all the more as you see the Day approaching."
          </div>
          <div className="footer-verse-ref">— Hebrews 10:24-25</div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '1rem'
            }}>
              <Link to="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
                Privacy Policy
              </Link>
              <Link to="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
                Terms of Service
              </Link>
              <Link to="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
                Support
              </Link>
              <Link to="/giving" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
                Donate
              </Link>
            </div>

            <div style={{
              textAlign: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '1.5rem',
              width: '100%'
            }}>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
                © 2025 Thika Main Seventh-Day Adventist Church. All rights reserved.
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>
                Built with ❤️ for God's glory | Spreading hope and love in Thika and beyond
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
