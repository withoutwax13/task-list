import { Button, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateTaskForm from "./UpdateTaskForm";
import axios from "axios";
import { API_URL } from "../utils";

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateTaskCompletion = async () => {
    setIsCompleted(!isCompleted);
    try {
      await axios.put(`${API_URL}`, {
        id,
        name,
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`taskItem ${isCompleted && `done`}`}>
      <Checkbox
        checked={isCompleted}
        onChange={async () => updateTaskCompletion()}
        label={name}
      />
      <Typography variant="h4" align="center" paddingTop={2} paddingBottom={2}>
        {name}
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >
          <EditIcon />
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={async () => deleteTask()}
        >
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  );
};
