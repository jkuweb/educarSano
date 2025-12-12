import type { FieldHook } from 'payload'

/**
 * Asigna automáticamente el usuario que crea el documento
 */
export const assignCreatedBy: FieldHook = ({ req, operation, value }) => {
  if (operation === 'create' && req.user) {
    return req.user.id
  }
  return value
}
