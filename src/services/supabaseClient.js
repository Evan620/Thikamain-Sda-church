import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Authentication helpers
export const auth = {
  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen for auth state changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Sign up new user
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  }
}

// Database helpers
export const db = {
  // Users
  getUsers: () => supabase.from('users').select('*').order('created_at', { ascending: false }),
  getUserById: (id) => supabase.from('users').select('*').eq('id', id).single(),
  updateUser: (id, data) => supabase.from('users').update(data).eq('id', id),
  createUser: (data) => supabase.from('users').insert([data]),

  // Members
  getMembers: () => supabase.from('members').select('*').order('created_at', { ascending: false }),
  getMemberById: (id) => supabase.from('members').select('*').eq('id', id).single(),
  addMember: (data) => supabase.from('members').insert([data]),
  updateMember: (id, data) => supabase.from('members').update(data).eq('id', id),
  deleteMember: (id) => supabase.from('members').delete().eq('id', id),
  searchMembers: (query) => supabase.from('members').select('*').or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`),

  // Sermons
  getSermons: () => supabase.from('sermons').select('*').order('sermon_date', { ascending: false }),
  getPublishedSermons: () => supabase.from('sermons').select('*').eq('is_published', true).order('sermon_date', { ascending: false }),
  getSermonById: (id) => supabase.from('sermons').select('*').eq('id', id).single(),
  addSermon: (data) => supabase.from('sermons').insert([data]),
  updateSermon: (id, data) => supabase.from('sermons').update(data).eq('id', id),
  deleteSermon: (id) => supabase.from('sermons').delete().eq('id', id),
  publishSermon: (id) => supabase.from('sermons').update({ is_published: true }).eq('id', id),

  // Events
  getEvents: () => supabase.from('events').select('*').order('start_date', { ascending: true }),
  getPublishedEvents: () => supabase.from('events').select('*').eq('is_published', true).order('start_date', { ascending: true }),
  getEventById: (id) => supabase.from('events').select('*').eq('id', id).single(),
  addEvent: (data) => supabase.from('events').insert([data]),
  updateEvent: (id, data) => supabase.from('events').update(data).eq('id', id),
  deleteEvent: (id) => supabase.from('events').delete().eq('id', id),
  publishEvent: (id) => supabase.from('events').update({ is_published: true }).eq('id', id),

  // Ministries
  getMinistries: () => supabase.from('ministries').select('*').order('name', { ascending: true }),
  getMinistryById: (id) => supabase.from('ministries').select('*').eq('id', id).single(),
  addMinistry: (data) => supabase.from('ministries').insert([data]),
  updateMinistry: (id, data) => supabase.from('ministries').update(data).eq('id', id),
  deleteMinistry: (id) => supabase.from('ministries').delete().eq('id', id),

  // Departments
  getDepartments: () => supabase.from('departments').select('*').order('name', { ascending: true }),
  getDepartmentById: (id) => supabase.from('departments').select('*').eq('id', id).single(),
  addDepartment: (data) => supabase.from('departments').insert([data]),
  updateDepartment: (id, data) => supabase.from('departments').update(data).eq('id', id),
  deleteDepartment: (id) => supabase.from('departments').delete().eq('id', id),

  // Giving Records
  getGivingRecords: () => supabase.from('giving_records').select('*, members(first_name, last_name)').order('giving_date', { ascending: false }),
  getGivingRecordById: (id) => supabase.from('giving_records').select('*, members(first_name, last_name)').eq('id', id).single(),
  addGivingRecord: (data) => supabase.from('giving_records').insert([data]),
  updateGivingRecord: (id, data) => supabase.from('giving_records').update(data).eq('id', id),
  deleteGivingRecord: (id) => supabase.from('giving_records').delete().eq('id', id),

  // Prayer Requests
  getPrayerRequests: () => supabase.from('prayer_requests').select('*, users(full_name)').order('created_at', { ascending: false }),
  getPrayerRequestById: (id) => supabase.from('prayer_requests').select('*, users(full_name)').eq('id', id).single(),
  addPrayerRequest: (data) => supabase.from('prayer_requests').insert([data]),
  updatePrayerRequest: (id, data) => supabase.from('prayer_requests').update(data).eq('id', id),
  deletePrayerRequest: (id) => supabase.from('prayer_requests').delete().eq('id', id),

  // Announcements
  getAnnouncements: () => supabase.from('announcements').select('*').order('created_at', { ascending: false }),
  getPublishedAnnouncements: () => supabase.from('announcements').select('*').eq('is_published', true).order('created_at', { ascending: false }),
  getAnnouncementById: (id) => supabase.from('announcements').select('*').eq('id', id).single(),
  addAnnouncement: (data) => supabase.from('announcements').insert([data]),
  updateAnnouncement: (id, data) => supabase.from('announcements').update(data).eq('id', id),
  deleteAnnouncement: (id) => supabase.from('announcements').delete().eq('id', id),
  publishAnnouncement: (id) => supabase.from('announcements').update({ is_published: true }).eq('id', id),

  // Attendance
  getAttendance: () => supabase.from('attendance').select('*, events(title), members(first_name, last_name)').order('attendance_date', { ascending: false }),
  addAttendance: (data) => supabase.from('attendance').insert([data]),
  updateAttendance: (id, data) => supabase.from('attendance').update(data).eq('id', id),
  deleteAttendance: (id) => supabase.from('attendance').delete().eq('id', id),

  // Messages (Centralized Messaging System)
  getMessages: (filters = {}) => {
    let query = supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (filters.status) query = query.eq('status', filters.status)
    if (filters.department) query = query.eq('department', filters.department)
    if (filters.recipient) query = query.eq('recipient_name', filters.recipient)
    if (filters.limit) query = query.limit(filters.limit)
    return query
  },
  getMessageById: (id) => supabase.from('messages').select('*').eq('id', id).single(),
  createMessage: (data) => supabase.from('messages').insert([data]),
  updateMessage: (id, data) => supabase.from('messages').update(data).eq('id', id),
  deleteMessage: (id) => supabase.from('messages').delete().eq('id', id),
  getMessageStats: () => supabase.from('message_stats').select('*').single()
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to table changes
  subscribe: (table, callback) => {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        callback
      )
      .subscribe()
  },

  // Unsubscribe from channel
  unsubscribe: (subscription) => {
    return supabase.removeChannel(subscription)
  }
}

// File storage helpers
export const storage = {
  // Upload file
  uploadFile: async (bucket, path, file) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    return { data, error }
  },

  // Download file
  downloadFile: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path)
    return { data, error }
  },

  // Get public URL
  getPublicUrl: (bucket, path) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  // Delete file
  deleteFile: async (bucket, paths) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths)
    return { data, error }
  }
}

export default supabase
