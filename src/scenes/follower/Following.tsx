import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Button } from "@mui/material";
import { apiStore } from "../../state/api";
import { useNavigate } from "react-router-dom";

export default function Followings() {
  const { followings, unfollow } = apiStore();

  const navigate = useNavigate();

  return (
    <Box>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {followings.map((it) => (
          <ListItem onClick={() => navigate("/profile/" + it.userName)}>
            <ListItemAvatar>
              <Avatar src={it.profilePicture}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={it.userName} />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                unfollow(it.userId, it.userName)
              }}
              size="small"
            >
              unfollow
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
