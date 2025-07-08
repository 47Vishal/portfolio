// app/components/Auth/ModalWrapper.jsx
"use client";
import React from "react";
import { Modal, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "#121212",
  border: "2px solid #333",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  color: "#fff",
};

const ModalWrapper = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;
