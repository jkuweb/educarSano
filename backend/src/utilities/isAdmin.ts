import type { TypedUser } from 'payload'

export const isAdminCondition = (
  data: any,
  siblingData: any,
  { user }: { user: TypedUser | null },
): boolean => {
  return user?.roles?.includes('admin') || false
}

export const isAdminConditionRoles = (
  data: any,
  siblingData: any,
  { user }: { user: TypedUser | null },
): boolean => {
  return user?.roles?.includes('admin') || false
}
