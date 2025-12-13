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
import { plugins } from './plugins'
import { contactEndpoint } from '@/api/contact'
import { Categories } from './collections/Categories'
import { searchPosts } from './api/search'
import { searchPostsEndpoint, searchPostsSimple } from './api/searchPosts'
import { Tags } from './collections/Tags'
import { Documents } from './collections/Documents/Documents'
import { Videos } from './collections/Videos/Videos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  endpoints: [contactEndpoint, searchPosts, searchPostsEndpoint, searchPostsSimple],

  // AÑADE ESTO - Muy importante para producción
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: path.resolve(dirname, '/components/admin/ui/Logo'),
        Icon: path.resolve(dirname, '/components/admin/ui/Icon'),
      },
    },
  },
  upload: {
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  },
  i18n: {
    supportedLanguages: { es },
  },
  collections: [Pages, Users, Media, Categories, Posts, Tags, Documents, Videos],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // CAMBIA ESTO - Acepta ambas variables
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
    defaultFromName: 'Ane',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [...plugins],
  cors: [
    process.env.FRONTEND_URL,
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    'http://localhost:4321',
    'http://localhost:3000',
    'https://educarsano-production.up.railway.app',
  ].filter(Boolean),
  csrf: [
    process.env.FRONTEND_URL,
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    'http://localhost:4321',
    'http://localhost:3000',
    'https://educarsano-production.up.railway.app',
  ].filter(Boolean),
})
