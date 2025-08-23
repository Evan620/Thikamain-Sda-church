import { supabase } from './supabaseClient'

/**
 * Church Leaders Service - Manages dynamic leader information
 */

/**
 * Get all church leaders
 * @param {string} category - Filter by category (optional)
 * @returns {Promise<Array>} Array of leaders
 */
export const getAllLeaders = async (category = null) => {
  try {
    let query = supabase
      .from('church_leaders')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching leaders:', error)
    return []
  }
}

/**
 * Get leaders by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} Array of leaders in category
 */
export const getLeadersByCategory = async (category) => {
  return await getAllLeaders(category)
}

/**
 * Get a specific leader by name and position
 * @param {string} name - Leader name
 * @param {string} position - Leader position (optional)
 * @returns {Promise<Object|null>} Leader object or null
 */
export const getLeaderByName = async (name, position = null) => {
  try {
    let query = supabase
      .from('church_leaders')
      .select('*')
      .eq('name', name)
      .eq('is_active', true)

    if (position) {
      query = query.eq('position', position)
    }

    const { data, error } = await query.single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return data || null
  } catch (error) {
    console.error('Error fetching leader by name:', error)
    return null
  }
}

/**
 * Create a new leader
 * @param {Object} leaderData - Leader information
 * @returns {Promise<Object>} Created leader
 */
export const createLeader = async (leaderData) => {
  try {
    const { data, error } = await supabase
      .from('church_leaders')
      .insert([leaderData])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error creating leader:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update a leader
 * @param {string} id - Leader ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} Update result
 */
export const updateLeader = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('church_leaders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating leader:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete a leader (soft delete by setting is_active to false)
 * @param {string} id - Leader ID
 * @returns {Promise<Object>} Delete result
 */
export const deleteLeader = async (id) => {
  try {
    const { data, error } = await supabase
      .from('church_leaders')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error deleting leader:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get leaders for dropdown/selection purposes
 * @returns {Promise<Array>} Array of leaders formatted for dropdowns
 */
export const getLeadersForDropdown = async () => {
  try {
    const leaders = await getAllLeaders()
    return leaders.map(leader => ({
      value: leader.name,
      label: `${leader.name} (${leader.position})`,
      email: leader.email,
      phone: leader.phone,
      category: leader.category,
      position: leader.position
    }))
  } catch (error) {
    console.error('Error getting leaders for dropdown:', error)
    return []
  }
}

/**
 * Get leader email by name (for messaging system)
 * @param {string} name - Leader name
 * @returns {Promise<string|null>} Leader email or null
 */
export const getLeaderEmail = async (name) => {
  try {
    const leader = await getLeaderByName(name)
    return leader?.email || null
  } catch (error) {
    console.error('Error getting leader email:', error)
    return null
  }
}

/**
 * Get ministry leaders for forms
 * @returns {Promise<Array>} Array of ministry leaders
 */
export const getMinistryLeaders = async () => {
  return await getLeadersByCategory('ministry')
}

/**
 * Get pastoral team
 * @returns {Promise<Array>} Array of pastoral team members
 */
export const getPastoralTeam = async () => {
  return await getLeadersByCategory('pastoral')
}

/**
 * Get church elders
 * @returns {Promise<Array>} Array of church elders
 */
export const getChurchElders = async () => {
  return await getLeadersByCategory('elder')
}

/**
 * Get church officers
 * @returns {Promise<Array>} Array of church officers
 */
export const getChurchOfficers = async () => {
  return await getLeadersByCategory('officer')
}

/**
 * Get department heads
 * @returns {Promise<Array>} Array of department heads
 */
export const getDepartmentHeads = async () => {
  return await getLeadersByCategory('department')
}

/**
 * Update leader display order
 * @param {Array} leaders - Array of leaders with updated display_order
 * @returns {Promise<Object>} Update result
 */
export const updateLeaderOrder = async (leaders) => {
  try {
    const updates = leaders.map(leader => 
      supabase
        .from('church_leaders')
        .update({ display_order: leader.display_order })
        .eq('id', leader.id)
    )

    await Promise.all(updates)
    return { success: true }
  } catch (error) {
    console.error('Error updating leader order:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Search leaders by name or position
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching leaders
 */
export const searchLeaders = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('church_leaders')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${searchTerm}%,position.ilike.%${searchTerm}%`)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error searching leaders:', error)
    return []
  }
}

export default {
  getAllLeaders,
  getLeadersByCategory,
  getLeaderByName,
  createLeader,
  updateLeader,
  deleteLeader,
  getLeadersForDropdown,
  getLeaderEmail,
  getMinistryLeaders,
  getPastoralTeam,
  getChurchElders,
  getChurchOfficers,
  getDepartmentHeads,
  updateLeaderOrder,
  searchLeaders
}
