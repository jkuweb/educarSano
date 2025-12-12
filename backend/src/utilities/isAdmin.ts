import type { TypedUser } from 'payload'

export const isAdminCondition = ({ user }: { user: TypedUser | null }): boolean => {
  return user?.roles?.includes('admin') || false
}

export const isAdminConditionRoles = ({ user }: { user: TypedUser | null }): boolean => {
  return user?.roles?.includes('admin') || false
}
