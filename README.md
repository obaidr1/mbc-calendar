# Bachata Calendar Munich-app

This is a [sidebase cheviot](https://sidebase.io/) app created by running `npm create sidebase@latest`. This project uses the following technologies for a great developer- and user-experience:
- [TypeScript](https://www.typescriptlang.org/)
- [Nuxt 3](https://nuxt.com)
- Database models, migrations, queries and easy DB-switching via Prisma
- Deep Prisma integration: Use the client in your endpoints via nuxt-prisma, Prisma client is auto-generated for npm run dev and other commands and more
- Frontend- and Backend data-transformation via nuxt-parse and zod
- In-memory development SQL-database via sqlite3
- Linting via eslint
- Test management, Test UI, component snapshotting via vitest
- Component tests via test-library/vue
- Nuxt 3 native API testing via @nuxt/test-utils
- Code coverage via c8
- CSS utilities via TailwindCSS
- CSS components via Naive UI
- Type checking in script and template via Volar / vue-tsc
- Code editor configuration via .editorconfig files and a portable .settings/ folder whith best-practice VS Code settings and extensions for Vue 3 / Nuxt 3 development

## How to get going?

This is a straight-forward setup with minimal templating and scaffolding. The options you selected during the sidebase CLI setup are all here though. Good places to continue reading are:
- [the First Steps documentation](https://sidebase.io/sidebase/usage)
- [our discord](https://discord.gg/auc8eCeGzx)

Some tasks you should probably do in the beginning are:
- [ ] replace this generic README with a more specific one
- [ ] install the Vue Volar extension
- [ ] enable [Volar takeover mode](https://nuxt.com/docs/getting-started/installation#prerequisites) to ensure a smooth editor setup
- [ ] [install Nuxt 3 devtools](https://github.com/nuxt/devtools#installation) if you want to use them


### Setup

Make sure to install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

# MBC Calendar

A calendar application for managing and featuring events.

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

1. Set up your production environment:
   - Create a new `.env` file with production values
   - Set up a production database
   - Configure Cloudinary credentials
   - Set a secure admin password

2. Build the application:
   ```bash
   npm run build:prod
   ```

3. Start the production server:
   ```bash
   npm run start:prod
   ```

## Environment Variables

- `DATABASE_URL`: Database connection string
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `ADMIN_PASSWORD`: Password for admin access
- `NODE_ENV`: Set to "production" in production

## Security Considerations

1. Always use HTTPS in production
2. Set secure passwords for admin access
3. Keep your environment variables secure
4. Regularly backup your database
5. Monitor your application logs

## Backup and Recovery

The application automatically creates backups of modified files in the `backups/` directory. The system keeps up to 10 versions of each file.

## Support

For support, please contact the development team.
