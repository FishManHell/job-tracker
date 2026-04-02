<div align="center">

# 📋 JobTracker

**Your personal job search command center.**
Track applications, monitor your pipeline, and land that offer.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-job--tracker--tau--two.vercel.app-6366f1?style=for-the-badge)](https://job-tracker-tau-two.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

</div>

---

## ✨ What is JobTracker?

JobTracker is a full-stack web app that helps you organize your job hunt from the first application to the final offer. No more losing track of where you applied, who you spoke with, or what comes next.

---

## 🖥️ Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | At-a-glance stats: total applied, in progress, interviews, offers |
| 📋 **Applications** | Add, edit, search, filter by status, paginate, delete |
| 👤 **Profile** | Update name, change password, view personal stats |
| 🔐 **Authentication** | Email/password + Google OAuth — JWT sessions |
| 🔑 **Forgot password** | Token-based reset flow via email |
| 🌗 **Dark / Light mode** | Persisted theme switcher |
| 🔒 **Protected routes** | All dashboard pages require a valid session |

---

## 🏗️ Tech Stack

```
Frontend    Next.js 16 (App Router) · TypeScript · Tailwind CSS · Ant Design
Backend     Next.js Server Actions · NextAuth v5 (JWT)
Database    Supabase PostgreSQL · Prisma ORM
Email       Resend
Deploy      Vercel
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- A free [Supabase](https://supabase.com) project
- A free [Resend](https://resend.com) account (for password reset emails)

### 1. Clone & install

```bash
git clone https://github.com/FishManHell/job-tracker.git
cd job-tracker
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@[region].supabase.com:5432/postgres"

# Auth
AUTH_SECRET=""       # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (Resend)
RESEND_API_KEY=""
APP_URL="http://localhost:3000"
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — done.

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/              # /login, /register, /forgot-password, /reset-password
│   └── (dashboard)/         # protected pages
│       ├── page.tsx          # Dashboard
│       ├── applications/
│       ├── interviews/
│       ├── companies/
│       ├── analytics/
│       ├── settings/
│       └── profile/
├── actions/                  # Server Actions — auth, applications, profile, password reset
├── components/
│   ├── applications/         # Table, filters, add/edit modal
│   ├── auth/                 # Login, register, forgot/reset password forms
│   ├── common/               # Shared UI: StatusSelect, FormAlert
│   ├── dashboard/            # Stats, pipeline, recent apps
│   ├── layout/               # Sidebar navigation
│   ├── profile/              # ProfileHeader, StatCard, PersonalInfoForm, ChangePasswordForm
│   └── providers/            # Antd & theme providers
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── prisma.ts             # Prisma client
│   ├── status-config.ts      # Application status config & select options
│   └── data/                 # DB read queries
├── prisma/
│   └── schema.prisma         # DB schema
└── proxy.ts                  # Auth guard (Next.js 16)
```

---

## 🔄 Application Status Flow

```
  APPLIED ──► SCREENING ──► INTERVIEW ──► OFFER ✅
                                    │
                                    ├──► REJECTED ❌
                                    └──► WITHDRAWN 🚫
```
