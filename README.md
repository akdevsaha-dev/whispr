# Whispr - Modern Real-Time Chat App

Whispr is a modern, real-time group chatting application with a sleek, intuitive user interface optimized for both desktop and mobile devices. Powered by Next.js for a responsive frontend, [Socket.IO](http://socket.io/) for instant messaging, and Prisma with PostgreSQL for efficient data storage, Whispr allows users to create and join group chats, send real-time messages, and enjoy a clean, distraction-free experience. Easily deployable on Vercel for the frontend and Heroku for the backend, it supports custom domains (e.g., [whispr.in](http://whispr.in/)), making it perfect for small-scale, interactive group communication.

## ✨ Features

---

Modern UI: Responsive, user-friendly design for seamless chatting on any device.

Real-Time Messaging: Instant group chat updates powered by [Socket.IO](http://socket.io/).

Group Management: Effortlessly create, join, or leave chat groups.

Persistent Storage: Securely store group metadata and messages in PostgreSQL via Prisma.

Custom Domain Support: Host on your own domain (e.g., [whispr.in](http://whispr.in/))

## 🛠️ Tech Stack

---

Frontend: Next.js (React framework for static/SSR rendering)

Backend: Node.js with [Socket.IO](http://socket.io/) (real-time WebSocket server)

Database: PostgreSQL with Prisma ORM

Hosting: Vercel (frontend), Heroku (backend)

Dependencies: Axios (API requests), Prisma Client

## 📋 Prerequisites

---

Before setting up Whispr, ensure you have the following:
Node.js (v18 or higher): Download

PostgreSQL Database: Use a free provider like Neon or Supabase

Vercel account: Sign up

Heroku account: Sign up

Git: Download

GitHub account: Sign up

## ⚙️ Setup Instructions

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/whispr.git
cd whispr
```

### 2. Set Up PostgreSQL Database (Neon)

1. Sign up at Neon and create a free PostgreSQL database.
2. Copy the connection URL (e.g., postgresql://user:pass@host:port/dbname?sslmode=require).
3. Save the URL for use in environment variables.
4. Set DATABASE_URL in backend/.env:

   ```
   DATABASE_URL=your-neon-postgresql-url
   ```

5. Run migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

### 3. Configure Environment Variables

**Frontend** (frontend/.env.local):

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend.herokuapp.com
DATABASE_URL=your-neon-postgresql-url
```

**Backend** (backend/.env):

```
DATABASE_URL=your-neon-postgresql-url
PORT=3000
```

### 4. Install Dependencies

**Frontend**:

```bash
cd frontend
npm install
```

**Backend**:

```bash
cd ../backend
npm install
```

### 5. Run Locally

**Backend**:

```bash
cd backend
npm start
```

**Frontend**:

```bash
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser to test the app.

## 🤝 Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit changes:

   ```bash
   git commit -m "Add feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Built with inspiration from modern chat apps and real-time communication tools.
- Special thanks to Vercel, Neon, and Prisma for their free hosting and database services
