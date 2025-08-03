import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash (anchor link), scroll to that element
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        return
      }
    }

    // Otherwise, scroll to top when route changes
    // Use setTimeout to ensure the page has rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
