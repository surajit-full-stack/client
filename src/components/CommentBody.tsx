import { MouseEvent, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Comment, Reactors } from "../Types";
import { colorTokens } from "../theme";
import SeeMoreComment from "./SeeMoreComment";
import moment from "moment";
import { theState } from "../state";
import {
  ReactionType,
  reactionIcon,
  reactions,
} from "../scenes/widgets/PostWidget";
import ReactionTeam from "./ReactionTeam";
import ReplyTab from "./ReplyTab";
import { replyState } from "../state/reply";
import { apiStore } from "../state/api";
import EditCmntModal from "./EditCmntModal";
import Swal from "sweetalert2";
import DrawerComp from "./Drawer";
import RactorsTab from "./ReactorsTab";

const medium = colorTokens.grey[400];
const mediumhover = colorTokens.grey[400];
const hoverEffect = {
  p: 1,
  "&:hover": {
    background: mediumhover,
  },
};
const CommentBody = ({
  commentData: {
    CommentID,
    CommentText,
    userName,
    Timestamp,
    profilePicture,
    AuthorId,
    replycount,
    reactionCount,
    isReply,
    replyTo,
    postId,
    type: Type,
    ParentCommentID,
  },
}: {
  commentData: Pick<
    Comment,
    | "CommentID"
    | "CommentText"
    | "userName"
    | "Timestamp"
    | "profilePicture"
    | "replycount"
    | "ParentCommentID"
    | "replyTo"
    | "type"
    | "reactionCount"
  > & {
    AuthorId: string;
    isReply: boolean;
    postId: number;
  };
}) => {
  const {
    userData: { userName: myuserId },
  } = theState();
  const {
    setIsReplying: setStateReplyStat,
    setReplyTo,
    setReplyData,
  } = replyState();

  const { reactComment, unReactComment, deleteComment, getCommentReactions } =
    apiStore();
  //console.log("ParentCommentID", ParentCommentID, CommentText);
  //comment more tab
  const [anchorEl, setAnchorEl] = useState<
    HTMLButtonElement | HTMLSpanElement | null
  >(null);
  const [anchorReaction, setAnchorElR] = useState<HTMLSpanElement | null>(null);
  const handleClick = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLSpanElement>,
    body: string
  ) => {
    if (body == "more") setAnchorEl(event.currentTarget);
    if (body == "reaction") setAnchorElR(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElR(null);
  };
  const openMore = Boolean(anchorEl);
  const openReact = Boolean(anchorReaction);
  const id = openMore || openReact ? "simple-popover" : undefined;

  //Reply handle
  const [isReplying, setIsReplying] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [reactionData, setReactionData] = useState<Array<Reactors>>([]);
  const [glitering, setGlitering] = useState(6);
  const [replyCnt, setReplyCnt] = useState(replycount);
  const [type, setType] = useState(Type);

  useEffect(() => {
    setStateReplyStat(isReplying);
  }, [isReplying]);
  useEffect(() => {
    setReplyCnt(replycount);
  }, [replycount]);
  useEffect(() => {
    if (moment().diff(moment(Timestamp), "second") < 10) {
      setGlitering(24);
      setTimeout(() => {
        setGlitering(6);
      }, 2000);
    }
    getCommentReactions(CommentID).then((data) => {
      setReactionData(data);
    });
  }, []);

  const highlightReaction: Record<ReactionType, number> = {
    like: 0,
    angry: 0,
    hate: 0,
    love: 0,
    sad: 0,
    wow: 0,
  };
  const [hlReaction, setHlReaction] = useState<[ReactionType, number][]>([]);
  useEffect(() => {
    reactionData.forEach((it) => {
      if (it.type == "like") highlightReaction.like++;
      if (it.type == "angry") highlightReaction.angry++;
      if (it.type == "hate") highlightReaction.hate++;
      if (it.type == "love") highlightReaction.love++;
      if (it.type == "sad") highlightReaction.sad++;
      if (it.type == "wow") highlightReaction.wow++;
    });
    let arr = Object.entries(highlightReaction)
      .map(([key, value]) => [key, value] as [ReactionType, number])
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .filter((it) => it[1] != 0)
      .slice(0, 3);

    setHlReaction(arr);
  }, [reactionData]);

  const addReact = (react: ReactionType) => {
    //console.log("CommentID", CommentID);
    setType(react);
    if (type === react) {
      unReactComment(CommentID).finally(() => {
        handleClose();
      });
      return;
    }
    reactComment(react, CommentID).finally(() => {
      handleClose();
    });
    return;
  };
  const delComment = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(CommentID, postId, ParentCommentID);
      }
    });
  };
  const ft = moment(Timestamp).fromNow(true);

  return (
    <Box key={CommentID}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: isReply ? 0 : 1,
          color: medium,
          m: "0.5rem",
          pl: "1rem",
          marginY: isReply ? "0.5rem" : "2rem",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={profilePicture}
          sx={{ width: 40, height: 40, marginRight: 1, marginY: 0 }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", m: 0, pt: 0 }}>
          <Paper
            sx={{
              padding: 2,
              width: "13rem",

              mr: 5,
            }}
            elevation={glitering}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bolder" }}>{userName}</span>{" "}
              {/* edit delete comment */}
              <IconButton
                aria-describedby={id}
                onClick={(e) => handleClick(e, "more")}
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                id={id}
                open={openMore}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                {myuserId === userName ? (
                  <>
                    {" "}
                    <EditCmntModal
                      hoverEffect={hoverEffect}
                      prevComment={CommentText}
                      commentId={CommentID}
                      pId={postId}
                    />
                    <Typography onClick={delComment} sx={hoverEffect}>
                      delete
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography sx={hoverEffect}>report</Typography>{" "}
                    <Typography sx={hoverEffect}>hide</Typography>
                    {AuthorId === myuserId && (
                      <Typography sx={hoverEffect}>delete</Typography>
                    )}
                  </>
                )}
              </Popover>
            </Box>

            <Box>
              <SeeMoreComment
                comment={`${replyTo ? "@" + replyTo : ""} ` + CommentText}
              />
            </Box>
          </Paper>
          <Box>
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              {ft
                .replace(
                  `${ft.slice(0, 2) == "an" ? "an" : ft[0] == "a" ? "a" : "1"}`,
                  "1"
                )
                .split(" ")
                .map((it, ind) => {
                  if (it.includes("minute")) return "m";
                  if (it == "few") {
                    return;
                  }
                  if (ind == 1 || ind == 2) return it[0];
                  return it;
                })}
              <span
                onClick={() => {
                  if (!isReplying) {
                    setReplyTo(userName);
                    setReplyData(ParentCommentID || CommentID, postId);
                  } else {
                    //console.log("cancel");
                    setReplyTo("");
                    setReplyData(null, null);
                  }
                  setIsReplying(!isReplying);
                }}
              >
                {isReplying ? "cancel" : "reply"}
              </span>

              <span className="reactbtn">
                <div className="count">
                  {hlReaction.map((it) => {
                    return (
                      <span className="Rchild">{reactionIcon[it[0]]}</span>
                    );
                  })}

                  <DrawerComp
                    DrawerButton={
                      <span style={{ fontSize: 15 }}>
                        {reactionCount > 0 ? reactionCount : null}
                      </span>
                    }
                    drawerChild={<RactorsTab postId={postId} />}
                    side="bottom"
                  />
                </div>
                <div onClick={(e) => handleClick(e, "reaction")}>
                  {type ? reactionIcon[type] : "like"}
                </div>
              </span>

              <Popover
                id={id}
                open={openReact}
                anchorEl={anchorReaction}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <ReactionTeam reactions={reactions} addReact={addReact} />
              </Popover>
            </Box>

            <>
              {replycount > 0 && (
                <IconButton onClick={() => setViewReply(true)}>
                  <KeyboardReturnIcon sx={{ transform: "scaleX(-1)" }} />{" "}
                  <span style={{ fontSize: "15px", marginLeft: 5 }}>
                    {replyCnt} {replyCnt > 1 ? "replies" : "reply"}
                  </span>
                </IconButton>
              )}
              {viewReply && (
                <ReplyTab
                  AuthorId={AuthorId}
                  postId={postId}
                  RootCommentId={CommentID}
                />
              )}
            </>
          </Box>
        </Box>
      </Typography>
    </Box>
  );
};

export default CommentBody;
