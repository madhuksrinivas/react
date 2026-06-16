# Think Board (MERN)

A full-stack notes application with create, edit, and delete features.

## Monorepo Structure

```text
mern-thinkboard/
  backend/   # Express + MongoDB API
  frontend/  # React + Vite client
```

## Features

- Create notes
- Edit notes
- Delete notes
- Notes list with date formatting
- Toast notifications for success/error states
- API rate limiting

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- Upstash Redis credentials

## Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
```

Add `backend/.env`:

```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
UPSTASH_REDIS_REST_URL=<your-upstash-url>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>
```

Run backend:

```bash
npm run dev
```

### 2. Setup Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Scripts

### Frontend (`frontend/package.json`)

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Backend (`backend/package.json`)

- `npm run dev`
- `npm start`

## API Summary

Base URL: `http://localhost:5000/api/notes`

- `GET /`
- `GET /:id`
- `POST /`
- `PATCH /:id`
- `DELETE /:id`

## Notes

- Ensure Atlas IP allowlist is configured when using MongoDB Atlas.
- Keep `.env` secrets private and never commit them to git.
