import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { reactionIcon } from "../scenes/widgets/PostWidget";
import moment from "moment";
import { Reactors } from "../Types";
import { useEffect, useState } from "react";
import { apiStore } from "../state/api";

export default function RactorsTab({ postId }: { postId: number }) {
  const [reactors, setReactors] = useState<Array<Reactors>>([]);
  const { getReactors } = apiStore();

  useEffect(() => {
   
    getReactors(postId).then((data) => {
      setReactors(data);
    });
  }, [postId]);

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {reactors.map(({ profilePicture, type, userName, createdAt }) => {
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
