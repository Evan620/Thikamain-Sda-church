import React, { useState } from 'react'

const Ministries = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMinistry, setSelectedMinistry] = useState(null)
  const [showVolunteerForm, setShowVolunteerForm] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  const ministries = [
    // Age Groups
    {
      id: 1,
      name: "Youth Ministry",
      category: "age-groups",
      description: "Empowering young people aged 13-25 to grow in faith, build lasting friendships, and serve their community through dynamic programs and activities.",
      leader: "Duncan Mageto",
      contact: "duncanmageto76@gmail.com",
      phone: "704385185",
      meetingTime: "Fridays 6:00 PM",
      location: "Youth Hall",
      activities: ["Bible Study", "Community Service", "Sports", "Music"],
      icon: "👥",
      color: "#2d5a27",
      image: "/api/placeholder/400/250",
      detailedDescription: "Our Youth Ministry is dedicated to nurturing the spiritual, emotional, and social development of young people. We provide a safe space where youth can explore their faith, ask questions, and grow in their relationship with Jesus Christ. Through various programs including weekly Bible studies, community service projects, sports activities, and music ministry, we aim to develop well-rounded Christian leaders for tomorrow.",
      mission: "To empower young people to live purposeful lives centered on Christ and to equip them for leadership in the church and community.",
      volunteerOpportunities: [
        {
          title: "Youth Leader Assistant",
          description: "Help facilitate youth programs and mentor young people",
          requirements: ["Heart for youth ministry", "Regular church attendance", "Background check"],
          timeCommitment: "4-6 hours per week"
        },
        {
          title: "Music Coordinator",
          description: "Lead youth worship team and organize musical activities",
          requirements: ["Musical skills", "Leadership experience", "Passion for worship"],
          timeCommitment: "3-4 hours per week"
        },
        {
          title: "Event Organizer",
          description: "Plan and coordinate youth events and outreach activities",
          requirements: ["Event planning experience", "Creative thinking", "Team player"],
          timeCommitment: "2-3 hours per week"
        }
      ],
      resources: [
        { name: "Youth Bible Study Guide", type: "PDF", size: "2.3 MB" },
        { name: "Activity Planning Template", type: "DOC", size: "1.1 MB" },
        { name: "Youth Ministry Handbook", type: "PDF", size: "5.2 MB" },
        { name: "Community Service Ideas", type: "PDF", size: "800 KB" }
      ],
      photoGallery: [
        { url: "/api/placeholder/300/200", caption: "Youth Bible Study Session" },
        { url: "/api/placeholder/300/200", caption: "Community Service Project" },
        { url: "/api/placeholder/300/200", caption: "Youth Sports Day" },
        { url: "/api/placeholder/300/200", caption: "Music Ministry Practice" },
        { url: "/api/placeholder/300/200", caption: "Youth Retreat 2024" },
        { url: "/api/placeholder/300/200", caption: "Baptism Celebration" }
      ],
      schedule: [
        { day: "Friday", time: "6:00 PM - 8:00 PM", activity: "Youth Bible Study & Fellowship", location: "Youth Hall" },
        { day: "Saturday", time: "2:00 PM - 4:00 PM", activity: "Community Service (Monthly)", location: "Various Locations" },
        { day: "Sunday", time: "4:00 PM - 6:00 PM", activity: "Youth Choir Practice", location: "Main Sanctuary" }
      ]
    },
    {
      id: 2,
      name: "Children's Ministry",
      category: "age-groups",
      description: "Nurturing children ages 3-12 in their relationship with Jesus Christ through engaging lessons, activities, and loving care.",
      leader: "Erick Yonni",
      contact: "erickyonni@gmail.com",
      phone: "723522933",
      meetingTime: "Saturdays 9:00 AM",
      location: "Children's Wing",
      activities: ["Sabbath School", "Vacation Bible School", "Children's Choir", "Crafts"],
      icon: "👶",
      color: "#f59e0b",
      image: "/api/placeholder/400/250",
      detailedDescription: "Our Children's Ministry creates a loving, safe environment where children can learn about God's love through age-appropriate activities, stories, and hands-on experiences. We believe in nurturing each child's unique gifts and helping them develop a personal relationship with Jesus Christ that will last a lifetime.",
      mission: "To introduce children to Jesus Christ and help them grow in faith through engaging, age-appropriate programs that build strong spiritual foundations.",
      volunteerOpportunities: [
        {
          title: "Sabbath School Teacher",
          description: "Teach weekly Sabbath School classes for children",
          requirements: ["Love for children", "Teaching experience preferred", "Background check required"],
          timeCommitment: "2-3 hours per week"
        },
        {
          title: "Children's Choir Director",
          description: "Lead children's choir and teach music fundamentals",
          requirements: ["Musical background", "Experience with children", "Patience and creativity"],
          timeCommitment: "2 hours per week"
        },
        {
          title: "Craft Coordinator",
          description: "Plan and lead craft activities that reinforce Bible lessons",
          requirements: ["Creative skills", "Craft experience", "Heart for children"],
          timeCommitment: "1-2 hours per week"
        }
      ],
      resources: [
        { name: "Children's Sabbath School Lessons", type: "PDF", size: "3.1 MB" },
        { name: "Bible Story Activity Book", type: "PDF", size: "4.5 MB" },
        { name: "Craft Ideas for Bible Lessons", type: "PDF", size: "2.8 MB" },
        { name: "Children's Songs Collection", type: "PDF", size: "1.9 MB" }
      ],
      photoGallery: [
        { url: "/api/placeholder/300/200", caption: "Sabbath School Class" },
        { url: "/api/placeholder/300/200", caption: "Vacation Bible School" },
        { url: "/api/placeholder/300/200", caption: "Children's Choir Performance" },
        { url: "/api/placeholder/300/200", caption: "Bible Craft Activity" },
        { url: "/api/placeholder/300/200", caption: "Children's Day Celebration" },
        { url: "/api/placeholder/300/200", caption: "Story Time Session" }
      ],
      schedule: [
        { day: "Saturday", time: "9:00 AM - 10:30 AM", activity: "Sabbath School", location: "Children's Wing" },
        { day: "Saturday", time: "11:00 AM - 12:00 PM", activity: "Children's Church", location: "Children's Wing" },
        { day: "Wednesday", time: "4:00 PM - 5:00 PM", activity: "Children's Choir Practice", location: "Music Room" }
      ]
    },
    {
      id: 3,
      name: "Women's Ministry",
      category: "age-groups",
      description: "Supporting and encouraging women in their spiritual journey through fellowship, study, and service opportunities.",
      leader: "Janet Joan Ouma",
      contact: "Contact information pending",
      phone: "Contact information pending",
      meetingTime: "Second Sunday 2:00 PM",
      location: "Fellowship Hall",
      activities: ["Bible Study", "Prayer Groups", "Community Service", "Retreats"],
      icon: "👩",
      color: "#2d5a27",
      image: "/api/placeholder/400/250",
      detailedDescription: "Our Women's Ministry provides a supportive community where women of all ages can grow spiritually, build meaningful relationships, and discover their unique purpose in God's kingdom. Through Bible studies, prayer groups, and service projects, we encourage one another in faith and life.",
      mission: "To empower women to live out their faith boldly, support one another through life's challenges, and serve God and community with passion and purpose.",
      volunteerOpportunities: [
        {
          title: "Bible Study Leader",
          description: "Facilitate weekly women's Bible study groups",
          requirements: ["Strong biblical knowledge", "Leadership skills", "Heart for women's ministry"],
          timeCommitment: "3-4 hours per week"
        },
        {
          title: "Prayer Coordinator",
          description: "Organize prayer groups and coordinate prayer requests",
          requirements: ["Strong prayer life", "Organizational skills", "Compassionate heart"],
          timeCommitment: "2-3 hours per week"
        },
        {
          title: "Retreat Organizer",
          description: "Plan and coordinate women's retreats and special events",
          requirements: ["Event planning experience", "Attention to detail", "Team leadership"],
          timeCommitment: "4-6 hours per month"
        }
      ],
      resources: [
        { name: "Women's Bible Study Guide", type: "PDF", size: "2.7 MB" },
        { name: "Prayer Journal Template", type: "PDF", size: "1.5 MB" },
        { name: "Retreat Planning Guide", type: "DOC", size: "2.1 MB" },
        { name: "Women's Ministry Handbook", type: "PDF", size: "3.8 MB" }
      ],
      photoGallery: [
        { url: "/api/placeholder/300/200", caption: "Women's Bible Study" },
        { url: "/api/placeholder/300/200", caption: "Prayer Group Meeting" },
        { url: "/api/placeholder/300/200", caption: "Annual Women's Retreat" },
        { url: "/api/placeholder/300/200", caption: "Community Service Project" },
        { url: "/api/placeholder/300/200", caption: "Mother's Day Celebration" },
        { url: "/api/placeholder/300/200", caption: "Fellowship Dinner" }
      ],
      schedule: [
        { day: "Sunday", time: "2:00 PM - 4:00 PM", activity: "Monthly Women's Meeting (2nd Sunday)", location: "Fellowship Hall" },
        { day: "Wednesday", time: "7:00 PM - 8:30 PM", activity: "Bible Study Group", location: "Conference Room" },
        { day: "Saturday", time: "6:00 AM - 7:00 AM", activity: "Prayer Group", location: "Prayer Room" }
      ]
    },
    {
      id: 4,
      name: "Men's Ministry",
      category: "age-groups",
      description: "Building strong Christian men and fathers through fellowship, accountability, and service to God and community.",
      leader: "Benard Mogere",
      contact: "Contact information pending",
      meetingTime: "First Sunday 3:00 PM",
      location: "Conference Room",
      activities: ["Bible Study", "Mentorship", "Community Projects", "Fellowship"],
      icon: "👨",
      color: "#f59e0b",
      image: "/api/placeholder/400/250"
    },
    // Worship & Music
    {
      id: 5,
      name: "Music Ministry",
      category: "worship",
      description: "Leading worship through music and praise, inspiring hearts to connect with God through the power of song.",
      leader: "Paul Odongo",
      contact: "paulodongo43@gmail.com",
      meetingTime: "Thursdays 7:00 PM",
      location: "Main Sanctuary",
      activities: ["Choir Practice", "Instrumental Training", "Worship Leading", "Special Music"],
      icon: "🎵",
      color: "#2d5a27",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      name: "Prayer Ministry",
      category: "worship",
      description: "Fostering a culture of prayer through intercession, prayer chains, and teaching on the power of prayer.",
      leader: "Rael Karimi",
      contact: "Contact information pending",
      meetingTime: "Wednesdays 6:00 PM",
      location: "Prayer Room",
      activities: ["Prayer Meetings", "Intercessory Prayer", "Prayer Chains", "Prayer Workshops"],
      icon: "🙏",
      color: "#f59e0b",
      image: "/api/placeholder/400/250"
    },
    // Outreach

    {
      id: 8,
      name: "Health Ministry",
      category: "health",
      description: "Promoting wholistic health and wellness through education, screenings, and lifestyle programs.",
      leader: "Elizabeth Sapato",
      contact: "Contact information pending",
      meetingTime: "Second Sunday 10:00 AM",
      location: "Health Center",
      activities: ["Health Screenings", "Nutrition Classes", "Fitness Programs", "Wellness Seminars"],
      icon: "🏥",
      color: "#f59e0b",
      image: "/api/placeholder/400/250"
    },
    // Education

    {
      id: 10,
      name: "Family Life Ministry",
      category: "support",
      description: "Strengthening families through counseling, workshops, and support programs for healthy relationships.",
      leader: "Reuben Lusasi",
      contact: "rlusasi@yahoo.com",
      meetingTime: "Third Sunday 2:00 PM",
      location: "Family Center",
      activities: ["Marriage Counseling", "Parenting Classes", "Family Retreats", "Support Groups"],
      icon: "💙",
      color: "#f59e0b",
      image: "/api/placeholder/400/250"
    },
    {
      id: 11,
      name: "Choir Ministry",
      category: "worship",
      description: "Dedicated choir ministry that leads worship through beautiful harmonies and spiritual songs.",
      leader: "Justus Arita",
      contact: "justusarita@gmail.com",
      meetingTime: "Thursdays 6:00 PM",
      location: "Main Sanctuary",
      activities: ["Choir Practice", "Worship Leading", "Special Performances", "Music Training"],
      icon: "🎼",
      color: "#2d5a27",
      image: "/api/placeholder/400/250"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Modern Ministries Header */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        padding: '3rem 0 2rem',
        borderBottom: '1px solid rgba(45, 90, 39, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2rem'
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
              marginBottom: '1rem'
            }}>
              Serving Together
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Our Ministries
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '800px',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Our ministries serve our diverse community by offering support, fellowship, and spiritual growth
              opportunities for individuals of all ages and backgrounds.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Each ministry plays a vital role in creating a welcoming and nurturing environment where everyone can grow in faith and service.
            </p>
          </div>


        </div>
      </section>





      {/* Interactive Ministry Cards Section */}
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
              All Ministries
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Discover opportunities to serve and grow in faith
            </p>
          </div>

          {/* Ministry Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {ministries.map((ministry) => (
              <div
                key={ministry.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Header Section */}
                <div style={{
                  position: 'relative',
                  height: '120px',
                  background: `linear-gradient(135deg, ${ministry.color} 0%, ${ministry.color === '#2d5a27' ? '#1c3a1c' : '#d97706'} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Ministry Icon */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {ministry.icon}
                  </div>

                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: ministry.color,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {ministry.category.replace('-', ' ')}
                  </div>
                </div>

                {/* Content Section */}
                <div style={{
                  padding: '1.5rem',
                  position: 'relative'
                }}>
                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    marginBottom: '1rem',
                    lineHeight: '1.3'
                  }}>
                    {ministry.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '1.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {ministry.description}
                  </p>

                  {/* Leader Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    padding: '0.75rem',
                    backgroundColor: `${ministry.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'}`,
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      background: `linear-gradient(135deg, ${ministry.color}, ${ministry.color === '#2d5a27' ? '#f59e0b' : '#2d5a27'})`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.8rem'
                    }}>
                      {ministry.leader.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '0.9rem'
                      }}>
                        {ministry.leader}
                      </div>
                    </div>
                  </div>

                  {/* Meeting Info */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{ministry.meetingTime}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{ministry.location}</span>
                    </div>
                  </div>

                  {/* Activities Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {ministry.activities.slice(0, 3).map((activity, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: `${ministry.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                          color: ministry.color,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}
                      >
                        {activity}
                      </span>
                    ))}
                    {ministry.activities.length > 3 && (
                      <span style={{
                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                        color: '#6b7280',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        +{ministry.activities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <button style={{
                      flex: 1,
                      backgroundColor: ministry.color,
                      color: 'white',
                      fontWeight: '600',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)'
                      e.target.style.boxShadow = `0 4px 12px ${ministry.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                    >
                      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Join Ministry
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: ministry.color,
                      fontWeight: '600',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `2px solid ${ministry.color}`,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = ministry.color
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = ministry.color
                      e.target.style.transform = 'translateY(0)'
                    }}
                    >
                      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Leadership Section */}
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
              Leadership Team
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Ministry Leaders
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Meet the dedicated leaders who guide our ministries with passion and purpose
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                name: "Pst. Charles Muritu",
                role: "Senior Pastor",
                email: "muritunganga77@gmail.com",
                phone: "729071755",
                ministries: ["Pastoral Care"],
                bio: "Leading our church family with wisdom and dedication.",
                color: "#2d5a27"
              },
              {
                name: "Joan Ouma",
                role: "Women's Ministry (AWM) Leader",
                email: "Contact information pending",
                phone: "726385813",
                ministries: ["Women's Ministry", "AWM Programs"],
                bio: "Passionate about empowering women in their spiritual journey.",
                color: "#f59e0b"
              },
              {
                name: "Duncan Mageto",
                role: "Youth Ministry Leader",
                email: "duncanmageto76@gmail.com",
                phone: "704385185",
                ministries: ["Youth Ministry", "Community Outreach"],
                bio: "Dedicated to mentoring young people and building future leaders.",
                color: "#2d5a27"
              },
              {
                name: "Erick Yonni",
                role: "Children's Ministry Leader",
                email: "erickyonni@gmail.com",
                phone: "723522933",
                ministries: ["Children's Ministry", "Sabbath School"],
                bio: "Nurturing the next generation with love and biblical foundation.",
                color: "#f59e0b"
              },
              {
                name: "Paul Odongo",
                role: "Music & Worship Ministry",
                email: "paulodongo43@gmail.com",
                phone: "720051277",
                ministries: ["Music Ministry", "Worship Team"],
                bio: "Leading hearts to worship through the gift of music and praise.",
                color: "#2d5a27"
              },
              {
                name: "Elizabeth Sapato",
                role: "Health & Wellness Ministry",
                email: "Contact information pending",
                phone: "724590844",
                ministries: ["Health Ministry", "Community Wellness"],
                bio: "Promoting wholistic health and wellness in our community.",
                color: "#f59e0b"
              },
              {
                name: "Charles Kyalo",
                role: "Communication Leader",
                email: "charleskyalo77@gmail.com",
                phone: "722937200",
                ministries: ["Church Communication", "Media Management"],
                bio: "Managing church communications and information systems.",
                color: "#2d5a27"
              }
            ].map((leader, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
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
                  background: `radial-gradient(circle, ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Profile Section */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      background: `linear-gradient(135deg, ${leader.color}, ${leader.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1.2rem',
                      border: '3px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: leader.color,
                        marginBottom: '0.25rem'
                      }}>
                        {leader.name}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        {leader.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '1.5rem'
                  }}>
                    {leader.bio}
                  </p>

                  {/* Ministries */}
                  <div style={{
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Ministries:
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {leader.ministries.map((ministry, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: `${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                            color: leader.color,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {ministry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{leader.email}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{leader.phone}</span>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button style={{
                    width: '100%',
                    backgroundColor: leader.color,
                    color: 'white',
                    fontWeight: '600',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = `0 8px 25px ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Leader
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
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
                Ready to Get Involved?
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Join one of our ministries and become part of a community that's making a difference.
                Whether you're looking to serve, learn, or grow in faith, there's a place for you.
              </p>

              {/* Contact Options */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(45, 90, 39, 0.1)'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#2d5a27',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#2d5a27',
                    marginBottom: '0.5rem'
                  }}>
                    Call Us
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    Speak directly with our ministry coordinators
                  </p>
                  <p style={{
                    color: '#2d5a27',
                    fontWeight: '600'
                  }}>
                    +254 712 345 678
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(245, 158, 11, 0.1)'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#f59e0b',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#f59e0b',
                    marginBottom: '0.5rem'
                  }}>
                    Email Us
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    Send us your questions and interests
                  </p>
                  <p style={{
                    color: '#f59e0b',
                    fontWeight: '600'
                  }}>
                    thikamainsdachurch@yahoo.com
                  </p>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(45, 90, 39, 0.1)'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#2d5a27',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#2d5a27',
                    marginBottom: '0.5rem'
                  }}>
                    Visit Us
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    Come to our church and meet the teams
                  </p>
                  <p style={{
                    color: '#2d5a27',
                    fontWeight: '600'
                  }}>
                    Saturdays 9:00 AM
                  </p>
                </div>
              </div>

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
                  Join a Ministry Today
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
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Ministries
