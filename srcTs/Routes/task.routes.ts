import express from "express";
import { TaskController } from "../Controllers/task.controller";

const router = express.Router();

router.get("/", TaskController.getAllTasks);

router.get("/:id", TaskController.getTaskById);

router.post("/create", TaskController.createTaskOrEdit);

router.patch("/edit/:id", TaskController.createTaskOrEdit);

export const taskRoutes = router;
