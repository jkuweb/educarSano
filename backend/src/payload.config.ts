import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import { es } from '@payloadcms/translations/languages/es'
import { Users } from './collections/Users/Users'
import { Media } from './collections/Media/Media'
import { Posts } from './collections/Posts/Posts'
import { Pages } from './collections/Pages/Pages'
import { Header } from './globals/Header/config'
import { Footer } from './globals/Footer/config'
import { ContactMessages } from './collections/ContactMessages/ContactMessages'
import { plugins } from './plugins'
import { contactEndpoint } from '@/api/contact'
import { Categories } from './collections/Categories'
import { searchPosts } from './api/search'
import { searchPostsEndpoint, searchPostsSimple } from './api/searchPosts'
import { Tags } from './collections/Tags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  endpoints: [contactEndpoint, searchPosts, searchPostsEndpoint, searchPostsSimple],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { es },
  },
  collections: [Pages, Users, Media, Categories, Posts, ContactMessages, Tags],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL,
    defaultFromName: 'Ane',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [...plugins],
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:4321',
    'http://localhost:4321',
    'http://localhost:3000',
  ].filter(Boolean),

  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:4321',
    'http://localhost:4321',
    'http://localhost:3000',
  ].filter(Boolean),
})
