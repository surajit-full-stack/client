import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { theState } from "../../state";
import { apiStore } from "../../state/api";
import { PostNotification } from "../../Types";
import { ReactionType, reactionIcon } from "../widgets/PostWidget";

export default function Notifications() {
  const { resetNotification, newNotification } = theState();
  const { notifications, getNotification } = apiStore();
  const [allnotification, setAllnotification] = React.useState<
    Array<PostNotification>
  >([]);
  React.useEffect(() => {
    if (newNotification.length === 0) {
      getNotification().then((data) => {
        setAllnotification(data);
      });
    } else {
      setAllnotification([...newNotification, ...notifications]);
      resetNotification();
    }
  }, []);
  console.log("allnotification", allnotification);
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {allnotification.map(
        ({ senderName, type, caption }: PostNotification, ind) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  type === "post"
                    ? `${senderName} added a new post`
                    : type === "react"
                    ? `${senderName} reacted to  your post`
                    : null
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {type === "post"
                        ? caption
                        : type === "react"
                        ? reactionIcon[caption as ReactionType]
                        : null}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        )
      )}
    </List>
  );
}
