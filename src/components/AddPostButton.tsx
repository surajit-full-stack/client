import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { Fab } from "@mui/material";
type AddPostButtonProps = {
  handleOpen: () => void;
};

export default function AddPostButton({ handleOpen }: AddPostButtonProps) {
  return (
    <Tooltip
      onClick={() => handleOpen()}
      title="Add post"
      sx={{ position: "fixed", bottom: 20, left: 20 }}
    >
      <Fab size="small" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}
