import type { Access, FieldAccess } from 'payload'

export type Role = 'super_admin' | 'content_admin' | 'content_reviewer'

// Check if user has one of the allowed roles
export const hasRole = (...allowedRoles: Role[]): Access => {
  return ({ req: { user } }) => {
    if (!user) return false
    return allowedRoles.includes(user.role as Role)
  }
}

// Super admins can do everything
export const isSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super_admin'
}

// Content admins can create/edit content
export const isContentAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super_admin' || user.role === 'content_admin'
}

// Content reviewers can only read
export const isContentReviewer: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super_admin' || user.role === 'content_admin' || user.role === 'content_reviewer'
}

// Only super_admin can change roles
export const canEditRole: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super_admin'
}
