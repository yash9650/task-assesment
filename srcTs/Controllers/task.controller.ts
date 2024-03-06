import { Request, Response } from "express";
import { TCreateTask, TaskEntity } from "../Database/Entities/task.entity";
import appDataSource from "../Database/DataSource";
import { emptyResponse } from "../Utils/request.utils";

export class TaskController {
  static getTaskById = async (req: Request, res: Response) => {
    const jsonResponse = emptyResponse<TaskEntity>();
    try {
      const taskId = parseInt(req.params.id);

      if (!taskId) {
        throw new Error("Task id is required.");
      }

      const taskRepo = appDataSource.getRepository(TaskEntity);

      jsonResponse.result = await taskRepo.findOne({
        where: {
          id: taskId,
        },
      });

      if (!jsonResponse.result) {
        throw new Error("Task not found.");
      }

      jsonResponse.success = true;
    } catch (error) {
      jsonResponse.errorMessage = error.message;
    }

    return res.json(jsonResponse);
  };

  static getAllTasks = async (req: Request, res: Response) => {
    const jsonResponse = emptyResponse<TaskEntity[]>();
    try {
      const taskRepo = appDataSource.getRepository(TaskEntity);

      jsonResponse.result = await taskRepo.find();

      jsonResponse.success = true;
    } catch (error) {
      jsonResponse.errorMessage = error.message;
    }

    return res.json(jsonResponse);
  };

  static createTaskOrEdit = async (req: Request, res: Response) => {
    const taskData: TCreateTask = req.body;
    const taskId = parseInt(req.params.id);

    const jsonResponse = emptyResponse();

    try {
      const taskRepo = appDataSource.getRepository(TaskEntity);

      if (taskId) {
        const existingTask = await taskRepo.findOne({
          where: {
            id: taskId,
          },
        });

        if (!existingTask) {
          throw new Error("Task not found!");
        }

        await taskRepo.update(
          {
            id: taskId,
          },
          {
            name: taskData.name || existingTask.name,
            description: taskData.description || existingTask.description,
            priority: taskData.priority || existingTask.priority,
          }
        );
      } else {
        await taskRepo.insert(taskData);
      }

      jsonResponse.success = true;
    } catch (error) {
      jsonResponse.errorMessage = error.message;
    }

    return res.json(jsonResponse);
  };
}
