const CACHE_PREFIX = 'blog-'
const CACHE_DURATION = 1000 * 60 * 5 // 5分钟

export function setCache(key: string, data: any) {
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({
    data,
    timestamp: Date.now()
  }))
}

export function getCache(key: string) {
  const item = localStorage.getItem(`${CACHE_PREFIX}${key}`)
  if (!item) return null
  
  const { data, timestamp } = JSON.parse(item)
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`)
    return null
  }
  
  return data
}

// 扩展缓存功能
export function clearCache() {
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key)
    }
  })
}

export function getCacheSize() {
  let size = 0
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      size += localStorage.getItem(key)?.length || 0
    }
  })
  return size
}

// 添加缓存限制
const MAX_CACHE_SIZE = 5 * 1024 * 1024 // 5MB

export function checkCacheSize() {
  if (getCacheSize() > MAX_CACHE_SIZE) {
    clearCache()
  }
} 