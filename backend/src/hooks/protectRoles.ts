import { User } from '@/payload-types'
import { FieldHook } from 'payload'

export const protectRoles: FieldHook<{ id: string } & User> = async ({
  data,
  req,
  value,
  originalDoc,
}) => {
  const currentUserIsAdmin = req.user?.roles?.includes('admin')

  // Si no es admin, fuerza rol 'user'
  if (!currentUserIsAdmin) {
    return ['user']
  }

  // Si es admin, permite modificar roles
  const newRoles = value || originalDoc?.roles || data?.roles || ['user']
  const rolesArray = Array.isArray(newRoles) ? newRoles : [newRoles]

  // Validación: prevenir que se elimine el último admin
  // (solo si se está quitando el rol admin del documento actual)
  const isRemovingAdmin = originalDoc?.roles?.includes('admin') && !rolesArray.includes('admin')

  if (isRemovingAdmin && originalDoc?.id) {
    // Consulta cuántos admins existen
    const adminCount = await req.payload.count({
      collection: 'users',
      where: {
        roles: {
          contains: 'admin',
        },
        id: {
          not_equals: originalDoc.id,
        },
      },
    })

    // Si es el último admin, no permitir quitar el rol
    if (adminCount.totalDocs === 0) {
      req.payload.logger.warn('Cannot remove admin role from the last admin user')
      return originalDoc.roles || ['admin', 'user']
    }
  }

  // Asegura que siempre haya al menos un rol
  if (rolesArray.length === 0) {
    return ['user']
  }

  return rolesArray
}
