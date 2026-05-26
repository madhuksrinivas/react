# React Todo App

A full-stack Todo application built with React, Zustand, Node.js, Express, and MongoDB.

## Tech Stack

**Frontend**

- React 19
- Zustand (state management)
- react-datepicker
- Vite

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- dotenv, cors

## Project Structure

```
react-todo/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/    # UI components
│       ├── hooks/         # Custom React hooks
│       ├── store/         # Zustand store
│       └── styles/
└── backend/           # Express REST API
    ├── models/        # Mongoose models (Todo)
    ├── db/            # MongoDB connection
    └── app.js         # Express server entry point
```

## API Endpoints

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/todos`              | Get all active todos    |
| GET    | `/todos/completed`    | Get all completed todos |
| POST   | `/todos`              | Create a new todo       |
| PUT    | `/todos/:id`          | Edit a todo             |
| PATCH  | `/todos/:id/complete` | Mark a todo as complete |
| DELETE | `/todos/:id`          | Delete a todo           |

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:

```bash
npm run dev     # development (auto-restarts on change)
npm start       # production
```

The server runs on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## Features

- Add, edit, and delete todos
- Mark todos as completed
- View active and completed todos separately
- Filter todos
- Persistent storage via MongoDB
- Global state management with Zustand
