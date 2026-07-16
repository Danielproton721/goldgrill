"use client"

import { useEffect, useState, type ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small delay to ensure the animation triggers after paint
    const raf = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        mounted
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3"
      }`}
    >
      {children}
    </div>
  )
}
