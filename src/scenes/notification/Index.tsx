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
import moment from "moment";

export default function Notifications() {
  const { resetNotification, newNotification, following } = theState();
  const { notifications, getNotification } = apiStore();
  const [allnotification, setAllnotification] = React.useState<
    Array<PostNotification>
  >([]);
  React.useEffect(() => {
    getNotification(following).then((data) => {
      setAllnotification(data);
    });
    if (newNotification.length !== 0) {
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
        ({ sourceUserName, type, caption, time,sourceDp }: PostNotification) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={sourceDp} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  type === "react"
                    ? reactionIcon[caption as ReactionType]
                    : caption
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {sourceUserName}
                      {` — `}
                      {type === "post"
                        ? ` added a new post`
                        : type === "react"
                        ? ` reacted to  your post`
                        : type === "comment"
                        ? ` commented on your post`
                        : type === "reply"
                        ? ` replied`
                        : null}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    > {moment(time).fromNow()}</Typography>
                   
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
