import { ChatBubbleOutlineOutlined, ShareOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  OutlinedInput,
  Popover,
  Skeleton,
  Typography,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { RefObject, useEffect, useRef, useState } from "react";
import { colorTokens } from "../../theme";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { apiStore } from "../../state/api";
import DrawerComp from "../../components/Drawer";
import SendIcon from "@mui/icons-material/Send";
import { theState } from "../../state";
import CommentBody from "../../components/CommentBody";
import ReactionTeam from "../../components/ReactionTeam";
import { replyState } from "../../state/reply";
import RactorsTab from "../../components/ReactorsTab";
import { Reactors } from "../../Types";
type PostWidget = {
  postId: number;
  name: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  CreatedAt: string;
  comments_count: number;
  reaction_count: number;
  visibility: "public" | "private" | "follower";
  reactionType: ReactionType;
  author_id:number;
};
export type ReactionType = "wow" | "like" | "sad" | "angry" | "hate" | "love";
type CommentTabProps = {
  postId: number;
  AuthorId: string;
};

export const reactionIcon: Record<ReactionType, any> = {
  like: <ThumbUpIcon sx={{ color: "#0c96f2" }} />,
  wow: <>😲</>,
  love: <>❤️</>,
  sad: <>😢</>,
  angry: <>🤬</>,
  hate: <>🤮</>,
};
export const reactions = Object.entries(reactionIcon);
const medium = colorTokens.grey[400];
const PostWidget = ({
  name,
  description,
  picturePath,
  userPicturePath,
  CreatedAt,
  visibility,
  comments_count,
  reaction_count,
  reactionType,
  postId,
  author_id
}: PostWidget) => {
  const [myReact, setMyReact] = useState<ReactionType | null>(reactionType);
  const [postReactCount, setPostReactCount] = useState<number>(reaction_count);
  const [impUser, setImpUser] = useState<string | null>(null);

  const { addReactionPost, removeReactionPost, getIPreactor } = apiStore();

  //change number of likes

  //?MUI Popover
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const addReact = (type: ReactionType) => {
    if (type == myReact) {
      setMyReact(null);
      setPostReactCount((prev) => prev - 1);
      removeReactionPost(postId);
      handleClose();
      return;
    }
    setMyReact(type);
    setPostReactCount((prev) => prev + 1);
    addReactionPost(postId, type,author_id);
    handleClose();
  };

  const Reactions = () => {
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <ReactionTeam reactions={reactions} addReact={addReact} />
      </Popover>
    );
  };

  const [reactors, setReactors] = useState<Array<Reactors>>([]);
  const { getReactors } = apiStore();
  useEffect(() => {
    getIPreactor(postId).then((userName:any) => {
      if (postReactCount > 0 && !userName) {
        return setImpUser("you");
      }

      setImpUser(userName);
    });
    getReactors(postId).then((data) => {
      setReactors(data);
    });
  }, [postReactCount]);
  return (
    <WidgetWrapper mb="2rem">
      <Friend
        name={name}
        subtitle={moment(CreatedAt).fromNow() + " : " + visibility}
        userPicturePath={userPicturePath}
        withMenu
      />
      <Reactions />
      <Typography sx={{ mt: "1rem" }}>{description}</Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <DrawerComp
        side="bottom"
        drawerChild={<RactorsTab data={reactors} />}
        DrawerButton={
          <Typography color={medium} variant="subtitle1" sx={{ mx: "0.25rem" }}>
            {postReactCount >= 2
              ? `${impUser} & ${postReactCount - 1} others`
              : postReactCount == 0
              ? ""
              : `${impUser} liked`}
          </Typography>
        }
      />

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/**Likes section */}
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {myReact ? reactionIcon[myReact] : <ThumbUpOffAltIcon />}
            </IconButton>
          </FlexBetween>

          {/**Comment section */}
          <FlexBetween>
            <DrawerComp
              side="bottom"
              DrawerButton={<ChatBubbleOutlineOutlined />}
              drawerChild={<CommentTab AuthorId={name} postId={postId} />}
            />
            <Typography>{comments_count}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/**Actual comments */}
    </WidgetWrapper>
  );
};

const CommentTab = ({ postId, AuthorId }: CommentTabProps) => {
  const { getComments, comments, commentsLoading, addReply } = apiStore();
  const { userData } = theState();
  const {
    isReplying,
    replyTo,
    setReplyTo,
    commentId: repcmId,
    postId: reppId,
  } = replyState();
  //console.log("replyState()", replyState());
  const { addComment } = apiStore();
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [cmntText, setCmntText] = useState("");
  useEffect(() => {
    getComments(postId);
  }, [postId]);

  useEffect(() => {
    if (!isReplying) {
      setCmntText("");
      setReplyTo("");
      return;
    }
    inputRef?.current?.classList.add("Mui-focused");
    inputRef?.current?.querySelector("input")?.focus();
    setCmntText("@" + replyTo + " ");
    //console.log("re;", repcmId, reppId);
  }, [isReplying]);

  return (
    <Box
      sx={{
        paddingTop: commentsLoading ? 0 : 1,
      }}
      mt="0.5rem"
    >
      <Box sx={{ height: "60vh", overflow: "scroll" }}>
        {commentsLoading && (
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={37}
                height={37}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={13}
                width="30%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={
              <>
                <Skeleton animation="wave" height={10} width="70%" />
                <Skeleton animation="wave" height={10} width="40%" />
              </>
            }
          />
        )}
        {comments.map(
          ({
            CommentID,
            CommentText,
            userName,
            Timestamp,
            profilePicture,
            replycount,
            reactionCount,
            ParentCommentID,
            replyTo,
            type,
          }) => {
            return (
              <CommentBody
                key={CommentID}
                commentData={{
                  CommentID,
                  CommentText: CommentText!,
                  userName,
                  Timestamp,
                  profilePicture,
                  AuthorId,
                  replycount,
                  reactionCount,
                  isReply: false,
                  ParentCommentID,
                  replyTo,
                  postId,
                  type,
                }}
              />
            );
          }
        )}
      </Box>
      <Box>
        <OutlinedInput
          id="outlined-adornment-weight"
          fullWidth
          ref={inputRef}
          value={cmntText}
          onChange={(e) => {
            setCmntText(e.target.value);
          }}
          endAdornment={
            <IconButton disabled={cmntText === ""}>
              <SendIcon
                onClick={() => {
                  if (isReplying) {
                    const extReplyTo = cmntText.split(" ");
                    extReplyTo.shift();
                    const onlyText: string = extReplyTo.join(" ");
                    addReply(
                      repcmId as number,
                      onlyText,
                      replyTo,
                      reppId as number
                    ).then(() => {
                      getComments(postId);
                    });

                    setCmntText("");
                  } else {
                    addComment(postId, cmntText);
                    setCmntText("");
                  }
                }}
                sx={{
                  mr: 2,
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.5) rotate(-20deg)",
                    transition: "transform 0.5s",
                    color: "#4d91ff",
                  },
                }}
              />
            </IconButton>
          }
          startAdornment={
            <Avatar sx={{ mr: 2 }} src={userData.profilePicture} />
          }
        />
      </Box>
    </Box>
  );
};
export default PostWidget;
