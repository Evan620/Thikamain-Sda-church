/**
 * Scroll to top of page with smooth animation
 * @param {number} duration - Animation duration in milliseconds (default: 300)
 */
export const scrollToTop = (duration = 300) => {
  // Modern browsers with smooth scrolling support
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    return
  }

  // Fallback for older browsers with custom smooth scrolling
  const startingY = window.pageYOffset
  const startTime = performance.now()

  const animateScroll = (currentTime) => {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeInOutQuad = progress => 
      progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress

    const easedProgress = easeInOutQuad(progress)
    window.scrollTo(0, startingY * (1 - easedProgress))

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

/**
 * Scroll to a specific element with smooth animation
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from the top in pixels (default: 0)
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

/**
 * Check if user has scrolled past a certain point
 * @param {number} threshold - Scroll threshold in pixels (default: 100)
 * @returns {boolean} True if scrolled past threshold
 */
export const hasScrolledPast = (threshold = 100) => {
  return window.pageYOffset > threshold
}

/**
 * Add scroll-to-top functionality to a button
 * @param {string} buttonId - ID of the button element
 */
export const addScrollToTopButton = (buttonId) => {
  const button = document.getElementById(buttonId)
  if (!button) {
    console.warn(`Button with ID "${buttonId}" not found`)
    return
  }

  button.addEventListener('click', () => scrollToTop())
  
  // Show/hide button based on scroll position
  const toggleButton = () => {
    if (hasScrolledPast(300)) {
      button.style.display = 'block'
      button.style.opacity = '1'
    } else {
      button.style.opacity = '0'
      setTimeout(() => {
        if (!hasScrolledPast(300)) {
          button.style.display = 'none'
        }
      }, 300)
    }
  }

  window.addEventListener('scroll', toggleButton)
  toggleButton() // Initial check
}

export default {
  scrollToTop,
  scrollToElement,
  hasScrolledPast,
  addScrollToTopButton
}
