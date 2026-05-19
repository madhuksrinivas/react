# Kanban Board — Zustand

A Kanban board built with React, Zustand, and a `json-server` mock backend. Tasks move across three columns: **Planned**, **Ongoing**, and **Done**.

## Tech Stack

- **React 19** — UI
- **Zustand** — global state management
- **Axios** — HTTP requests
- **json-server** — mock REST API backed by `db.json`
- **classnames** — conditional CSS class utility
- **Vite** — dev server and bundler

## Features

- View tasks grouped by status (Planned / Ongoing / Done)
- Add, edit, and delete tasks
- Move tasks between statuses
- Toast-style alert modal with auto-dismiss on success

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the mock API server

```bash
npm run server
```

Runs `json-server` on `http://localhost:3000`. Task data is persisted in `db.json`.

### 3. Start the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

## Project Structure

```
src/
├── components/
│   ├── AlertModal.jsx   # Auto-dismissing alert/error modal
│   ├── Column.jsx       # Kanban column (Planned / Ongoing / Done)
│   ├── Header.jsx       # App header
│   ├── Modal.jsx        # Add/edit task modal
│   └── Task.jsx         # Individual task card
├── store/
│   └── store.js         # Zustand store (fetchTasks, addTask, deleteTask, updateTask, updateTaskStatus)
├── styles/              # Component-scoped CSS files
├── constants.js         # Statuses, API URL, alert message constants
└── App.jsx
```

## Available Scripts

| Script            | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start Vite dev server                   |
| `npm run build`   | Production build                        |
| `npm run preview` | Preview production build                |
| `npm run server`  | Start json-server mock API on port 3000 |
| `npm run lint`    | Run ESLint                              |
