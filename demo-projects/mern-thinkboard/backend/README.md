# Think Board Backend

Backend API for Think Board, built with Express and MongoDB.

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- Upstash Redis Rate Limiting
- CORS

## Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas (or another MongoDB instance)
- Upstash Redis account (for rate limiting)

## Setup

```bash
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
UPSTASH_REDIS_REST_URL=<your-upstash-url>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>
```

## Run In Development

```bash
npm run dev
```

## Run In Production

```bash
npm start
```

## Base URL

`http://localhost:5000/api/notes`

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get one note by id
- `POST /api/notes` - Create note
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Rate Limiting

Current rate limit is configured as:

- 5 requests per 10 seconds (global bucket)

## Folder Structure

```text
src/
  config/        # DB and Upstash config
  controllers/   # Route handlers
  middleware/    # Custom middleware (rate limiting)
  model/         # Mongoose models
  routes/        # Express routers
  server.js      # Entry point
```
