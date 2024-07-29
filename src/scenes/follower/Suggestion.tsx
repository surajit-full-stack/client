import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Button } from "@mui/material";
import { apiStore } from "../../state/api";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";
export const Suggestion = () => {
  const { followersSuggestion, follow } = apiStore();

  const navigate = useNavigate();

  return (
    <Box>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {followersSuggestion.map((it) => (
          <ListItem
            onClick={() => {
              navigate("/profile/" + it.userName);
            }}
          >
            <ListItemAvatar>
              <Avatar src={it.profilePicture}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={it.userName} />
            <Button
              onClick={(e) => {
                e.stopPropagation();
             
                follow(it.userId, it.userName);
              }}
              size="small"
            >
              <PersonAddAlt1Icon />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
