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

pnpm add -D prisma
pnpm add @prisma/client
npx prisma generate
pnpm add pg
pnpm add @prisma/adapter-pg
npx prisma migrate dev --name init
pnpm prisma:studio


npx prisma migrate dev --name init --url "postgresql://neondb_owner:npg_CknhYdjf7Fo1@ep-withered-cherry-ai27nure-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

npx prisma studio --url "postgresql://neondb_owner:npg_CknhYdjf7Fo1@ep-withered-cherry-ai27nure-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"


Prisma Studio DB---> http://localhost:51212/