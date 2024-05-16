const express = require("express");
const router = express.Router();

var bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3001;

app.use(bodyParser.json());

let todoList = [];

router.get("/todo/:id", (req, res) => {
  const uuid = req.params.id;
  res.json({
    result: todoList.find((task) => task.id === uuid) || null,
  });
});

router.get("/todo", (req, res) => {
  res.json({
    count: todoList.length,
    results: todoList,
  });
});

router.post("/todo", (req, res) => {
  const { task: myTask } = req.body;
  const task = { id: uuidv4(), task: myTask, status: "pending" };
  todoList.push(task);
  res.json({
    result: task,
  });
});

router.patch("/todo/:id", (req, res) => {
  const uuid = req.params.id;
  const { status } = req.body;
  todoList = todoList.map((task) => {
    if (task.id === uuid) {
      task.status = status;
    }
    return task;
  });
  res.json({
    result: todoList.find((task) => task.id === uuid) || null,
  });
});

router.delete("/todo/:id", (req, res) => {
  const uuid = req.params.id;
  const foundTask = todoList.find((task) => task.id === uuid) || null;
  todoList = todoList.filter((task) => task.id !== uuid);
  res.json({
    result: foundTask,
  });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`App is now listenting to ${port}`);
});
