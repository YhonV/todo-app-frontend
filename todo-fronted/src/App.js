import React, { useState, useEffect } from "react";
import { getTask, createTask, updateTask, deleteTask } from "./Api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
  Container,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTask()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) =>
        console.error("Hubo un error al cargar las tareas", error)
      );
  }, []);

  const handleNewTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      createTask(newTask)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]);
          setNewTask("");
        })
        .catch((error) => console.error("Error al crear la tarea", error));
    }
  };

  const handleTaskCompleted = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask(id, task.title, !task.done)
        .then(() => {
          setTasks(
            tasks.map((task) =>
              task.id === id ? { ...task, done: !task.done } : task
            )
          );
        })
        .catch((error) => console.error("Error al actualizar la tarea", error));
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error al eliminar la tarea", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          style={{
            fontFamily: "'Roboto', sans-serif", // Cambia la fuente (asegúrate de que la fuente esté importada o disponible)
            fontSize: "2.5rem", // Ajusta el tamaño de la fuente
            color: "#3f51b5", // Cambia el color del texto
            textShadow: "1px 1px 5px rgba(0,0,0,0.2)", // Añade una sombra sutil para dar profundidad
          }}
        >
          Todo App
        </Typography>
        <form onSubmit={handleNewTask} style={{ marginBottom: "2rem" }}>
          <TextField
            fullWidth
            label="New Task"
            variant="outlined"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Type your new task"
            style={{ marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
            fullWidth
          >
            Add Task
          </Button>
        </form>
        <TableContainer component={Paper} elevation={3}>
          <Table aria-label="tasks table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>
                    <span
                      style={{
                        textDecoration: task.done ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={task.done}
                      onChange={() => handleTaskCompleted(task.id)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteTask(task.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
