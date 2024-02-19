import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import MyPostWidget from "../scenes/widgets/MyPostWidget";
import AddPostButton from "./AddPostButton";
import { useMediaQuery } from "@mui/material";

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isNonMobileScreens ? 800 : 350,
    bgcolor: "background.default",
    border: "2px solid #000",
    boxShadow: 24,
    p:isNonMobileScreens? 4:1,
    borderRadius:10
  };
  const picturePath =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROI-P-0h-3QWO0sWEnX614rD7jZdi2JkRkzA&usqp=CAU";
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <AddPostButton handleOpen={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box  sx={style}>
            <MyPostWidget picturePath={picturePath} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
