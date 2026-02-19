# Wildians CMS

Headless CMS built with Directus

## Content migration process

1. Change schema via directus dashboard on local supabase instance
2. Run `npx directus-sync pull`
3. Run `docker compose up -d` (targeting linked supabase instance)
4. Run `npx directus-sync push`