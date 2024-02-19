import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { reactionIcon } from "../scenes/widgets/PostWidget";
import moment from "moment";
import { Reactors } from "../Types";

export default function RactorsTab({ data }: { data: Array<Reactors> }) {
  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {data.map(({ profilePicture, type, userName, createdAt }) => {
        return (
          <ListItem
            sx={{ p: 1 }}
            key={userName}
            secondaryAction={reactionIcon[type]}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={profilePicture} />
              </ListItemAvatar>
              <ListItemText
                id={userName}
                primary={userName}
                secondary={moment(createdAt).fromNow()}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
