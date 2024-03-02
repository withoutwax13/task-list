import express from "express";
import { createTasks, updateTasks, fetchTasks, deleteTasks } from "./task";
import serverless from "serverless-http";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
    app.use(cors());
}

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.items);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await createTasks(task);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

app.update("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export const handler = serverless(app);
