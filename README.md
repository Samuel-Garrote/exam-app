# 🚀 Robust Exam-App System (Full-Stack Architecture)

A professional assessment engine designed to demonstrate mastery in modern backend architectures, strict typing, and cloud-native deployment.

## 🛠️ Tech Stack
- **Language:** TypeScript 5+ (Strictly typed architecture)
- **Framework:** Express.js (Node.js)
- **ORM:** Prisma 7 (Latest version with manual Database Adapters)
- **Database:** PostgreSQL (Cloud-native relational storage)
- **Infrastructure:** Docker (Containerized development environments)
- **Deployment:** Railway (CI/CD pipeline integrated with GitHub)

## 🏗️ Core Engineering Challenges Solved
- **Prisma 7 Implementation:** Configured manual `PrismaPg` adapters and `pg.Pool` connection management to ensure high availability in production environments.
- **Advanced Deployment Pipeline:** Streamlined build processes using `tsc` and server-side Prisma Client generation to avoid binary compatibility issues.
- **Database Schema Parity:** Implemented `db push` synchronization to maintain schema integrity between TypeScript models and the live PostgreSQL instance.
- **Cross-Platform Integration:** Engineered a decoupled architecture where a React (Netlify) frontend seamlessly communicates with a Node.js (Railway) backend.

## 🚀 Local Setup & Installation

1. **Clone the repository.**
2. **Install dependencies:** `npm install`.
3. **Configure Environment:** Create a `.env` file with your `DATABASE_URL`.
4. **Spin up Database:** `docker-compose up -d`.
5. **Sync Schema:** `npx prisma db push`.
6. **Start Server:** `npm run dev`.

## 🌐 Live Access
- **API Endpoint:** : https://exam-app-production-d11b.up.railway.app/
- **Client Application:**:  https://saas-exam-app.netlify.app/
