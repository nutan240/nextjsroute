"use client";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Add from "../component/Add";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CgArrowRightR } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";

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

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setSubmittedTodos(storedTodos);
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = (todo: string) => {
    const newTodo = { id: uuidv4(), text: todo };
    const updatedTodos = [...submittedTodos, newTodo];
    setSubmittedTodos(updatedTodos);
    handleClose();
    showSuccessNotification(todo);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDelete = (id: string) => {
    const updatedTodos = submittedTodos.filter((todo) => todo.id !== id);
    setSubmittedTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const showSuccessNotification = (todo: string) => {
    Swal.fire({
      icon: "success",
      title: "Todo Added!",
      text: `You have added "${todo}" to your todo list.`,
    });
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Add onClose={handleClose} onSubmit={handleSubmit} />
        </Box>
      </Modal>
      <div className=" py-5 w-[80%]">
        <h1 className="text-blue-500 text-2xl font-sans font-bold"></h1>
        <button
          className="btn text-black hover:bg-gray-900 hover:text-white w-[700px] bg-red-700 items-center"
          onClick={handleOpen}
        >
          ADD NEW TASK <IoMdAdd style={{ fontSize: "20px" }} />
        </button>

        {submittedTodos.length > 0 && (
          <div className="mt-4">
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
                sx={{ mt: 2 }}
                key={submittedTodo.id}
                className="flex items-center"
              >
                <CgArrowRightR style={{ fontSize: "20px" }} />

                <Typography
                  sx={{ pl: 3, borderBottom: "0.4px solid gray", width: "750px" }}
                >
                  {submittedTodo.text}
                </Typography>
                <RiDeleteBin5Fill
                  style={{ color: "red" , fontSize:'22px'}}
                  onClick={() => handleDelete(submittedTodo.id)}
                  className="ml-2 cursor-pointer"
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
