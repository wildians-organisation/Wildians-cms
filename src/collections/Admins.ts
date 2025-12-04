import type { CollectionConfig } from 'payload'
import { isSelf } from '../access/isSelf'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isSelf,
    create: () => false,
    update: isSelf,
    delete: () => false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
