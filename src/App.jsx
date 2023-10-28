import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Alert,
} from "@mui/material";
import NoteAlt from "@mui/icons-material/NoteAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";

function App() {
  const [todos, setTodos] = useState([]);
   const[alert,setAlert]= useState("");
  const getText = (data) => {
    const text = data.inputdata;

    const newItem = { completed: false, text };   
   
    setTodos([...todos, newItem]);
   
  };
  const { handleSubmit, control } = useForm();

  const handleItemdone = (i) => {
    const newTodos = [...todos];
    newTodos[i].completed = !newTodos[i].completed;
    setTodos(newTodos);
  };

  const handleDeleteItem = (i) => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };

  return (
    <div>
     
      <div className=" flex bg-slate-900 p-5   ">
        <h1 className=" text-white text-5xl  ">TO-DO LIST</h1>
      </div>
      <div className=" flex gap-5  p-5">
        <form >

        <Controller
          control={control}
          name={"inputdata"}
          render={({ field }) => (
            <TextField
             
              className="w-80"
              id="outlined-basic"
              label="Todos..."
              variant="outlined"
              {...field}
              />
              )}
              />
        <Button onClick={handleSubmit(getText)} variant="contained">
          Add
        </Button>
        {alert!="" && <Alert severity="error">{alert}</Alert> }
              </form>
      </div>

      <Grid className="p-5  "  item xs={12}  md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          My Todos For today
        </Typography>
        <List className="rounded-3xl shadow-2xl">
          {todos.map((item, i) => {
            return (
              <div key={i}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      onClick={() => handleDeleteItem(i)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <NoteAlt />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      textDecoration: item.completed ? "line-through" : "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize:"20px",
                      color: "red",
                    }}
                    onClick={() => handleItemdone(i)}
                    primary={item.text}
                  
                  />
                </ListItem>
              </div>
            );
          })}
        </List>
      </Grid>
    </div>
  );
}

export default App;
