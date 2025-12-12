import { Access, FieldAccess } from 'payload'

// ==================== COLLECTION ACCESS ====================

/**
 * Solo Admin puede acceder
 */
export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || false
}

/**
 * Admin ve todo, otros usuarios solo sus propios documentos
 */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  if (user.roles?.includes('user') || user.roles?.includes('guest')) {
    return {
      id: { equals: user.id },
    }
  }
  return false
}

/**
 * Admin y User pueden acceder (excluye Guest)
 */
export const isAdminOrUser: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || user.roles?.includes('user') || false
}

/**
 * Cualquier usuario autenticado puede acceder
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * ✅ Acceso público para colecciones
 */
export const publicAccess: Access = () => true

// ==================== FIELD ACCESS ====================

/**
 * Solo Admin puede acceder al campo
 */
export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || false
}

/**
 * Admin o el propietario del documento pueden acceder
 */
export const isAdminOrOwnerFieldLevel: FieldAccess = ({ req: { user }, doc }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  return doc?.id === user.id || doc?.author === user.id
}

/**
 * Admin o el mismo usuario (para campos de User)
 */
export const isAdminOrSelfFieldLevel: FieldAccess = ({ req: { user }, doc }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  return doc?.id === user.id
}

/**
 * ✅ Acceso público para campos
 */
export const publicReadField: FieldAccess = () => true

/**
 * Nadie puede editar (solo lectura)
 */
export const readOnly: FieldAccess = () => false
