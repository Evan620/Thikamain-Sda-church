import React, { useState } from 'react'

const Events = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('Q1') // Q1, Q2, Q3, Q4

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  return (
    <div className="min-h-screen">
      {/* Modern Events Header */}
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
              padding: isMobile ? '6px 16px' : '8px 20px',
              borderRadius: '25px',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1rem'
            }}>
              Community Life
            </div>
            <h1 style={{
              fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Events & Activities
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Join us for worship, fellowship, and community events throughout 2025. View our complete calendar of special Sabbaths, ministry programs, and church activities.
            </p>
          </div>

          {/* Minimal Quarter Filter */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            {[
              { id: 'Q1', label: 'Q1 2025', subtitle: 'Jan - Mar', icon: '🌱' },
              { id: 'Q2', label: 'Q2 2025', subtitle: 'Apr - Jun', icon: '🌸' },
              { id: 'Q3', label: 'Q3 2025', subtitle: 'Jul - Sep', icon: '☀️' },
              { id: 'Q4', label: 'Q4 2025', subtitle: 'Oct - Dec', icon: '🍂' }
            ].map((quarter) => (
              <button
                key={quarter.id}
                onClick={() => setSelectedQuarter(quarter.id)}
                style={{
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  border: selectedQuarter === quarter.id ? '2px solid #2d5a27' : '2px solid rgba(45, 90, 39, 0.15)',
                  backgroundColor: selectedQuarter === quarter.id ? 'rgba(45, 90, 39, 0.1)' : 'white',
                  color: selectedQuarter === quarter.id ? '#2d5a27' : '#6b7280',
                  fontWeight: selectedQuarter === quarter.id ? '600' : '500',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  minWidth: '120px',
                  boxShadow: selectedQuarter === quarter.id ? '0 4px 15px rgba(45, 90, 39, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  if (selectedQuarter !== quarter.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(45, 90, 39, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedQuarter !== quarter.id) {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{quarter.icon}</span>
                <span style={{ fontWeight: '600' }}>{quarter.label}</span>
                <span style={{ fontSize: '0.8rem', opacity: '0.7' }}>{quarter.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>




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
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              {selectedQuarter} Events
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Discover our {selectedQuarter} 2025 church activities and special programs
            </p>
          </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {/* List View - Enhanced Event Cards - 2025 Calendar */}
          {(() => {
              const allEvents = [
              // JANUARY 2025
              {
                id: 1,
                title: "Quarterly Day of Prayer",
                date: "January 4, 2025",
                time: "All Day",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Prayer Event",
                description: "A special day dedicated to prayer and seeking God's guidance for the new quarter.",
                attendees: "All members welcome",
                color: '#2d5a27',
                icon: '🙏',
                department: "Elders",
                recurring: false
              },
              {
                id: 2,
                title: "Health Sabbath",
                date: "January 11, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Health Ministry",
                description: "Focus on physical, mental, and spiritual health with health screenings and wellness education.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🏥',
                department: "Health Ministry",
                recurring: false
              },
              {
                id: 3,
                title: "Ten Days of Prayer Climax",
                date: "January 18, 2025",
                time: "6:00 PM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Prayer Event",
                description: "Culmination of the annual ten days of prayer with special worship and testimonies.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🙏',
                department: "Elders",
                recurring: false
              },
              {
                id: 4,
                title: "Development Sabbath",
                date: "January 25, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Development",
                description: "Focus on church development projects and community improvement initiatives.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🏗️',
                department: "Development",
                recurring: false
              },
              // FEBRUARY 2025
              {
                id: 5,
                title: "Worker's Seminar",
                date: "February 1, 2025",
                time: "9:00 AM",
                location: "Fellowship Hall",
                category: "ministry",
                type: "Training",
                description: "Training and development seminar for church workers and ministry leaders.",
                attendees: "Church workers",
                color: '#2d5a27',
                icon: '📚',
                department: "Pastor/Elders",
                recurring: false
              },
              {
                id: 6,
                title: "AMR (Adventist Muslim Relations)",
                date: "February 8, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Interfaith",
                description: "Special program focusing on interfaith dialogue and understanding.",
                attendees: "All welcome",
                color: '#f59e0b',
                icon: '🤝',
                department: "AMR",
                recurring: false
              },
              {
                id: 7,
                title: "Stewardship Sabbath",
                date: "February 15, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Stewardship",
                description: "Focus on faithful stewardship of time, talents, and treasures.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '💰',
                department: "Stewardship",
                recurring: false
              },
              {
                id: 8,
                title: "Deacon's Day",
                date: "February 22, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Recognition",
                description: "Special recognition and appreciation for our dedicated deacons.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '👔',
                department: "Deacons",
                recurring: false
              },
              // MARCH 2025
              {
                id: 9,
                title: "Induction Sabbath",
                date: "March 1, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "youth",
                type: "Induction",
                description: "Official induction ceremony for new youth ministry leaders and members.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '👥',
                department: "Youth Ministry",
                recurring: false
              },
              {
                id: 10,
                title: "Communication Sabbath",
                date: "March 8, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Communication",
                description: "Focus on effective church communication and media ministry.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '📢',
                department: "Communication",
                recurring: false
              },
              {
                id: 11,
                title: "AWM (Adventist Women Ministry)",
                date: "March 15, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Women's Ministry",
                description: "Special program celebrating and empowering women in ministry.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '👩',
                department: "AWM",
                recurring: false
              },
              {
                id: 12,
                title: "Education Sabbath",
                date: "March 22, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Education",
                description: "Emphasis on Christian education and academic excellence.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🎓',
                department: "Education",
                recurring: false
              },
              {
                id: 13,
                title: "Holy Communion",
                date: "March 29, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "worship",
                type: "Communion",
                description: "Quarterly communion service with foot washing and Lord's Supper.",
                attendees: "All baptized members",
                color: '#2d5a27',
                icon: '🍞',
                department: "Elders",
                recurring: false
              },
              // APRIL 2025
              {
                id: 14,
                title: "Family Life Sabbath",
                date: "April 5, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Family Life",
                description: "Focus on strengthening family relationships and Christian home life.",
                attendees: "All families",
                color: '#f59e0b',
                icon: '👨‍👩‍👧‍👦',
                department: "Family Life",
                recurring: false
              },
              {
                id: 15,
                title: "Choir Day",
                date: "April 12, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Music Ministry",
                description: "Special musical program featuring our church choirs and musical talents.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🎵',
                department: "Choir",
                recurring: false
              },
              {
                id: 16,
                title: "Vocational Bible School (VBS)",
                date: "April 19, 2025",
                time: "10:00 AM",
                location: "Children's Wing",
                category: "children",
                type: "VBS",
                description: "Special Bible school program for children with fun activities and learning.",
                attendees: "Children & families",
                color: '#f59e0b',
                icon: '👶',
                department: "Children Ministry",
                recurring: false
              },
              {
                id: 17,
                title: "Ambassador's Day",
                date: "April 26, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "youth",
                type: "Youth Program",
                description: "Special program recognizing and celebrating our youth ambassadors.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🏆',
                department: "Ambassadors (AYM)",
                recurring: false
              },
              // MAY 2025
              {
                id: 18,
                title: "Personal Ministry Sabbath",
                date: "May 3, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Personal Ministry",
                description: "Focus on personal evangelism and witnessing in our daily lives.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '📖',
                department: "Personal Ministry",
                recurring: false
              },
              {
                id: 19,
                title: "Chaplaincy Sabbath",
                date: "May 10, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Chaplaincy",
                description: "Special program focusing on chaplaincy ministry and spiritual care.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '⛪',
                department: "Chaplaincy",
                recurring: false
              },
              {
                id: 20,
                title: "Adventurer's Day",
                date: "May 17, 2025",
                time: "10:00 AM",
                location: "Youth Hall",
                category: "youth",
                type: "Adventurer Program",
                description: "Special program for our young adventurers with activities and recognition.",
                attendees: "Adventurers & families",
                color: '#f59e0b',
                icon: '🏕️',
                department: "Adventurer (AYM)",
                recurring: false
              },
              {
                id: 21,
                title: "Welfare/Special Needs Sabbath",
                date: "May 24, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Welfare",
                description: "Focus on caring for those with special needs and welfare ministry.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '❤️',
                department: "Welfare",
                recurring: false
              },
              {
                id: 22,
                title: "AMM (Adventist Men Ministry)",
                date: "May 31, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Men's Ministry",
                description: "Special program celebrating and empowering men in ministry.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '👨',
                department: "AMM",
                recurring: false
              },
              // JUNE 2025
              {
                id: 23,
                title: "Sabbath School Day",
                date: "June 7, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Sabbath School",
                description: "Special focus on Sabbath School ministry and Christian education.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '📚',
                department: "Sabbath School",
                recurring: false
              },
              {
                id: 24,
                title: "AWM (Adventist Women Ministry)",
                date: "June 14, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Women's Ministry",
                description: "Second AWM program of the year celebrating women in ministry.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '👩',
                department: "AWM",
                recurring: false
              },
              {
                id: 25,
                title: "Publishing Sabbath",
                date: "June 21, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Publishing",
                description: "Focus on literature ministry and sharing God's word through publications.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '📖',
                department: "Publishing",
                recurring: false
              },
              {
                id: 26,
                title: "Holy Communion",
                date: "June 28, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "worship",
                type: "Communion",
                description: "Quarterly communion service with foot washing and Lord's Supper.",
                attendees: "All baptized members",
                color: '#f59e0b',
                icon: '🍞',
                department: "Elders",
                recurring: false
              },
              // JULY 2025
              {
                id: 27,
                title: "Youth Day",
                date: "July 5, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "youth",
                type: "Youth Program",
                description: "Special day celebrating our youth and their contributions to the church.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '👥',
                department: "Youth Ministry",
                recurring: false
              },
              {
                id: 28,
                title: "Communication Sabbath",
                date: "July 12, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Communication",
                description: "Second communication sabbath focusing on media and outreach.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '📢',
                department: "Communication",
                recurring: false
              },
              {
                id: 29,
                title: "Music Sabbath",
                date: "July 19, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Music Ministry",
                description: "Special musical program celebrating our music ministry.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🎵',
                department: "Music",
                recurring: false
              },
              {
                id: 30,
                title: "Children's Sabbath",
                date: "July 26, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "children",
                type: "Children's Program",
                description: "Special program celebrating our children and their ministry.",
                attendees: "Children & families",
                color: '#f59e0b',
                icon: '👶',
                department: "Children Ministry",
                recurring: false
              },
              // AUGUST 2025
              {
                id: 31,
                title: "Development Sabbath",
                date: "August 2, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Development",
                description: "Second development sabbath focusing on church growth and improvement.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🏗️',
                department: "Development",
                recurring: false
              },
              {
                id: 32,
                title: "Personal Ministry Sabbath",
                date: "August 9, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Personal Ministry",
                description: "Second personal ministry sabbath focusing on evangelism and witnessing.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '📖',
                department: "Personal Ministry",
                recurring: false
              },
              {
                id: 33,
                title: "Education Sabbath",
                date: "August 16, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Education",
                description: "Second education sabbath emphasizing Christian education.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🎓',
                department: "Education",
                recurring: false
              },
              {
                id: 34,
                title: "Camp Meeting",
                date: "August 23, 2025",
                time: "All Day",
                location: "Camp Grounds",
                category: "special",
                type: "Camp Meeting",
                description: "Annual camp meeting with special speakers and spiritual renewal.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '⛺',
                department: "Conference",
                recurring: false
              },
              {
                id: 35,
                title: "Elders Sabbath",
                date: "August 30, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Leadership",
                description: "Special recognition and appreciation for our church elders.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '👔',
                department: "Pastor/Elders",
                recurring: false
              },
              // SEPTEMBER 2025
              {
                id: 36,
                title: "Choir Day",
                date: "September 6, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Music Ministry",
                description: "Second choir day celebrating our musical ministry.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🎵',
                department: "Choir",
                recurring: false
              },
              {
                id: 37,
                title: "Family Life Sabbath",
                date: "September 13, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Family Life",
                description: "Second family life sabbath strengthening family relationships.",
                attendees: "All families",
                color: '#2d5a27',
                icon: '👨‍👩‍👧‍👦',
                department: "Family Life",
                recurring: false
              },
              {
                id: 38,
                title: "Pathfinder Day",
                date: "September 20, 2025",
                time: "10:00 AM",
                location: "Youth Hall",
                category: "youth",
                type: "Pathfinder Program",
                description: "Special program celebrating our pathfinder ministry.",
                attendees: "Pathfinders & families",
                color: '#f59e0b',
                icon: '🏕️',
                department: "Pathfinder (Youth Ministry)",
                recurring: false
              },
              {
                id: 39,
                title: "Holy Communion",
                date: "September 27, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "worship",
                type: "Communion",
                description: "Quarterly communion service with foot washing and Lord's Supper.",
                attendees: "All baptized members",
                color: '#2d5a27',
                icon: '🍞',
                department: "Elders",
                recurring: false
              },
              // OCTOBER 2025
              {
                id: 40,
                title: "Publishing Sabbath",
                date: "October 4, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Publishing",
                description: "Second publishing sabbath focusing on literature ministry.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '📖',
                department: "Publishing Ministry",
                recurring: false
              },
              {
                id: 41,
                title: "Pastor's Day",
                date: "October 11, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "special",
                type: "Recognition",
                description: "Special day honoring and appreciating our pastoral leadership.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '⛪',
                department: "Church",
                recurring: false
              },
              {
                id: 42,
                title: "School Sabbath",
                date: "October 18, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Education",
                description: "Special program focusing on our school ministry and education.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🏫',
                department: "School",
                recurring: false
              },
              {
                id: 43,
                title: "Creation Sabbath",
                date: "October 25, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Creation",
                description: "Celebrating God's creation and our role as stewards of the earth.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🌍',
                department: "AMM",
                recurring: false
              },
              // NOVEMBER 2025
              {
                id: 44,
                title: "Single's Sabbath",
                date: "November 1, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Singles Ministry",
                description: "Special program celebrating and supporting our single members.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '💙',
                department: "Single's Ministry",
                recurring: false
              },
              {
                id: 45,
                title: "Special Needs Sabbath",
                date: "November 8, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Welfare",
                description: "Focus on ministry to those with special needs and disabilities.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '❤️',
                department: "Welfare",
                recurring: false
              },
              {
                id: 46,
                title: "Youth Week of Prayer",
                date: "November 15, 2025",
                time: "6:00 PM",
                location: "Youth Hall",
                category: "youth",
                type: "Prayer Week",
                description: "Special week of prayer led by and for our youth ministry.",
                attendees: "Youth & all members",
                color: '#f59e0b',
                icon: '🙏',
                department: "Youth Ministry",
                recurring: false
              },
              {
                id: 47,
                title: "Master Guide's Sabbath",
                date: "November 22, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "youth",
                type: "Master Guide",
                description: "Recognition and celebration of our master guide ministry.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '🏆',
                department: "Master Guide",
                recurring: false
              },
              {
                id: 48,
                title: "Health Sabbath",
                date: "November 29, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Health Ministry",
                description: "Second health sabbath focusing on total wellness.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🏥',
                department: "Health",
                recurring: false
              },
              // DECEMBER 2025
              {
                id: 49,
                title: "Stewardship Sabbath",
                date: "December 6, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Stewardship",
                description: "Second stewardship sabbath focusing on faithful giving.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '💰',
                department: "Stewardship",
                recurring: false
              },
              {
                id: 50,
                title: "Ambassador's Day",
                date: "December 13, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "youth",
                type: "Youth Program",
                description: "Second ambassador's day celebrating our youth ambassadors.",
                attendees: "All members",
                color: '#f59e0b',
                icon: '🏆',
                department: "Ambassador (Youth Ministry)",
                recurring: false
              },
              {
                id: 51,
                title: "Deacon's Day",
                date: "December 20, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "ministry",
                type: "Recognition",
                description: "Second deacon's day appreciating our dedicated deacons.",
                attendees: "All members",
                color: '#2d5a27',
                icon: '👔',
                department: "Deacons",
                recurring: false
              },
              {
                id: 52,
                title: "Holy Communion",
                date: "December 27, 2025",
                time: "10:00 AM",
                location: "Main Sanctuary",
                category: "worship",
                type: "Communion",
                description: "Year-end communion service with foot washing and Lord's Supper.",
                attendees: "All baptized members",
                color: '#f59e0b',
                icon: '🍞',
                department: "Elders",
                recurring: false
              }
              ];

              // Filter events by quarter
              const getQuarterFromDate = (dateStr) => {
                const month = new Date(dateStr).getMonth() + 1;
                if (month <= 3) return 'Q1';
                if (month <= 6) return 'Q2';
                if (month <= 9) return 'Q3';
                return 'Q4';
              };

              // Filter events based on selected quarter only
              const filteredEvents = allEvents.filter(event => {
                return getQuarterFromDate(event.date) === selectedQuarter;
              });

              return filteredEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  height: 'fit-content'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header Section */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      {/* Event Type and Recurring Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          backgroundColor: `${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                          color: event.color,
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {event.type}
                        </span>
                        {event.recurring && (
                          <span style={{
                            backgroundColor: 'rgba(107, 114, 128, 0.1)',
                            color: '#6b7280',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            RECURRING
                          </span>
                        )}
                      </div>

                      {/* Title with Icon */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                      }}>
                        <div style={{
                          width: '3rem',
                          height: '3rem',
                          background: `linear-gradient(135deg, ${event.color}, ${event.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem'
                        }}>
                          {event.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1.4rem',
                          fontWeight: '700',
                          color: '#2d5a27',
                          lineHeight: '1.3',
                          margin: 0
                        }}>
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Date and Time Section */}
                    <div style={{
                      textAlign: 'right',
                      minWidth: '150px'
                    }}>
                      <div style={{
                        backgroundColor: event.color,
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {event.date}
                      </div>
                      <div style={{
                        color: '#6b7280',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {event.time}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                  }}>
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    {/* Location */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(45, 90, 39, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem', color: '#2d5a27' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                        {event.location}
                      </span>
                    </div>

                    {/* Expected Attendees */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(245, 158, 11, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                        {event.attendees}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      backgroundColor: event.color,
                      color: 'white',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = `0 8px 25px ${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                    >
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Learn More
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: event.color,
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: `2px solid ${event.color}`,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = event.color
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = event.color
                      e.target.style.transform = 'translateY(0)'
                    }}
                    >
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
        </div>
      </section>

      {/* Recurring Events Section */}
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
              Regular Schedule
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Weekly Activities
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Join us for our regular weekly programs and services
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                day: 'Saturday',
                events: [
                  { time: '9:00 AM', name: 'Sabbath School', icon: '📚' },
                  { time: '11:00 AM', name: 'Divine Service', icon: '⛪' },
                  { time: '3:00 PM', name: 'Afternoon Program', icon: '🎵' }
                ],
                color: '#2d5a27'
              },
              {
                day: 'Wednesday',
                events: [
                  { time: '6:00 PM', name: 'Prayer Meeting', icon: '🙏' },
                  { time: '7:00 PM', name: 'Bible Study', icon: '📖' }
                ],
                color: '#f59e0b'
              },
              {
                day: 'Friday',
                events: [
                  { time: '6:00 PM', name: 'Youth Meeting', icon: '👥' },
                  { time: '7:30 PM', name: 'Vespers', icon: '🕯️' }
                ],
                color: '#2d5a27'
              },
              {
                day: 'Sunday',
                events: [
                  { time: '10:00 AM', name: 'Community Service', icon: '🤝' },
                  { time: '2:00 PM', name: 'Health Ministry', icon: '🏥' }
                ],
                color: '#f59e0b'
              }
            ].map((schedule, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
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
                  background: `radial-gradient(circle, ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Day Header */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: schedule.color,
                      marginBottom: '0.5rem'
                    }}>
                      {schedule.day}
                    </h3>
                    <div style={{
                      width: '50px',
                      height: '3px',
                      backgroundColor: schedule.color,
                      borderRadius: '2px',
                      margin: '0 auto'
                    }}></div>
                  </div>

                  {/* Events List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {schedule.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          backgroundColor: 'white',
                          borderRadius: '12px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundColor: schedule.color,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}>
                          {event.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.25rem'
                          }}>
                            {event.name}
                          </div>
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontWeight: '500'
                          }}>
                            {event.time}
                          </div>
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

      {/* Call to Action Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '1rem'
              }}>
                Stay Connected
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Never miss an event! Subscribe to our newsletter or follow us on social media to stay updated with all our activities and special events.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  backgroundColor: '#2d5a27',
                  color: 'white',
                  fontWeight: '600',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 8px 25px rgba(45, 90, 39, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)'
                  e.target.style.boxShadow = '0 12px 40px rgba(45, 90, 39, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.3)'
                }}
                >
                  Subscribe to Newsletter
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: '#2d5a27',
                  fontWeight: '600',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: '2px solid #2d5a27',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2d5a27'
                  e.target.style.color = 'white'
                  e.target.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#2d5a27'
                  e.target.style.transform = 'translateY(0)'
                }}
                >
                  Follow Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
