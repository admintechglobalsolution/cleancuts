# Clean Cuts

Clean Cuts is a simple **Next.js App Router** project using **Prisma ORM** and **Neon PostgreSQL** to manage users and update their status persistently.

This README contains **everything needed** to set up, run, migrate, view, and debug the project.

---

## 🧱 Tech Stack

- Next.js (App Router)
- React
- Prisma ORM (v7)
- Neon PostgreSQL
- pnpm

---

## 📁 Project Structure


```
└── 📁src
    └── 📁app
        ├── error.tsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        ├── loading.tsx
        ├── page.module.css
        ├── page.tsx
        ├── users.mock.ts
    └── 📁components
        ├── UserTable.tsx
    └── 📁lib
        ├── prisma.ts
    └── 📁types
        └── user.ts
```

---

## 📦 Install Dependencies

```bash
pnpm add -D prisma
pnpm add @prisma/client
npx prisma generate
pnpm add pg
pnpm add @prisma/adapter-pg
npx prisma migrate dev --name init
pnpm prisma:studio
pnpm dev -- --hostname 0.0.0.0  
npx prisma studio 
npx prisma migrate dev
npx prisma migrate dev --name unique_contact
npx prisma generate
npx prisma db seed

