const express = require("express");
const { createTask, fetchTasks, updateTask, deleteTask } = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/task",authMiddleware, createTask);

router.get("/task", authMiddleware, fetchTasks);

router.put("/task/:id", authMiddleware, updateTask);

router.delete("/task/:id", authMiddleware, deleteTask);

module.exports = router;