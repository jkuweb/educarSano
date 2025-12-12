import type { TypedUser } from 'payload'
import type { PayloadRequest } from 'payload'

export const isAdminCondition = ({ user }: { user: TypedUser | null }): boolean => {
  return user?.roles?.includes('admin') || false
}

export const isAdminConditionRoles = ({ req }: { req: PayloadRequest }): boolean => {
  const user: TypedUser | null = req.user || null
  return user?.roles?.includes('admin') || false
}
