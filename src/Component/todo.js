import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { TasksContext } from "../Context/context";
import TextField from "@mui/material/TextField";

/* ICONS */
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/*Dialog imports */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo }) {
  let [openDialog, setOpenDialog] = useState(false);
  let [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  let [updateInputs, setUpdateInputs] = useState({ name: "", description: "" });
  const { tasks, setTasks } = useContext(TasksContext);

  function handleDeleteButton() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleCloseUpdateDialog() {
    setOpenUpdateDialog(false);
  }

  function handleCheckClick() {
    let updateTasks = tasks.map((t) => {
      if (todo.id === t.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }

  function handleConfirmDeleteTask() {
    let updateTasks = tasks.filter((t) => {
      return t.id !== todo.id;
    });
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }

  function handleEditClick() {
    setUpdateInputs({ name: todo.title, description: todo.description });
    setOpenUpdateDialog(true);
  }

  function handleConfirmUpdate() {
    const updateTask = tasks.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updateInputs.name,
          description: updateInputs.description,
        };
      }
      return t;
    });
    setTasks(updateTask);
    handleCloseUpdateDialog();
        localStorage.setItem("tasks", JSON.stringify(updateTask));

  }

  return (
    <div className="task">
      {/* dialog component */}
      {/* Dialog for Delete */}
      <Dialog
        style={{ direction: "rtl" }}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"انت متأكد فعلا انك عاوز تمسح المهمة دي؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لو دوست علي زر حذف سيتم حذف المهمة تماما ومش هتقدر ترجعها تاني
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>اغلاق</Button>
          <Button
            onClick={handleConfirmDeleteTask}
            style={{ color: "red" }}
            autoFocus
          >
            نعم فم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Edit */}
      <Dialog
        style={{ direction: "rtl" }}
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
      >
        <DialogTitle> عدل مهمتك </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label=" اسم المهمة "
            type="text"
            fullWidth
            variant="standard"
            value={updateInputs.name}
            onChange={(e) =>
              setUpdateInputs({ ...updateInputs, name: e.target.value })
            }
            sx={{
              "& .MuiInputLabel-root": {
                right: 0,
                left: "auto",
                transformOrigin: "top right",
              },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="Description"
            label=" الوصف "
            type="text"
            fullWidth
            variant="standard"
            value={updateInputs.description}
            onChange={(e) => {
              setUpdateInputs({ ...updateInputs, description: e.target.value });
            }}
            sx={{
              "& .MuiInputLabel-root": {
                right: 0,
                left: "auto",
                transformOrigin: "top right",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>اغلاق</Button>
          <Button onClick={handleConfirmUpdate}>تم</Button>
        </DialogActions>
      </Dialog>
      {/* === dialog component === */}

      <Card
        className="todo"
        
      >
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
                  backgroundColor: todo.isCompleted ? "#569f71" : "#fff",
                  color: todo.isCompleted ? "#fff" : "#569f71",
                  border: "3px solid #569f71",
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
                onClick={handleEditClick}
              >
                <EditIcon />
              </IconButton>
              {/* === Edit button */}

              {/* Delete Button */}
              <IconButton
                className="iconButtonStyle"
                style={{ color: "#d50808e2", border: "3px solid" }}
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
