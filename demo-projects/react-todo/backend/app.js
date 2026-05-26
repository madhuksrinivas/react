import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import Todo from "./models/Todo.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find({ completed: false });
  res.json(todos);
});

// GET completed todos
app.get("/todos/completed", async (req, res) => {
  const todos = await Todo.find({ completed: true });
  res.json(todos);
});

// POST - add new todo
app.post("/todos", async (req, res) => {
  const todo = await Todo.create({ text: req.body.text });
  res.status(201).json(todo);
});

// PUT - edit a todo
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true },
  );
  res.json(todo);
});

// PATCH - mark as completed
app.patch("/todos/:id/complete", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true },
  );
  res.json(todo);
});

// DELETE - delete a todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
