# EduCBC Pro

EduCBC Pro is a Next.js school management starter for Kenyan CBC primary and junior secondary schools.

The original brief listed React 20. The current dependency set is pinned to React 19 because the available TanStack Query release declares React 18/19 peer support and npm does not resolve React 20 in this environment.

## Included

- Role dashboards for Super Admin, Teacher, Class Teacher, Parent, Student, Exams, Sports, Finance, and Workers.
- CBC assessment engine with EE, ME, AE, and BE bands.
- Timetable generator preview and scheduling constraints.
- Module foundations for fees, attendance, documents, notifications, library, transport, health, and analytics.
- Integration placeholders for MongoDB/Mongoose, Redis, Cloudflare R2, JWT auth, and Africa's Talking SMS.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill in real credentials when connecting external services.
