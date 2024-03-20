"use client"
import { Box, Divider, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Add from "../component/Add";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CgArrowRightR } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import { MdEditNote } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const DashboardPage = () => {
  const [text, setText] = useState<string>("");
  const [submittedTodos, setSubmittedTodos] = useState<
    { id: string; text: string }[]
  >([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setSubmittedTodos(storedTodos);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditId("");
    setText("");
  };

  const handleOpen = () => setOpen(true);

  const handleSubmit = (todo: string) => {
    if (!todo.trim()) {
      toast.error("Todo cannot be empty!");
      return;
    }

    if (editMode) {
      const updatedTodos = submittedTodos.map((item) =>
        item.id === editId ? { ...item, text: todo } : item
      );
      setSubmittedTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setEditMode(false);
      setEditId("");
      setText("");
      toast.success("Todo Updated!");
    } else {
      const newTodo = { id: uuidv4(), text: todo };
      const updatedTodos = [...submittedTodos, newTodo];
      setSubmittedTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      toast.success("Todo Added!");
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    const updatedTodos = submittedTodos.filter((todo) => todo.id !== id);
    setSubmittedTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    toast.error("Todo deleted");
  };

  const handleEdit = (id: string, text: string) => {
    setEditMode(true);
    setEditId(id);
    setText(text);
    handleOpen();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <ToastContainer />
      <Box>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Add onClose={handleClose} onSubmit={handleSubmit} text={text} editMode={editMode} />
          </Box>
        </Modal>
      </Box>
      <div className=" py-5 w-[90%]  min-w-[500px] mx-auto">
        <h1 className="text-blue-500 text-2xl font-sans font-bold"></h1>
        <button
          className="btn text-black hover:bg-gray-900 hover:text-white w-[90%] min-w-[300px] bg-red-700 items-center"
          onClick={handleOpen}
        >
          ADD NEW TASK <IoMdAdd style={{ fontSize: "20px" }} />
        </button>

        {submittedTodos.length > 0 && (
          <div className="mt-4 ">
            <Typography
              sx={{
                color: "darkgreen",
                fontStyle: "italic",
                fontSize: "25px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Your Entered Task
            </Typography>
            {submittedTodos.map((submittedTodo) => (
              <Box
                sx={{ mt: 2,width:"100%" }}
                key={submittedTodo.id}
                className="flex items-center"
              >
                <CgArrowRightR style={{ fontSize: "20px" }} />

                <Typography
                  sx={{ pl: 3, borderBottom: "0.4px solid gray", width: "80%" , wordBreak:'break-all' , minWidth:'400px' }}
                >
                  {submittedTodo.text}
                </Typography>
                <RiDeleteBin5Fill
                  style={{ color: "red" , fontSize:'25px' }}
                  onClick={() => handleDelete(submittedTodo.id)}
                  className="ml-2 cursor-pointer"
                />
                <MdEditNote  
                 style={{ color: "darkblue" , fontSize:'35px' , marginLeft:'10px' , cursor:'pointer'}}
                 onClick={() => handleEdit(submittedTodo.id, submittedTodo.text)}
                />
                <Divider />
              </Box>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
