import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = ({ fetchTasks }) => {
  const [taskText, setTaskText] = useState("");
  const addTask = async () => {
    try {
      await axios.post(API_URL, {
        name: taskText,
        completed: false,
      });
      await fetchTasks();
      setTaskText("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Typography variant="h2" align="center" paddingTop={2} paddingBottom={2}>
        My Task List
      </Typography>
      <div>
        <Button
          disabled={taskText.length === 0}
          onClick={async () => {
            addTask();
          }}
        >
          <AddIcon />
        </Button>
        <TextField
          id="outlined-basic"
          label="Add Task"
          variant="outlined"
          size="small"
          onChange={(e) => setTaskText(e.target.value)}
          value={taskText}
        />
      </div>
    </div>
  );
};
