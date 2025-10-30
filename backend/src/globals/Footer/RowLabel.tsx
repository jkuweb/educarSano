'use client'

import React from 'react'
import type { RowLabelProps } from '@payloadcms/ui'
import { useRowLabel } from '@payloadcms/ui'

// Define el tipo correcto basado en la estructura de tus navItems
type NavItem = {
  title?: string
  link?: {
    type?: 'reference' | 'custom' | 'calendly' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages'
      value: number | any
    } | null
    url?: string | null
    label?: string // Añadido si existe
  }
  subItems?: Array<{
    title?: string
    description?: string | null
    enableImage?: boolean | null
    image?: number | any | null
    link?: {
      type?: 'reference' | 'custom' | 'calendly' | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages'
        value: number | any
      } | null
      url?: string | null
    }
    id?: string | null
  }> | null
  id?: string | null
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NavItem>()

  // Intentar obtener el label del título o del link
  const title = data?.data?.title
  const linkLabel = data?.data?.link?.label
  const rowNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  let label = 'Nav Item'

  if (title) {
    label = `Nav item ${rowNumber}: ${title}`
  } else if (linkLabel) {
    label = `Nav item ${rowNumber}: ${linkLabel}`
  } else if (rowNumber) {
    label = `Nav item ${rowNumber}`
  }

  return <div>{label}</div>
}
