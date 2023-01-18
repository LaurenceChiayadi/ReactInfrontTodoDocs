const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    todo: "todo 1",
    isDone: true,
  },
  {
    id: nanoid(),
    todo: "todo 2",
    isDone: false,
  },
  {
    id: nanoid(),
    todo: "todo 3",
    isDone: false,
  },
  {
    id: nanoid(),
    todo: "todo 4",
    isDone: false,
  },
  {
    id: nanoid(),
    todo: "todo 5",
    isDone: false,
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { todo: req.body.todo, id: nanoid(), isDone: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const isDone = Boolean(req.body.isDone);
  if (index > -1) {
    todos[index].isDone = isDone;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
