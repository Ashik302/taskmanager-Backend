import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)

export default app;
