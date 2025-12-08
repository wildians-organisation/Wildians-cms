# Wildians CMS

Content Management System built with [Payload CMS](https://payloadcms.com/) 3.0, PostgreSQL (Supabase), and S3 storage.

## Tech Stack

- **CMS**: Payload CMS 3.0
- **Framework**: Next.js 15
- **Database**: PostgreSQL (Supabase)
- **Storage**: S3 (optional)
- **Package Manager**: pnpm

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm (`brew install pnpm`)
- Docker Desktop (for local Supabase)

### Local Development

1. **Clone and install dependencies**

   ```bash
   git clone <repo-url>
   cd Wildians-cms
   pnpm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

3. **Start local Supabase**

   ```bash
   supabase start
   ```

   This will output your local database URL. Update `.env`:

   ```
   DATABASE_URI=postgresql://postgres:postgres@127.0.0.1:54322/postgres
   ```

4. **Start the dev server**

   ```bash
   pnpm dev
   ```

5. **Open the app**

   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Supabase Studio: http://127.0.0.1:54323

### Supabase Commands

```bash
supabase start     # Start local Supabase
supabase stop      # Stop all services
supabase status    # Check running services
supabase db reset  # Reset database to initial state
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URI` | PostgreSQL connection string | Yes |
| `PAYLOAD_SECRET` | Secret key for Payload (generate with `openssl rand -base64 32`) | Yes |
| `S3_BUCKET` | S3 bucket name | No |
| `S3_ACCESS_KEY_ID` | S3 access key | No |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | No |
| `S3_REGION` | S3 region | No |
| `S3_ENDPOINT` | Custom S3 endpoint (for S3-compatible services) | No |
| `NEXT_PUBLIC_SERVER_URL` | Public server URL | No |

## Docker

### Development with Docker

```bash
docker compose up
```

This mounts your local files and runs the dev server with hot reload.

### Production Build

The Dockerfile is configured for standalone Next.js builds, optimized for deployment on platforms like Coolify.

```bash
docker build -t wildians-cms .
docker run -p 3000:3000 --env-file .env wildians-cms
```

## Collections

- **Admins** - Admin users with authentication
- **Media** - Uploads with image processing
- **Universes** - Content universes
- **Journeys** - Learning journeys
- **Lessons** - Individual lessons

## Production (Supabase Cloud)

For production, use Supabase Cloud:

1. Create a project at [supabase.com](https://supabase.com)
2. Get your connection string from Settings > Database
3. Update `DATABASE_URI` in your production environment:

   ```
   DATABASE_URI=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

## Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
