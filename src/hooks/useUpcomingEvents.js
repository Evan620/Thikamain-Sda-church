import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

// Helper function to format relative dates
const getRelativeDate = (dateString) => {
  const eventDate = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  
  // Reset time to start of day for accurate comparison
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const eventStart = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
  const tomorrowStart = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
  
  const diffTime = eventStart - todayStart
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  // Today
  if (diffDays === 0) {
    return 'Today'
  }
  
  // Tomorrow
  if (diffDays === 1) {
    return 'Tomorrow'
  }
  
  // This week (within 7 days)
  if (diffDays > 1 && diffDays <= 7) {
    const dayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' })
    return `This ${dayName}`
  }
  
  // Next week (8-14 days)
  if (diffDays > 7 && diffDays <= 14) {
    const dayName = eventDate.toLocaleDateString('en-US', { weekday: 'long' })
    return `Next ${dayName}`
  }
  
  // Further out - show actual date
  return eventDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: eventDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  })
}

// Helper function to format time
const formatEventTime = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  
  // Check if it's an all-day event (starts at midnight and ends at 11:59 PM)
  const isAllDay = start.getHours() === 0 && start.getMinutes() === 0 && 
                   end && end.getHours() === 23 && end.getMinutes() === 59
  
  if (isAllDay) {
    return 'All Day'
  }
  
  const startTime = start.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
  
  if (end && !isAllDay) {
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
    return `${startTime} - ${endTime}`
  }
  
  return startTime
}

// Helper function to get event icon based on type
const getEventIcon = (eventType) => {
  const iconMap = {
    'Prayer Event': '🙏',
    'Health Ministry': '🏥',
    'Development': '🏗️',
    'Training': '📚',
    'Interfaith': '🤝',
    'Stewardship': '💰',
    'Recognition': '🏆',
    'Induction': '👥',
    'Communication': '📢',
    'Women\'s Ministry': '👩',
    'Education': '🎓',
    'Communion': '🍞',
    'Family Life': '👨‍👩‍👧‍👦',
    'Music Ministry': '🎵',
    'VBS': '👶',
    'Youth Program': '👥',
    'Personal Ministry': '📖',
    'Chaplaincy': '⛪',
    'Adventurer Program': '🏕️',
    'Welfare': '❤️',
    'Men\'s Ministry': '👨',
    'Sabbath School': '📚',
    'Publishing': '📖',
    'Children\'s Program': '👶',
    'Camp Meeting': '⛺',
    'Leadership': '👔',
    'Pathfinder Program': '🏕️',
    'Singles Ministry': '💙',
    'Prayer Week': '🙏',
    'Master Guide': '🏆',
    'Creation': '🌍'
  }
  
  return iconMap[eventType] || '📅'
}

// Helper function to get event color based on type
const getEventColor = (eventType) => {
  const colorMap = {
    'Prayer Event': '#2d5a27',
    'Health Ministry': '#f59e0b',
    'Development': '#2d5a27',
    'Training': '#2d5a27',
    'Interfaith': '#f59e0b',
    'Stewardship': '#2d5a27',
    'Recognition': '#f59e0b',
    'Induction': '#2d5a27',
    'Communication': '#f59e0b',
    'Women\'s Ministry': '#2d5a27',
    'Education': '#f59e0b',
    'Communion': '#2d5a27',
    'Family Life': '#f59e0b',
    'Music Ministry': '#2d5a27',
    'VBS': '#f59e0b',
    'Youth Program': '#2d5a27',
    'Personal Ministry': '#f59e0b',
    'Chaplaincy': '#2d5a27',
    'Adventurer Program': '#f59e0b',
    'Welfare': '#2d5a27',
    'Men\'s Ministry': '#f59e0b',
    'Sabbath School': '#2d5a27',
    'Publishing': '#f59e0b',
    'Children\'s Program': '#2d5a27',
    'Camp Meeting': '#f59e0b',
    'Leadership': '#2d5a27',
    'Pathfinder Program': '#f59e0b',
    'Singles Ministry': '#2d5a27',
    'Prayer Week': '#f59e0b',
    'Master Guide': '#2d5a27',
    'Creation': '#f59e0b'
  }
  
  return colorMap[eventType] || '#6b7280'
}

// Default fallback events (current hardcoded events)
const defaultEvents = [
  {
    id: 'default-1',
    title: 'Sabbath Service',
    description: 'Join us for worship, fellowship, and spiritual growth in our weekly Sabbath celebration.',
    relativeDate: 'This Saturday',
    time: '9:00 AM - 1:00 PM',
    location: 'Main Sanctuary',
    icon: '📅',
    color: '#2d5a27',
    isDefault: true
  },
  {
    id: 'default-2',
    title: 'Prayer Meeting',
    description: 'Come together for prayer, Bible study, and fellowship in our midweek gathering.',
    relativeDate: 'Next Wednesday',
    time: '6:00 PM - 8:00 PM',
    location: 'Main Sanctuary',
    icon: '🙏',
    color: '#f59e0b',
    isDefault: true
  },
  {
    id: 'default-3',
    title: 'Youth Meeting',
    description: 'Young people gathering for worship, activities, and building lasting friendships.',
    relativeDate: 'Next Friday',
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Hall',
    icon: '👥',
    color: '#6b7280',
    isDefault: true
  }
]

export const useUpcomingEvents = (limit = 3) => {
  const [events, setEvents] = useState(defaultEvents)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if dynamic content is enabled
  const dynamic = import.meta.env.VITE_DYNAMIC_CONTENT_ENABLED === 'true'

  useEffect(() => {
    if (!dynamic) {
      setLoading(false)
      return
    }

    let active = true

    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get current date in ISO format for comparison
        const now = new Date()
        const currentDate = now.toISOString()

        // Fetch upcoming published events
        const { data, error: fetchError } = await supabase
          .from('events')
          .select('id, title, description, start_date, end_date, location, event_type, is_published')
          .eq('is_published', true)
          .gte('start_date', currentDate)
          .order('start_date', { ascending: true })
          .limit(limit)

        if (fetchError) {
          throw fetchError
        }

        if (!active) return

        // If we have events from database, format them
        if (data && data.length > 0) {
          const formattedEvents = data.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description || 'Join us for this special event.',
            relativeDate: getRelativeDate(event.start_date),
            time: formatEventTime(event.start_date, event.end_date),
            location: event.location || 'Main Sanctuary',
            icon: getEventIcon(event.event_type),
            color: getEventColor(event.event_type),
            eventType: event.event_type,
            startDate: event.start_date,
            endDate: event.end_date,
            isDefault: false
          }))

          setEvents(formattedEvents)
        } else {
          // No upcoming events found, use default events
          setEvents(defaultEvents)
        }

      } catch (err) {
        console.error('Error fetching upcoming events:', err)
        setError(err.message)
        // Fallback to default events on error
        if (active) {
          setEvents(defaultEvents)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchUpcomingEvents()

    // Set up interval to refresh events every hour
    const interval = setInterval(fetchUpcomingEvents, 60 * 60 * 1000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [dynamic, limit])

  return { events, loading, error, isUsingDefaults: !dynamic || events.every(e => e.isDefault) }
}