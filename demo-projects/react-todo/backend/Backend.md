# Backend — React Todo App

## Overview

This backend is a **REST API** built with **Node.js + Express** that stores and manages todo data in **MongoDB Atlas** via Mongoose. The React frontend communicates with it over HTTP.

---

## Folder Structure

```
backend/
├── app.js            # Entry point — creates server, registers middleware, defines routes
├── db/
│   └── connection.js # Connects to MongoDB Atlas using Mongoose
├── models/
│   └── Todo.js       # Mongoose schema & model for a todo document
├── .env              # Secret config (MONGO_URI, PORT) — never commit this
└── package.json
```

---

## What is Node.js?

Node.js lets you run JavaScript **outside the browser** — on your computer/server.

```
Browser → JavaScript runs in the browser's V8 engine
Node.js → JavaScript runs on your machine (also V8, but server-side)
```

Your backend is just a JavaScript program running on your machine, listening for HTTP requests.

---

## What is Express?

Express is a **minimal framework for Node.js** that makes it easy to create a web server and handle HTTP requests.

Without Express you'd wire everything manually. With Express:

```js
const app = express();
app.get("/todos", (req, res) => {
  res.json([]); // done!
});
```

---

## What is Mongoose?

Mongoose is an **ODM (Object Document Mapper)** for MongoDB. It lets you:

- Define a **schema** (shape/rules for your data)
- Create a **model** (a class you use to query the DB)
- Use simple methods like `Todo.find()`, `Todo.create()`, `Todo.findByIdAndUpdate()`

---

## Full Request Flow

```
React Frontend (port 5173)
        │
        │  HTTP Request (fetch)
        ▼
Express Server (port 5000)
        │
        ├── Middleware runs first:
        │     cors()         → allows cross-origin requests from React
        │     express.json() → parses the JSON body from the request
        │
        ├── Route is matched (e.g. POST /todos)
        │
        ▼
Route Handler (async function)
        │
        ├── Reads req.body / req.params
        │
        ▼
Mongoose Model (Todo)
        │
        ├── Sends query to MongoDB Atlas over the internet
        │
        ▼
MongoDB Atlas (cloud database)
        │
        └── Returns result → Mongoose → route handler → res.json() → Frontend
```

---

## app.js — Line by Line

```js
import "dotenv/config";
```

> Reads `.env` and loads variables (`MONGO_URI`, `PORT`) into `process.env`. Must be the **first import** so all other code can access them.

```js
import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import Todo from "./models/Todo.js";
```

> Import tools and your own modules. `cors` solves the browser security policy that blocks requests between different ports (5173 → 5000).

```js
const app = express();
```

> Creates your Express application instance. All routes and middleware are registered on this.

```js
app.use(cors());
app.use(express.json());
```

> **Middleware** — functions that run on **every request**, before routes are reached.
>
> | Middleware       | What it does                                               |
> | ---------------- | ---------------------------------------------------------- |
> | `cors()`         | Adds headers allowing React (5173) to call this API (5000) |
> | `express.json()` | Parses the JSON request body so `req.body` works           |

```js
connectDB();
```

> Calls `db/connection.js` — connects to MongoDB Atlas once when the server starts.

```js
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

> Starts the HTTP server. It now listens for incoming requests on the configured port (default: 5000).

---

## db/connection.js — Explained

```js
import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
```

- `mongoose.connect(MONGO_URI)` — opens a persistent connection to your MongoDB Atlas cluster using the URI from `.env`
- `conn.connection.host` — logs the Atlas cluster host so you can confirm which DB you're connected to

---

## models/Todo.js — Schema & Model

```js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }, // auto-adds createdAt & updatedAt fields
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
```

Each todo document in MongoDB looks like:

```json
{
  "_id": "664abc123...",
  "text": "Buy groceries",
  "completed": false,
  "createdAt": "2026-05-26T10:00:00.000Z",
  "updatedAt": "2026-05-26T10:00:00.000Z"
}
```

---

## Routes — CRUD Breakdown

### What is `:id`?

```js
app.delete('/todos/:id', ...)
// if request is DELETE /todos/664abc123
// then req.params.id === "664abc123"
```

`:id` is a **URL parameter** — a dynamic segment captured from the URL path.

---

### GET `/todos` — Fetch active todos

```js
app.get("/todos", async (req, res) => {
  const todos = await Todo.find({ completed: false });
  res.json(todos);
});
```

Flow:

1. Frontend calls `fetch("http://localhost:5000/todos")`
2. `Todo.find({ completed: false })` queries MongoDB for all non-completed todos
3. `res.json(todos)` sends the array back as JSON

---

### GET `/todos/completed` — Fetch completed todos

```js
app.get("/todos/completed", async (req, res) => {
  const todos = await Todo.find({ completed: true });
  res.json(todos);
});
```

Same as above but filters for `completed: true`.

---

### POST `/todos` — Create a todo

```js
app.post("/todos", async (req, res) => {
  const todo = await Todo.create({ text: req.body.text });
  res.status(201).json(todo);
});
```

Flow:

1. Frontend sends `POST /todos` with body `{ "text": "Buy groceries" }`
2. `express.json()` middleware parses the body → `req.body.text` is `"Buy groceries"`
3. `Todo.create(...)` inserts a new document into MongoDB (completed defaults to `false`)
4. `res.status(201)` — 201 means "Created" (more specific than 200)
5. Returns the newly created todo (with `_id`, timestamps)

---

### PUT `/todos/:id` — Edit a todo

```js
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true },
  );
  res.json(todo);
});
```

Flow:

1. Frontend sends `PUT /todos/664abc123` with body `{ "text": "Buy milk" }`
2. `findByIdAndUpdate` finds the document by `_id` and updates the `text` field
3. `{ new: true }` — returns the **updated** document (without this, Mongoose returns the old one)
4. Returns the updated todo

---

### PATCH `/todos/:id/complete` — Mark as completed

```js
app.patch("/todos/:id/complete", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true },
  );
  res.json(todo);
});
```

- `PATCH` = partial update (only changing `completed`, not replacing the whole document)
- Sets `completed: true` on the matched todo

---

### DELETE `/todos/:id` — Delete a todo

```js
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});
```

Flow:

1. Frontend sends `DELETE /todos/664abc123`
2. `findByIdAndDelete` removes the document from MongoDB
3. Returns a confirmation message

---

## HTTP Methods → CRUD

| HTTP Method | Route                 | Mongoose Method            | Action            |
| ----------- | --------------------- | -------------------------- | ----------------- |
| `GET`       | `/todos`              | `Todo.find()`              | Read active todos |
| `GET`       | `/todos/completed`    | `Todo.find()`              | Read completed    |
| `POST`      | `/todos`              | `Todo.create()`            | Create a todo     |
| `PUT`       | `/todos/:id`          | `Todo.findByIdAndUpdate()` | Replace text      |
| `PATCH`     | `/todos/:id/complete` | `Todo.findByIdAndUpdate()` | Mark complete     |
| `DELETE`    | `/todos/:id`          | `Todo.findByIdAndDelete()` | Delete a todo     |

---

## Environment Variables (.env)

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/react-todo
PORT=5000
```

- `MONGO_URI` — the connection string to your Atlas cluster. Never hardcode this.
- `PORT` — the port Express listens on. Falls back to `5000` if not set.
- `.env` is listed in `.gitignore` — **never commit it**.

---

## Understanding Mongoose (the MongoDB part)

Open backend/models/Todo.js:

```js
const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);
```

> This defines the **shape** of every document in your MongoDB `todos` collection. Like a blueprint.
>
> - `timestamps: true` → auto-adds `createdAt` and `updatedAt` fields

```js
const Todo = mongoose.model("Todo", todoSchema);
```

> Creates a `Todo` class. Mongoose will store data in a collection called `todos` (lowercase, pluralized automatically).

### Mongoose CRUD methods:

```js
Todo.find(); // get all
Todo.findById(id); // get one by id
Todo.create({ text: "Learn React" }); // insert new
Todo.findByIdAndUpdate(id, data); // update one
Todo.findByIdAndDelete(id); // delete one
```

---

## The Full Flow of One Request

When your React app calls `POST /todos` with `{ text: "Buy milk" }`:

```
1. React sends: POST http://localhost:5000/todos  { text: "Buy milk" }
         ↓
2. cors() middleware → allows it
         ↓
3. express.json() → parses body so req.body = { text: "Buy milk" }
         ↓
4. app.post('/todos') route matches
         ↓
5. Todo.create({ text: req.body.text }) → saves to MongoDB Atlas
         ↓
6. res.status(201).json(todo) → sends back the created todo
         ↓
7. React receives the new todo object
```

---
