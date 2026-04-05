<div align="center">

# 📋 JobTracker

**Your personal job search command center.**
Track applications, companies, interviews, and land that offer.

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
| 📋 **Applications** | Add, edit, search, filter by status, paginate — with Remote/On-site column |
| 🗓️ **Interviews** | Track interviews per application with type, date, result |
| 🏢 **Companies** | Card grid with search, stats, website links, status tags, CRUD |
| 📈 **Analytics** | Charts: applications over time, status breakdown, interview types, top companies, KPI cards |
| ⚙️ **Settings** | Default currency preference, JSON data export, delete account |
| 👤 **Profile** | Update name, change password, view personal stats |
| 🔐 **Authentication** | Email/password + Google OAuth — JWT sessions |
| 🔑 **Forgot password** | Token-based reset flow via email |
| 🌗 **Dark / Light mode** | Persisted theme switcher |
| 📱 **Responsive** | Sidebar on lg+ screens, mobile drawer on smaller screens |
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
│   ├── (dashboard)/         # protected pages
│   │   ├── page.tsx          # Dashboard
│   │   ├── applications/
│   │   ├── interviews/
│   │   ├── companies/
│   │   ├── analytics/
│   │   ├── settings/
│   │   └── profile/
│   └── api/export/           # GET /api/export — JSON data download
├── actions/                  # Server Actions — applications, interviews, companies, profile, settings, password reset
├── components/
│   ├── applications/         # Table, filters, add/edit modal
│   ├── analytics/            # Charts, KPI cards
│   ├── auth/                 # Login, register, forgot/reset password forms
│   ├── common/               # Shared UI: StatusSelect, FormAlert, ModalTitle
│   ├── companies/            # Card grid, CompanyCard, add/edit modal
│   ├── dashboard/            # Stats, pipeline, recent apps
│   ├── interviews/           # Table, add/edit modal
│   ├── layout/               # Sidebar, DashboardLayout, mobile drawer
│   ├── profile/              # ProfileHeader, StatCard, PersonalInfoForm, ChangePasswordForm
│   ├── settings/             # DefaultsForm, DataExportCard, DangerZoneCard
│   └── providers/            # Antd & theme providers
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── auth-helpers.ts       # Shared requireUserId helper
│   ├── colors.ts             # Centralized color palette (COLORS)
│   ├── prisma.ts             # Prisma client
│   ├── revalidate.ts         # Shared cache revalidation helpers
│   ├── select-options.ts     # Shared Ant Design select option arrays
│   ├── validators.ts         # Shared form validators
│   ├── status-config.ts      # Application status config & select options
│   └── data/                 # DB read queries (applications, interviews, companies, analytics, settings)
├── types/
│   ├── application.ts        # ApplicationStatus, SerializedApplication, form types
│   ├── auth.ts               # ActionState, form value types
│   ├── common.ts             # Currency, HexColor, AntdTagColor
│   ├── company.ts            # CompanyFormValues
│   ├── interview.ts          # InterviewType, SerializedInterview
│   ├── settings.ts           # SettingsData, DefaultsFormValues
│   └── stat-card.ts          # Generic StatCardConfig<TStats, TLabel>
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

---

## 🗂️ DB Relationships

```
User ──► UserSettings (1:1, lazy upsert)
User ──► Company (cascade delete)
User ──► Application (cascade delete)
Company ──► Application (restrict — cannot delete company with linked applications)
Application ──► Interview (cascade delete)
```

Companies use `findOrCreate` (case-insensitive) when adding an application — no duplicate companies, no orphan records.
