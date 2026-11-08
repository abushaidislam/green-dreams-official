# 11 — Database Backup and Disaster Recovery Guide

This document defines the standard operational procedures for backing up and restoring the **Green Dreams** PostgreSQL commerce database hosted on **Supabase**.

---

## 1. Architecture Overview

- **Primary Database Engine:** PostgreSQL 15+ (Hosted on Supabase).
- **Session Pooler Host:** `aws-0-ap-southeast-1.pooler.supabase.com:5432`
- **Database Name:** `postgres`
- **Region:** Southeast Asia (Singapore / `ap-southeast-1`).

---

## 2. Automated Backups (Supabase Native)

Supabase provides automated physical and logical backups:
1. **Daily Snapshots:** Taken every 24 hours automatically.
2. **Point-in-Time Recovery (PITR):** Available on Pro tiers for continuous WAL archiving down to the second.
3. **Dashboard Access:**
   - Log in to the [Supabase Dashboard](https://supabase.com/dashboard).
   - Select your Green Dreams project (`cvriidykoydkniungdbd`).
   - Navigate to **Database** -> **Backups**.
   - Download or restore snapshots directly with one click.

---

## 3. Manual Backup Procedure (`pg_dump`)

For scheduled offsite backups or before running major migrations/seeds, perform a manual logical dump:

```bash
# Set PostgreSQL connection variables
export PGPASSWORD="<SUPABASE_DB_PASSWORD>"

# Execute pg_dump using the direct host or session pooler
pg_dump \
  -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 5432 \
  -U postgres.cvriidykoydkniungdbd \
  -d postgres \
  -F c \
  -b \
  -v \
  -f "greendreams_backup_$(date +%Y%m%d_%H%M%S).dump"
```

> [!TIP]
> The custom archive format (`-F c`) is compressed and supports selective table restoration and parallel jobs.

---

## 4. Disaster Recovery & Restoration Procedure (`pg_restore`)

If a catastrophic failure occurs or corrupted data must be rolled back:

1. **Stop active services:**
   Stop or pause the Medusa backend service on Railway to prevent concurrent writes during restoration.

2. **Restore from Dump File:**
   ```bash
   export PGPASSWORD="<SUPABASE_DB_PASSWORD>"

   # Restore the database using pg_restore
   pg_restore \
     -h aws-0-ap-southeast-1.pooler.supabase.com \
     -p 5432 \
     -U postgres.cvriidykoydkniungdbd \
     -d postgres \
     --clean \
     --if-exists \
     --no-owner \
     --no-privileges \
     -v "greendreams_backup_<TIMESTAMP>.dump"
   ```

3. **Verify Integrity:**
   Run the automated QA test suite to verify table schemas and relationships:
   ```bash
   pnpm --filter @green-dreams/backend test:qa
   ```

4. **Resume Services:**
   Restart the Railway Medusa backend service and verify the `/health` endpoint returns `HTTP 200`.
