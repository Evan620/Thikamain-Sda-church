import React, { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

const Sermons = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Feature flag to enable dynamic content without UI changes
  const dynamic = import.meta.env.VITE_DYNAMIC_CONTENT_ENABLED === 'true'

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  // Function to get YouTube thumbnail URL with fallback
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null
  }

  // Function to check if thumbnail exists and create fallback
  const getThumbnailWithFallback = (sermon) => {
    const thumbnailUrl = getYouTubeThumbnail(sermon.url)
    return {
      url: thumbnailUrl,
      fallback: !thumbnailUrl
    }
  }

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : null
  }

  // Real sermon data from YouTube (used as initial state/fallback)
  const [sermons, setSermons] = useState([
    {
      id: 1,
      title: "ARE YOUR FEET BLESSED",
      speaker: "Pastor Charles Muritu",
      date: "June 21, 2025",
      url: "https://www.youtube.com/live/WPIfcmn6RE0?si=MEw4iMufQZJpbSor",
      category: "Sabbath Service",
      series: "Blessings",
      description: "A powerful message about walking in God's blessings and being a blessing to others.",
      color: '#2d5a27'
    },
    {
      id: 2,
      title: "ELDERS SABBATH",
      speaker: "Elder Methuselah",
      date: "July 19, 2025",
      url: "https://www.youtube.com/live/ay_NGMxuR0o?si=gfPeZvcegetrjiWH",
      category: "Special Service",
      series: "Leadership",
      description: "Special message honoring church elders and their role in spiritual leadership.",
      color: '#f59e0b'
    },
    {
      id: 3,
      title: "COMMUNICATION SABBATH",
      speaker: "Elder Kyalo",
      date: "July 12, 2025",
      url: "https://www.youtube.com/live/JtfzRIkqw2s?si=_ymC4T_wfdeFn5jH",
      category: "Department Service",
      series: "Ministry Focus",
      description: "Exploring the importance of effective communication in church ministry and daily life.",
      color: '#2d5a27'
    },
    {
      id: 4,
      title: "HOLY COMMUNION SABBATH",
      speaker: "Church Leadership",
      date: "June 28, 2025",
      url: "https://www.youtube.com/live/rrXGI9oYfbk?si=5YhBKe9vsKzVKt5A",
      category: "Special Service",
      series: "Communion",
      description: "Sacred service of Holy Communion, remembering Christ's sacrifice and love.",
      color: '#f59e0b'
    },
    {
      id: 5,
      title: "HAPPY AMM SABBATH",
      speaker: "Men's Ministry",
      date: "May 31, 2025",
      url: "https://www.youtube.com/live/-MnU-wFTxDo?si=JZehySBiUqUwknaR",
      category: "Ministry Service",
      series: "Men's Ministry",
      description: "Celebrating Adventist Men's Ministry and their role in church and community.",
      color: '#2d5a27'
    },
    {
      id: 6,
      title: "ADVENTURERS SABBATH",
      speaker: "Children's Ministry",
      date: "May 17, 2025",
      url: "https://www.youtube.com/live/LTNkVd_pjcY?si=NetMdg08ihJOHxy_",
      category: "Children's Service",
      series: "Adventurers",
      description: "Special service celebrating our Adventurer Club and children's ministry programs.",
      color: '#f59e0b'
    },
    {
      id: 7,
      title: "CHAPLAINCY SABBATH",
      speaker: "Elder Zachariah Orina",
      date: "May 10, 2025",
      url: "https://www.youtube.com/live/Idr9iL5pR2A?si=XuRss9ifrqgwARVa",
      category: "Department Service",
      series: "Chaplaincy",
      description: "Message focusing on chaplaincy ministry and spiritual care in our community.",
      color: '#2d5a27'
    },
    {
      id: 8,
      title: "PERSONAL MINISTRY SABBATH",
      speaker: "Personal Ministry Team",
      date: "May 3, 2025",
      url: "https://www.youtube.com/live/KaA33qnAmns?si=MeHbDyu5HeIzyxC_",
      category: "Ministry Service",
      series: "Personal Ministry",
      description: "Empowering members for personal evangelism and witnessing in daily life.",
      color: '#f59e0b'
    },
    {
      id: 9,
      title: "AMBASSADOR'S SABBATH",
      speaker: "Pastor Martin Kiogora",
      date: "April 26, 2025",
      url: "https://www.youtube.com/live/jWW5Mdwaz0I?si=eOJm5FKVJjCO_YPI",
      category: "Youth Service",
      series: "Ambassadors",
      description: "Inspiring message for young ambassadors of Christ and their mission.",
      color: '#2d5a27'
    },
    {
      id: 10,
      title: "VBS SABBATH",
      speaker: "Ratemo",
      date: "April 19, 2025",
      url: "https://www.youtube.com/live/s5nTrUOZD7A?si=1vDs-A3rADRgdVso",
      category: "Children's Service",
      series: "VBS",
      description: "Vacation Bible School celebration with special programming for children and families.",
      color: '#f59e0b'
    },
    {
      id: 11,
      title: "CHOIR DAY SABBATH",
      speaker: "Pastor Emmanuel Marwa",
      date: "April 12, 2025",
      url: "https://www.youtube.com/live/7fWm2uA_QNM?si=VQ-i_KBxgc-UIK8W",
      category: "Music Service",
      series: "Choir Ministry",
      description: "Celebrating our choir ministry with special music and worship.",
      color: '#2d5a27'
    },
    {
      id: 12,
      title: "FAMILY LIFE SABBATH",
      speaker: "Elder Geoffrey Mutinda",
      date: "April 5, 2025",
      url: "https://www.youtube.com/live/usHu73k9yFE?si=SYVzUFat_LLm4vWr",
      category: "Ministry Service",
      series: "Family Life",
      description: "Strengthening family relationships and building Christ-centered homes.",
      color: '#f59e0b'
    }
  ])

  // Map DB rows to the exact shape used by the UI
  const mapSermon = (r) => ({
    id: r.id,
    title: r.title,
    speaker: r.speaker || 'Guest Speaker',
    date: r.sermon_date ? new Date(r.sermon_date).toLocaleDateString() : '',
    url: r.video_url || r.audio_url || '',
    category: r.series || 'Sermon',
    series: r.series || '',
    description: r.description || '',
    color: '#2d5a27'
  })

  // Feature-flagged fetch to override with dynamic content
  useEffect(() => {
    if (!dynamic) return
    let active = true
    const load = async () => {
      const { data, error } = await supabase
        .from('sermons')
        .select('id,title,description,speaker,sermon_date,audio_url,video_url,notes_url,series,tags,is_published')
        .eq('is_published', true)
        .order('sermon_date', { ascending: false })
      if (!error && active && Array.isArray(data)) {
        const mapped = data.map(mapSermon)
        if (mapped.length) setSermons(mapped)
      }
    }
    load()
    return () => { active = false }
  }, [dynamic])

  

  return (
    <div className="min-h-screen">
      {/* Compact Header Section */}
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
              Spiritual Growth
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Sermons & Messages
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Listen to inspiring messages and grow in your faith journey with biblical teachings and practical wisdom
            </p>
          </div>


        </div>
      </section>

      {/* Featured Sermon Section */}
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
              Latest Message
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Featured Sermon
            </h2>
          </div>

          {/* Featured Sermon Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(245, 158, 11, 0.02) 100%)',
            borderRadius: '24px',
            padding: '0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            alignItems: 'center',
            gap: '0'
          }}>
            {/* Video/Image Section */}
            <div style={{
              position: 'relative',
              minHeight: '300px',
              background: getThumbnailWithFallback(sermons[0]).fallback
                ? `linear-gradient(135deg, ${sermons[0].color}, ${sermons[0].color}dd)`
                : `url(${getThumbnailWithFallback(sermons[0]).url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {getThumbnailWithFallback(sermons[0]).fallback && (
                <div style={{
                  textAlign: 'center',
                  color: 'white',
                  padding: '2rem'
                }}>
                  <div style={{
                    width: '5rem',
                    height: '5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2rem',
                    fontWeight: '700',
                    border: '3px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {sermons[0].speaker.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '1rem',
                    display: 'inline-block'
                  }}>
                    {sermons[0].category}
                  </div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    lineHeight: '1.2'
                  }}>
                    {sermons[0].title}
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.9,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    marginBottom: '1rem'
                  }}>
                    by {sermons[0].speaker}
                  </p>
                  <div style={{
                    fontSize: '0.95rem',
                    opacity: 0.8,
                    fontWeight: '500'
                  }}>
                    {sermons[0].date}
                  </div>
                </div>
              )}
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.3)'
              }}></div>

              {/* Play Button */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  zIndex: 2
                }}
                onClick={() => setSelectedVideo(sermons[0])}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.background = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <svg style={{ width: '2rem', height: '2rem', color: '#2d5a27', marginLeft: '4px' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>

              {/* Live Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: '#ff0000',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '600',
                zIndex: 2
              }}>
                LIVE
              </div>
            </div>

            {/* Content Section */}
            <div style={{
              padding: '3rem',
              position: 'relative'
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
                {/* Date and Category */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(45, 90, 39, 0.1)',
                    color: '#2d5a27',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {sermons[0].date}
                  </span>
                  <span style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    color: '#f59e0b',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {sermons[0].category}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {sermons[0].title}
                </h3>

                {/* Speaker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: 'linear-gradient(135deg, #2d5a27, #f59e0b)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    {sermons[0].speaker.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '1rem'
                    }}>
                      {sermons[0].speaker}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      Church Leadership
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontSize: '1rem'
                }}>
                  {sermons[0].description}
                </p>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => setSelectedVideo(sermons[0])}
                    style={{
                      backgroundColor: '#2d5a27',
                      color: 'white',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 20px rgba(45, 90, 39, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px rgba(45, 90, 39, 0.3)'
                    }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Now
                  </button>
                  <button
                    onClick={() => window.open(sermons[0].url, '_blank')}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#2d5a27',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: '2px solid #2d5a27',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2d5a27'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#2d5a27'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in YouTube
                  </button>
                  <button
                    onClick={() => {
                      const shareText = `Check out this sermon: ${sermons[0].title} by ${sermons[0].speaker} - ${sermons[0].url}`
                      if (navigator.share) {
                        navigator.share({
                          title: sermons[0].title,
                          text: shareText,
                          url: sermons[0].url
                        })
                      } else {
                        navigator.clipboard.writeText(shareText)
                        alert('Link copied to clipboard!')
                      }
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#2d5a27',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      border: '2px solid #2d5a27',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2d5a27'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#2d5a27'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Sermon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Grid Section */}
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
              Recent Sermons
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Explore our collection of inspiring messages
            </p>
          </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {sermons.slice(1).map((sermon, index) => (
            <div
              key={sermon.id}
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
              {/* Thumbnail Section */}
              <div
                style={{
                  position: 'relative',
                  height: '200px',
                  background: getThumbnailWithFallback(sermon).fallback
                    ? `linear-gradient(135deg, ${sermon.color}, ${sermon.color}dd)`
                    : `url(${getThumbnailWithFallback(sermon).url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedVideo(sermon)}
              >
                {/* LIVE Badge for recent sermons */}
                {index < 2 && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                  }}>
                    LIVE
                  </div>
                )}

                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: sermon.color,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                  {sermon.category}
                </div>

                {getThumbnailWithFallback(sermon).fallback && (
                  <div style={{
                    textAlign: 'center',
                    color: 'white',
                    padding: '1rem'
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.75rem',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
                    }}>
                      {sermon.speaker.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      lineHeight: '1.2',
                      marginBottom: '0.25rem'
                    }}>
                      {sermon.title.length > 40 ? sermon.title.substring(0, 40) + '...' : sermon.title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      opacity: 0.9,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}>
                      {sermon.speaker}
                    </div>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '5rem',
                  height: '5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '4px solid rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
                onClick={() => setSelectedVideo(sermons[0])}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translate(-50%, -50%) scale(1.1)'
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translate(-50%, -50%) scale(1)'
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
                }}
                >
                  <svg style={{
                    width: '2rem',
                    height: '2rem',
                    color: 'white',
                    marginLeft: '3px' // Slight offset to center the triangle
                  }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translate(-50%, -50%) scale(1.1)'
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translate(-50%, -50%) scale(1)'
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
                }}
                >
                  <svg style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: 'white',
                    marginLeft: '2px' // Slight offset to center the triangle
                  }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.3)'
                }}></div>

                {/* Play Button */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.background = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                }}
                >
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: sermon.color, marginLeft: '2px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Live Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  LIVE
                </div>

                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  right: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: sermon.color,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  {sermon.category}
                </div>
              </div>

              {/* Content Section */}
              <div style={{
                padding: '1.5rem',
                position: 'relative'
              }}>
                {/* Date and Category */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    backgroundColor: `${sermon.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                    color: sermon.color,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {sermon.date}
                  </span>
                  <span style={{
                    backgroundColor: `${sermon.color === '#2d5a27' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(45, 90, 39, 0.1)'}`,
                    color: sermon.color === '#2d5a27' ? '#f59e0b' : '#2d5a27',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {sermon.category}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {sermon.title}
                </h3>

                {/* Speaker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: `linear-gradient(135deg, ${sermon.color}, ${sermon.color === '#2d5a27' ? '#f59e0b' : '#2d5a27'})`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.8rem'
                  }}>
                    {sermon.speaker.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      {sermon.speaker}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {sermon.description}
                </p>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => setSelectedVideo(sermon)}
                    style={{
                      flex: 1,
                      backgroundColor: sermon.color,
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
                      e.target.style.boxShadow = `0 4px 12px ${sermon.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch
                  </button>
                  <button
                    onClick={() => window.open(sermon.url, '_blank')}
                    style={{
                      backgroundColor: 'transparent',
                      color: sermon.color,
                      fontWeight: '600',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `2px solid ${sermon.color}`,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = sermon.color
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = sermon.color
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Sermon Series Section */}
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
              Sermon Collections
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Current Series
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Follow along with our ongoing sermon series
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                id: 1,
                title: "Living Faith",
                subtitle: "Practical Christianity in Daily Life",
                description: "Explore how to live out your faith in practical, meaningful ways that impact your daily decisions and relationships.",
                sermonCount: 8,
                currentSermon: 6,
                color: '#2d5a27',
                startDate: "December 2024",
                topics: ["Prayer", "Faith", "Trust", "Daily Walk"]
              },
              {
                id: 2,
                title: "Overcoming Challenges",
                subtitle: "Finding Hope in Difficult Times",
                description: "Discover biblical principles for navigating life's challenges with faith, hope, and resilience.",
                sermonCount: 6,
                currentSermon: 4,
                color: '#f59e0b',
                startDate: "January 2025",
                topics: ["Hope", "Perseverance", "Trust", "Victory"]
              },
              {
                id: 3,
                title: "Understanding the Sabbath",
                subtitle: "God's Gift of Rest and Renewal",
                description: "A comprehensive study of the Sabbath and its significance for modern believers.",
                sermonCount: 5,
                currentSermon: 2,
                color: '#2d5a27',
                startDate: "January 2025",
                topics: ["Sabbath", "Rest", "Worship", "Creation"]
              }
            ].map((series) => (
              <div
                key={series.id}
                style={{
                  background: `linear-gradient(135deg, ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                  e.currentTarget.style.borderColor = `${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = `${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: series.color,
                        marginBottom: '0.5rem'
                      }}>
                        {series.title}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        {series.subtitle}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: series.color,
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      minWidth: '60px'
                    }}>
                      {series.currentSermon}/{series.sermonCount}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    backgroundColor: 'rgba(107, 114, 128, 0.2)',
                    borderRadius: '10px',
                    height: '8px',
                    marginBottom: '1.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      backgroundColor: series.color,
                      height: '100%',
                      width: `${(series.currentSermon / series.sermonCount) * 100}%`,
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {series.description}
                  </p>

                  {/* Topics */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {series.topics.map((topic, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: `${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                          color: series.color,
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    color: '#6b7280'
                  }}>
                    <span>Started: {series.startDate}</span>
                    <span>{series.sermonCount} Messages</span>
                  </div>

                  {/* Action Button */}
                  <button style={{
                    width: '100%',
                    backgroundColor: series.color,
                    color: 'white',
                    fontWeight: '600',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = `0 8px 25px ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                  >
                    View Series
                  </button>
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
                Never Miss a Message
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Subscribe to our sermon podcast or follow us on social media to stay updated with the latest messages and series.
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
                  Subscribe to Podcast
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

      {/* Video Popup Modal */}
      {selectedVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}
        onClick={() => setSelectedVideo(null)}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            aspectRatio: '16/9',
            backgroundColor: 'black',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: 'absolute',
                top: '-3rem',
                right: '0',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#374151',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                zIndex: 1001
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#ef4444'
                e.target.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                e.target.style.color = '#374151'
                e.target.style.transform = 'scale(1)'
              }}
            >
              ×
            </button>

            {/* Video Title */}
            <div style={{
              position: 'absolute',
              top: '-3rem',
              left: '0',
              right: '3rem',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '600',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {selectedVideo.title}
            </div>

            {/* YouTube Embed */}
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo.url)}
              title={selectedVideo.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Video Info Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
              padding: '2rem 1.5rem 1rem',
              color: 'white'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'linear-gradient(135deg, #2d5a27, #f59e0b)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  {selectedVideo.speaker.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    {selectedVideo.speaker}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8
                  }}>
                    {selectedVideo.date} • {selectedVideo.category}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={() => window.open(selectedVideo.url, '_blank')}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in YouTube
                </button>
                <button
                  onClick={() => {
                    const shareText = `Check out this sermon: ${selectedVideo.title} by ${selectedVideo.speaker} - ${selectedVideo.url}`
                    if (navigator.share) {
                      navigator.share({
                        title: selectedVideo.title,
                        text: shareText,
                        url: selectedVideo.url
                      })
                    } else {
                      navigator.clipboard.writeText(shareText)
                      alert('Link copied to clipboard!')
                    }
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sermons
