import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../App.css";

/*Dialog imports */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//hooks
import { useState, useContext, useEffect, useMemo } from "react";
import { TasksContext } from "../Context/context";

// component
import Todo from "./todo";

//others
import { v4 as id } from "uuid";

export default function ToDoList() {
  // hooks
  let [openDialog, setOpenDialog] = useState({delete:false, update:false});
  let [taskTodo, setTaskTodo] = useState(null);
  let [updateInputs, setUpdateInputs] = useState({ name: "", description: "" });
  let [inputTitle, setInputTitle] = useState("");
  let [taskType, setTaskType] = useState("all");
  const { tasks, setTasks } = useContext(TasksContext);
  // === hooks ===

  const achievedTask = useMemo(() => {
    console.log("calling completed tasks");
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const nonAchievedTask = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);

  let taskTypeSelected = tasks;
  if (taskType === "achieved") {
    taskTypeSelected = achievedTask;
  } else if (taskType === "non-achieved") {
    taskTypeSelected = nonAchievedTask;
  } else {
    taskTypeSelected = tasks;
  }

  let todo = taskTypeSelected.map((t) => {
    return <Todo key={t.id} todo={t} onDelete={handleOpenDeleteDialog} onEdit={handleUpdateClick}/>;
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storedTasks);
  }, [setTasks]);

  function handleInputTitle(e) {
    setInputTitle(e.target.value);
  }

  function handleAddTask() {
    const newTask = {
      id: id(),
      title: inputTitle,
      description: "",
      isCompleted: false,
    };

    const updateTasks = [...tasks, newTask];
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
    setInputTitle("");
  }

  function selectTaskType(e) {
    setTaskType(e.target.value);
  }

  // handle dialog
  function handleConfirmDeleteTask() {
    let updateTasks = tasks.filter((t) => {
      return t.id !== taskTodo.id;
    });
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
    handleCloseDialog();
    setTaskTodo(null);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleCloseUpdateDialog() {
    setOpenDialog(false);
  }

  function handleConfirmUpdate(){
    let updateTasks= tasks.map((t)=>{
      if(t.id === taskTodo.id){
        return{...t, 
          title:updateInputs.name, 
          description:updateInputs.description
        }
      }
      return t; 
    })

    setTasks(updateTasks)
    localStorage.setItem("tasks", JSON.stringify(updateTasks))
    handleCloseUpdateDialog()
  }

   function handleOpenDeleteDialog(t) {
    setTaskTodo(t);
    setOpenDialog({...openDialog, delete:true});
  }

   function handleUpdateClick(t) {
    setTaskTodo(t);
    setOpenDialog({...openDialog, update:true})
    setUpdateInputs({name:t.title, description:t.description})
   }


  return (
    <>
      
        {/* Dialog for Delete */}
        <Dialog
          style={{ direction: "rtl" }}
          open={openDialog.delete}
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
        {/* Dialog for Delete */}

        {/* Dialog for update */}
        <Dialog
          style={{ direction: "rtl" }}
          open={openDialog.update}
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
                setUpdateInputs({
                  ...updateInputs,
                  description: e.target.value,
                });
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
        {/* Dialog for update */}

        <Container maxWidth="sm">
          <Card
            className="tasksCard"
            sx={{
              minWidth: 275,
              border: "8px solid #e7e7e79d",
              borderRadius: "30px",
            }}
          >
            <CardContent
              sx={{ borderRadius: "20px" }}
              style={{ maxHeight: "80vh", overflowY: "scroll" }}
            >
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: "bold", color: "#48855e" }}
              >
                <Divider
                  sx={{
                    color: "#48855e",
                    alignItems: "center",
                    "&::before, &::after": {
                      borderColor: "#48855e",
                      borderTopWidth: "3px",
                      flexGrow: 1, 
                    },
                    "&::before": {
                      marginRight: "50px", 
                    },
                    "&::after": {
                      marginLeft: "50px", 
                    },
                  }}
                >
                  مهامي
                </Divider>
              </Typography>

              <Divider
                sx={{
                  color: "#48855e",
                  fontSize: "22px",
                  borderWidth: "2px",
                  borderStyle: "dashed",
                  margin: "20px 10px",
                }}
              />

              <ToggleButtonGroup
                sx={{
                  direction: "ltr",
                  margin: "10px",
                  "& .MuiToggleButton-root.Mui-selected": {
                    backgroundColor: "#48855e",
                    color: "white",
                  },

                  "& .MuiToggleButton-root.Mui-selected:hover": {
                    backgroundColor: "#3d724e",
                  },
                }}
                color="primary"
                exclusive
                aria-label="Platform"
                // onChange={}
                value={taskType}
                onChange={selectTaskType}
              >
                <ToggleButton
                  style={{
                    fontSize: "18px",
                    borderTopLeftRadius: "20px ",
                    borderBottomLeftRadius: "20px ",
                    padding: "5px 30px",
                  }}
                  value="achieved"
                >
                  المنجز
                </ToggleButton>
                <ToggleButton
                  style={{ fontSize: "18px", padding: "5px 30px" }}
                  value="non-achieved"
                >
                  غير منجز
                </ToggleButton>
                <ToggleButton
                  style={{
                    fontSize: "18px",
                    borderTopRightRadius: "20px ",
                    borderBottomRightRadius: "20px ",
                    padding: "10px 30px",
                  }}
                  value="all"
                >
                  الكل
                </ToggleButton>
              </ToggleButtonGroup>

              {/* tasks */}

              {todo}
              {/* === tasks === */}

              {/* Add new task */}
              <Grid
                container
                spacing={1}
                style={{
                  marginTop: "20px",
                  borderRadius: "20px",
                  padding: "15px",
                  backgroundColor: "#fff",
                }}
              >
                <Grid size={8}>
                  <TextField
                    onChange={handleInputTitle}
                    id="outlined-basic"
                    label=" عنوان المهمة"
                    variant="outlined"
                    value={inputTitle}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                      "& .MuiInputLabel-root": { fontSize: "20px" },
                      "& .MuiInputLabel-shrink": {
                        fontSize: "17px",
                        color: "#3d724e",
                      },
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <Button
                    onClick={handleAddTask}
                    variant="contained"
                    disabled={inputTitle === ""}
                    sx={{
                      width: "100%",
                      height: "100%",
                      fontSize: "25px",
                      backgroundColor: "#3d724e",
                      borderRadius: "20px",

                      "&.Mui-disabled": {
                        backgroundColor: "#95af9d", 
                        color: "#dae6de",
                      },
                    }}
                  >
                    اضافة
                  </Button>
                </Grid>
              </Grid>
              {/* === Add new task ===*/}
            </CardContent>
          </Card>
        </Container>
    </>
  );
}
