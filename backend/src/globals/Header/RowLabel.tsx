'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

// Definimos tipos auxiliares para acceder correctamente
type HeaderNavItem = NonNullable<Header['navItems']>[number]
type HeaderNavLink = NonNullable<HeaderNavItem['navLinks']>[number]
type HeaderNavLinkItem = NonNullable<HeaderNavLink['items']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  // Indicamos que esta fila representa un "item" dentro de un navLink
  const data = useRowLabel<HeaderNavLinkItem>()

  const label = data?.data?.link
    ? `Enlace externo ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.link.url ?? 'sin URL'}`
    : `Enlace interno ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
