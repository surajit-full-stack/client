import { Box } from "@mui/material";
import CommentBody from "./CommentBody";
import { apiStore } from "../state/api";
import { useEffect, useState } from "react";
import { Comment } from "../Types";

type Props = {
  RootCommentId: number;
  AuthorId: string;
  postId: number;
};
const ReplyTab = ({ RootCommentId, AuthorId, postId }: Props) => {
  const { getReplies } = apiStore();
  const [replies, setReplies] = useState<Array<Comment>>([]);
  useEffect(() => {
    getReplies(RootCommentId, (data, err) => {
      if (err) return;
      setReplies(data);
    });
  }, [RootCommentId]);
  //console.log("replies", replies);
  return (
    <Box
      sx={{
        marginLeft: 2,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {replies.map(
        ({
          CommentText,
          userName,
          Timestamp,
          profilePicture,
          replycount,
          replyTo,
          type,
          CommentID,
          reactionCount
        }) => {
          return (
            <Box sx={{ marginLeft: 2, marginTop: 0, display: "flex" }}>
              <div
                style={{
                  borderLeft: "3px solid",
                  width: "10px",
                  borderBottom: "3px solid",
                  height: "35px",
                  borderRadius: " 0 5px",
                }}
              ></div>
              <CommentBody
                commentData={{
                  CommentID,
                  CommentText,
                  userName,
                  Timestamp,
                  profilePicture,
                  AuthorId,
                  replycount,
                  isReply: true,
                  ParentCommentID: RootCommentId,
                  replyTo,
                  postId,
                  type,
                  reactionCount
                }}
              />
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default ReplyTab;
