import express from "express"
import { addTask, deleteTask, getTask } from "../controller/taskController.js";
import protect from "../middleware/middleware.js";

const taskRouter = express.Router();

taskRouter.post('/', protect, addTask);
taskRouter.get('/', protect, getTask);
taskRouter.delete('/delete/:id', protect, deleteTask);

export default taskRouter;