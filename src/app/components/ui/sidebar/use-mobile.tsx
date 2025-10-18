"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768 // Matches the default Tailwind 'md' breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check initial width and set listener for changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Use addEventListener as the 'change' event is the modern approach
    mql.addEventListener("change", onChange)
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  // Return a boolean value (true/false)
  return !!isMobile
}