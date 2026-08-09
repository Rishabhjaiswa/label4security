# Matrix Tags - Product Verification & Lead Management Portal

Matrix Tags is an optimized brand protection and product verification dashboard built using Next.js, Prisma, and Supabase.

## Getting Started

1. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill out your database URL and administrator credentials:
   ```bash
   cp .env.example .env
   ```

2. **Run the Low-Memory Server**:
   Double-click the **`start.bat`** file in the project folder. Select option **`1`** to run in production mode (requires only ~50MB of RAM).

---

## 🔒 SECURITY WARNING: Git History & Credential Rotation

> [!WARNING]
> Any security credentials (database passwords, administrator emails/passwords) that were previously hardcoded in the codebase are still recoverable from the git commit history, even after being removed from the active source files.
> 
> **You must treat any previous credentials as compromised. Please rotate your database passwords on Supabase immediately.**
> Do not rely on code changes alone to secure compromised credentials.

### Rotations Guidelines
1. Log in to your **Supabase Dashboard**.
2. Go to **Settings** -> **Database**.
3. Under **Database Password**, click **Reset database password** to set a new password.
4. Copy the new connection string, update your local `.env` file, and restart the server.
