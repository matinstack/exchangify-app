# 🚀 Expensely

A modern expense management application built with Next.js and TypeScript.

Expensely helps users track their income and expenses with a clean dashboard and simple transaction management.

> ⚠️ **Note:** This project is currently under active development (~WIP).

---

## ✨ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Forms & Validation:** React Hook Form & Zod
- **Charts & Motion:** Recharts & Framer Motion

## 🌐 Live Demo
https://expensely-pi.vercel.app

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm

### Installation

1. **Set up Environment Variables:**
 
   Create a `.env` file:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
    ```

2. **Install and configure:**

   ```bash
   git clone https://github.com/matinstack/expensely.git
   cd expensely
   bun install
   bunx drizzle-kit push
   bun run dev
   ```
