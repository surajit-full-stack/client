import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Box } from "@mui/material";
import { apiStore } from "../../state/api";
import { useNavigate } from "react-router-dom";



export default function Followers() {
  const { followers } = apiStore();

  const navigate = useNavigate();
 
  return (
    <Box >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {followers.map((it) => (
          <ListItem onClick={() => navigate("/profile/" + it.userName)}>
            <ListItemAvatar>
              <Avatar src={it.profilePicture}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={it.userName}
              // secondary={moment(it.moment).fromNow()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
