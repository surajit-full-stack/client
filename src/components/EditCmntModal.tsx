import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { apiStore } from "../state/api";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

type EditProps = {
  prevComment: string;
  commentId: number;
  hoverEffect: any;
  pId: number;
};

export default function EditCmntModal({
  hoverEffect,
  prevComment,
  commentId,
  pId,
}: EditProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [text, setText] = React.useState(prevComment);
  const { editComment } = apiStore();

  return (
    <div>
      <Typography onClick={handleOpen} sx={hoverEffect}>
        edit
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            // id="outlined-multiline-flexible"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            multiline
            maxRows={4}
          />
          <Button
            onClick={() =>
              editComment(commentId, text, pId).then(() => handleClose())
            }
          >
            update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
