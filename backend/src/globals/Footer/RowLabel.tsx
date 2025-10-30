'use client'
import React from 'react'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type HeaderNavItem = NonNullable<Header['navItems']>[number]
type HeaderNavLink = NonNullable<HeaderNavItem['navLinks']>[number]
type HeaderNavLinkItem = NonNullable<HeaderNavLink['items']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<HeaderNavLinkItem>()

  const label = data?.data?.title
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.title}`
    : data?.data?.link?.url
      ? `Link: ${data.data.link.url}`
      : 'Row'

  return <div>{label}</div>
}
