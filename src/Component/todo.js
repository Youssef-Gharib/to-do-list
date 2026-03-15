import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { TasksContext } from "../Context/context";

/* ICONS */
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({ todo, onDelete, onEdit }) {
  const { tasks, setTasks } = useContext(TasksContext);
  
 

  function handleCheckClick() {
    let updateTasks = tasks.map((t) => {
      if (todo.id === t.id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }
      return t;
    });
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }

  function handleDeleteButton(){
    onDelete(todo)
  }
  function handleUpdateButton(){
    onEdit(todo)
  }

  
  return (
    <div className="task">
      {/* dialog component */}

      <Card className="todo">
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={7} style={{ textAlign: "right" }}>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "400" }}>
                {todo.description}
              </Typography>
            </Grid>

            {/* ICONS */}
            <Grid
              size={5}
              style={{}}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              {/* check button */}
              <IconButton
                className="iconButtonStyle"
                style={{
                  backgroundColor: todo.isCompleted ? "#3d724e" : "#fff",
                  color: todo.isCompleted ? "#fff" : "#3d724e",
                  border: "3px solid #3d724e",
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>
              {/*=== check button ===*/}

              {/* Edit button */}
              <IconButton
                className="iconButtonStyle"
                style={{ color: "#7e8b9f", border: "3px solid" }}
                aria-label="add an alarm"
                onClick={handleUpdateButton}
              >
                <EditIcon />
              </IconButton>
              {/* === Edit button */}

              {/* Delete Button */}
              <IconButton
                className="iconButtonStyle"
                style={{ color: "#ef0707", border: "3px solid" }}
                aria-label="add an alarm"
                onClick={handleDeleteButton}
              >
                <DeleteIcon />
              </IconButton>
              {/* === Delete Button */}
            </Grid>
            {/* ===ICONS=== */}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
