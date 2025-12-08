import type { CollectionConfig } from 'payload'
import { isSuperAdmin, canEditRole, type Role } from '../access/roles'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Anyone can read their own data, super_admin can read all
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super_admin') return true
      return { id: { equals: user.id } }
    },
    // Allow first user creation (when no admins exist), then only super_admin
    create: async ({ req }) => {
      // If no user logged in, check if any admins exist
      if (!req.user) {
        const existingAdmins = await req.payload.find({
          collection: 'admins',
          limit: 1,
        })
        // Allow creation if no admins exist (first user setup)
        return existingAdmins.totalDocs === 0
      }
      // Only super_admin can create new admins
      return req.user.role === 'super_admin'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      // Super admin can update anyone, others can only update themselves
      if (user.role === 'super_admin') return true
      return { id: { equals: user.id } }
    },
    // Only super_admin can delete
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'content_reviewer' as Role,
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Content Admin', value: 'content_admin' },
        { label: 'Content Reviewer', value: 'content_reviewer' },
      ],
      access: {
        // Only super_admin can change roles
        update: canEditRole,
      },
      admin: {
        description: 'Super Admin: full access | Content Admin: create/edit content | Content Reviewer: read-only',
      },
    },
  ],
  hooks: {
    beforeChange: [
      // First user automatically becomes super_admin
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          const existingAdmins = await req.payload.find({
            collection: 'admins',
            limit: 1,
          })
          if (existingAdmins.totalDocs === 0) {
            data.role = 'super_admin'
          }
        }
        return data
      },
    ],
  },
}
