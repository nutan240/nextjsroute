import { Button, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from 'react'; 

interface AddProps {
  onClose: () => void;
  onSubmit: (todo: string) => void; 
}

const Add: React.FC<AddProps> = ({ onClose, onSubmit }) => {
  const [text, setText] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(text);
    setText("");
    onClose(); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <div>
        <IconButton
          sx={{ position: "absolute", top: 0, right: "0" }}
          onClick={onClose} 
        >
          <CloseIcon />
        </IconButton>
        <Stack sx={{width:'100%'}} direction={'row'}>
          <form onSubmit={handleSubmit}>
            <Stack sx={{

            }}>
            <TextField
              id="filled-basic"
              label="Enter your todos"
              variant="filled"
              type="text"
              value={text} // Bind the value of the input field to the state
              onChange={handleChange} // Call handleChange when input changes
            />
            <Button sx={{background:'pink' , 
        width:'340px', marginTop:'17px'
        }} type="submit">Add</Button>
            </Stack>
          </form>
        </Stack>
      </div>
    </>
  );
};

export default Add;
