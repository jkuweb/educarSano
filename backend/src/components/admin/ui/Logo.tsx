'use client'
import React, { useEffect, useState } from 'react'

export const Logo = () => {
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
    <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
      <img
        src={
          theme === 'dark'
            ? 'https://res.cloudinary.com/educar-sano-567jsop/image/upload/v1762029314/Logo_SVG_dark_pif3uy.svg'
            : 'https://res.cloudinary.com/educar-sano-567jsop/image/upload/v1760729026/website/wdybrusdraazygp6scgo.png'
        }
        alt="Logo"
        style={{
          height: '140px',
          width: 'auto',
          marginBottom: '100px',
          maxWidth: '300px',
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

export default Logo
