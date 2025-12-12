'use client'
import React, { useEffect, useState } from 'react'

export const Icon = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Detectar tema inicial
    const dataTheme = document.documentElement.getAttribute('data-theme')
    if (dataTheme) {
      setTheme(dataTheme as 'light' | 'dark')
    }

    // Observar cambios de tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          if (newTheme) {
            setTheme(newTheme as 'light' | 'dark')
          }
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={
          theme === 'dark'
            ? 'https://res.cloudinary.com/educar-sano-567jsop/image/upload/v1762029972/Vector_ybrhjx.png'
            : 'https://res.cloudinary.com/educar-sano-567jsop/image/upload/v1762029971/Vector_mjchxm.jpg'
        }
        alt="Logo"
      />
    </div>
  )
}

export default Icon
