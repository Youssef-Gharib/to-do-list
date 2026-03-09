import "./App.css";
import ToDoList from "./Component/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TasksContext } from "./Context/context";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Arabic"],
  },
});

function App() {
  let [tasks,  setTasks] = useState([])
  return (
    <ThemeProvider theme={theme}>
      <TasksContext.Provider value={{tasks, setTasks}}>
        <div
          className="App"
          style={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#202323",
            direction: "rtl",
          }}
        >
          <ToDoList />
        </div>
      </TasksContext.Provider>
    </ThemeProvider>
  );
}

export default App;
