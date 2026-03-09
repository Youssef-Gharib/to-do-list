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

//hooks
import { useState, useContext, useEffect } from "react";
import { TasksContext } from "../Context/context";

// component
import Todo from "./todo";

//others
import { v4 as id } from "uuid";

export default function ToDoList() {
  // hooks

  let [inputTitle, setInputTitle] = useState("");
  let [taskType, setTaskType] = useState("all");
  const { tasks, setTasks } = useContext(TasksContext);
  // === hooks ===
  
  const achievedTask = tasks.filter((t)=> {return t.isCompleted}) ; 
  const nonAchievedTask = tasks.filter((t)=> {return !t.isCompleted}) ; 
  let taskTypeSelected =tasks; 
 

 
  if(taskType==="achieved"){
    taskTypeSelected = achievedTask; 
  }
  else if(taskType==="non-achieved"){
    taskTypeSelected = nonAchievedTask; 
  }
  else{
    taskTypeSelected = tasks; 
  }

  let todo = taskTypeSelected.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [] ;
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

  function selectTaskType(e){
    setTaskType(e.target.value)
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card
          className="tasksCard"
          sx={{
            minWidth: 275,
            border: "10px solid #fffdf7",
            borderRadius: "30px",
          }}
          style={{}}
        >
          <CardContent
            sx={{ border: "5px solid #96d6ad", borderRadius: "20px" }}
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
                    flexGrow: 1, // يخلي الخط ممتد بنسبة متساوية
                  },
                  "&::before": {
                    marginRight: "50px", // مسافة بين النص والخط اليسار
                  },
                  "&::after": {
                    marginLeft: "50px", // مسافة بين النص والخط اليمين
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
                    "& .MuiInputLabel-shrink": { fontSize: "17px" },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={handleAddTask}
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "25px",
                    backgroundColor: "#569f71",
                    borderRadius: "20px",
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
