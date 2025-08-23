/**
 * Simple client-side caching service for church management system
 * Reduces repeated database calls and improves performance
 */

class CacheService {
  constructor() {
    this.cache = new Map()
    this.defaultTTL = 5 * 60 * 1000 // 5 minutes default TTL
    this.maxCacheSize = 100 // Maximum number of cached items
  }

  /**
   * Generate cache key from parameters
   */
  generateKey(prefix, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|')
    return `${prefix}${sortedParams ? `_${sortedParams}` : ''}`
  }

  /**
   * Set cache entry with TTL
   */
  set(key, data, ttl = this.defaultTTL) {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    const expiresAt = Date.now() + ttl
    this.cache.set(key, {
      data,
      expiresAt,
      createdAt: Date.now()
    })
  }

  /**
   * Get cache entry if not expired
   */
  get(key) {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  /**
   * Check if key exists and is not expired
   */
  has(key) {
    return this.get(key) !== null
  }

  /**
   * Delete specific cache entry
   */
  delete(key) {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.cache.clear()
  }

  /**
   * Clear expired entries
   */
  clearExpired() {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Clear cache entries by prefix pattern
   */
  clearByPrefix(prefix) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now()
    let expired = 0
    let valid = 0

    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expired++
      } else {
        valid++
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      maxSize: this.maxCacheSize
    }
  }

  /**
   * Cached fetch wrapper for Supabase queries
   */
  async cachedFetch(key, fetchFunction, ttl = this.defaultTTL) {
    // Check cache first
    const cached = this.get(key)
    if (cached) {
      return cached
    }

    try {
      // Fetch fresh data
      const result = await fetchFunction()
      
      // Only cache successful results
      if (result && !result.error) {
        this.set(key, result, ttl)
      }
      
      return result
    } catch (error) {
      console.error('Cache fetch error:', error)
      throw error
    }
  }

  /**
   * Invalidate related cache entries when data changes
   */
  invalidateRelated(patterns) {
    patterns.forEach(pattern => {
      if (typeof pattern === 'string') {
        this.clearByPrefix(pattern)
      } else if (pattern instanceof RegExp) {
        for (const key of this.cache.keys()) {
          if (pattern.test(key)) {
            this.cache.delete(key)
          }
        }
      }
    })
  }
}

// Cache TTL constants for different data types
export const CACHE_TTL = {
  DASHBOARD: 2 * 60 * 1000,      // 2 minutes - frequently changing
  FINANCIAL: 5 * 60 * 1000,      // 5 minutes - moderately changing
  MEMBERS: 10 * 60 * 1000,       // 10 minutes - slowly changing
  CONTENT: 15 * 60 * 1000,       // 15 minutes - rarely changing
  SETTINGS: 30 * 60 * 1000,      // 30 minutes - very rarely changing
}

// Cache key prefixes
export const CACHE_KEYS = {
  DASHBOARD: 'dashboard',
  FINANCIAL_SUMMARY: 'financial_summary',
  FINANCIAL_TREND: 'financial_trend',
  MEMBERS_COUNT: 'members_count',
  MEMBERS_RECENT: 'members_recent',
  CONTENT_COUNTS: 'content_counts',
  PRAYER_REQUESTS: 'prayer_requests',
  TOP_DONORS: 'top_donors',
  BUDGET_UTILIZATION: 'budget_utilization'
}

// Create singleton instance
const cacheService = new CacheService()

// Auto-cleanup expired entries every 5 minutes
setInterval(() => {
  cacheService.clearExpired()
}, 5 * 60 * 1000)

export default cacheService
