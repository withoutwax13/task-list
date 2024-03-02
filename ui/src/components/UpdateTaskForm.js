import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { API_URL } from "../utils";

const UpdateTaskForm = ({
  isDialogOpen,
  setIsDialogOpen,
  task,
  fetchTasks,
}) => {
  const { id, name, completed } = task;
  const [taskName, setTaskName] = useState(name);
  const updateTask = async () => {
    try {
      await axios.put(`${API_URL}`, {
        id,
        name: taskName,
        completed,
      });
      await fetchTasks();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isDialogOpen}>
      <div>
        <TextField
          size="small"
          variant="outlined"
          label="Task"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={async () => updateTask}
          disabled={taskName.length === 0 || taskName === name}
        >
          <CheckIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsDialogOpen(false)}
        >
          <CloseIcon />
        </Button>
      </div>
    </Dialog>
  );
};

export default UpdateTaskForm;
