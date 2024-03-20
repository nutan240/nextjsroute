import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./add.css";

type AddProps = {
  onClose: () => void;
  onSubmit: (todo: string) => void;
  text: string;
  editMode: boolean;
};

const Add: React.FC<AddProps> = ({ onClose, onSubmit, text, editMode }) => {
  const [todo, setTodo] = useState<string>(text);

  useEffect(() => {
    setTodo(text);
  }, [text, editMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(todo);
  };

  return (
    <Box>
      <IconButton
        sx={{ position: "absolute", top: 0, right: "0" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <TextField
      sx={{width:'350px'}}
        id="filled-basic"
        label={editMode ? "" : "Enter your todos"}
        variant="filled"
        type="text"
        value={todo}
        onChange={handleChange}
      />
      <Button
        classes={{ root: "custom-button" }}
        variant="contained"
        onClick={handleSubmit}
      >
        {editMode ? "Update" : "Submit"}
      </Button>
    </Box>
  );
};

export default Add;
