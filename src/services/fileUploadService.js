import { supabase } from './supabaseClient'

/**
 * Upload files to Supabase Storage
 * @param {File[]} files - Array of files to upload
 * @param {string} folder - Storage folder (e.g., 'reports', 'maintenance')
 * @returns {Promise<Object>} Result with uploaded file URLs
 */
export const uploadFiles = async (files, folder = 'submissions') => {
  try {
    if (!files || files.length === 0) {
      return { success: true, files: [] }
    }

    const uploadedFiles = []
    const maxFileSize = 10 * 1024 * 1024 // 10MB limit

    for (const file of files) {
      // Check file size
      if (file.size > maxFileSize) {
        throw new Error(`File "${file.name}" is too large. Maximum size is 10MB.`)
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = file.name.split('.').pop()
      const fileName = `${timestamp}_${randomString}.${fileExtension}`
      const filePath = `${folder}/${fileName}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('church-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('File upload error:', error)
        throw new Error(`Failed to upload "${file.name}": ${error.message}`)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('church-files')
        .getPublicUrl(filePath)

      uploadedFiles.push({
        name: file.name,
        originalName: file.name,
        url: publicUrl,
        path: filePath,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      })
    }

    return {
      success: true,
      files: uploadedFiles
    }

  } catch (error) {
    console.error('File upload service error:', error)
    return {
      success: false,
      error: error.message,
      files: []
    }
  }
}

/**
 * Delete files from Supabase Storage
 * @param {string[]} filePaths - Array of file paths to delete
 * @returns {Promise<Object>} Result of deletion
 */
export const deleteFiles = async (filePaths) => {
  try {
    if (!filePaths || filePaths.length === 0) {
      return { success: true }
    }

    const { error } = await supabase.storage
      .from('church-files')
      .remove(filePaths)

    if (error) {
      throw new Error(`Failed to delete files: ${error.message}`)
    }

    return { success: true }

  } catch (error) {
    console.error('File deletion error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Get file download URL
 * @param {string} filePath - Path to the file in storage
 * @returns {Promise<string>} Download URL
 */
export const getFileDownloadUrl = async (filePath) => {
  try {
    const { data } = await supabase.storage
      .from('church-files')
      .createSignedUrl(filePath, 3600) // 1 hour expiry

    return data?.signedUrl || null

  } catch (error) {
    console.error('Error getting download URL:', error)
    return null
  }
}

/**
 * Validate file type and size
 * @param {File} file - File to validate
 * @param {string} submissionType - Type of submission
 * @returns {Object} Validation result
 */
export const validateFile = (file, submissionType) => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  // Define allowed file types by submission type
  const allowedTypes = {
    reports: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif'
    ],
    maintenance: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ],
    general: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif'
    ]
  }

  const allowed = allowedTypes[submissionType] || allowedTypes.general

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File "${file.name}" is too large. Maximum size is 10MB.`
    }
  }

  // Check file type
  if (!allowed.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed for ${submissionType} submissions.`
    }
  }

  return { valid: true }
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default {
  uploadFiles,
  deleteFiles,
  getFileDownloadUrl,
  validateFile,
  formatFileSize
}
