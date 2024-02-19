import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import ImageInput from "../../components/ImageInput";
import ImagePreview from "../../components/ImagePreview";
import { http } from "../../Axiox";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { apiStore } from "../../state/api";

type MyPostWidgetProp = {
  picturePath: string;
};

const MyPostWidget = ({ picturePath }: MyPostWidgetProp) => {
  //used to determine if the user clicks the image button to drop an image or not
  const [isImage, setIsImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  //actual image

  //post content
  const [post, setPost] = useState({
    post_caption: "",
    post_media_link: "",
    visibility: "public",
  });

  const [canPost, setCanPost] = useState<boolean>(false);
  const { palette } = useTheme();
  const { userName='' } = useParams();
  const { getPosts } = apiStore();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const medium = palette.primary.main;

  //handles post api call
  const getImageUrl = (url: string | undefined, loading: boolean) => {
    if (loading) toast.loading("uploading...", { position: "bottom-center" });
    else toast.dismiss();
    if (url) {
      setImagePreview(true);
      toast.success("photo uploaded", {
        position: "bottom-center",
        duration: 1500,
      });
      setPost((prev: any) => {
        return { ...prev, post_media_link: url };
      });
    }
  };
  const handlePost = (e: any) => {
    e.preventDefault();
    toast.loading("posting...");
    http
      .post(
        "add-post",
        { ...post, isDp: false },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setTimeout(() => {
          toast.success("Posted!");
        }, 2000);
        setIsImage(false);
        setImagePreview(false);
        setPost({
          post_caption: "",
          post_media_link: "",
          visibility: "public",
        });
        getPosts(userName);
      })
      .catch((err) => {
        //console.log("error", err);
        toast.error(err?.message || "Something went wrong! try again!");
      })
      .finally(() => {
        toast.dismiss();
      });
  };
  useEffect(() => {
    if (post.post_caption != "" || post.post_media_link != "") setCanPost(true);
    if (post.post_caption === "" && post.post_media_link === "")
      setCanPost(false);
  }, [post]);
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind?"
          // ***setPost()*** changes local state
          // dont get confused with setPosts - changes global state
          onChange={(e) =>
            setPost((prev: any) => {
              return { ...prev, post_caption: e.target.value };
            })
          }
          value={post.post_caption}
          sx={{
            width: "100%",
            backgroundColor: "background.default",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage ? (
        imagePreview ? (
          <ImagePreview
            image={post.post_media_link}
            caption={post.post_caption}
          />
        ) : (
          <Box
            borderRadius="5px"
            border={`1px solid ${medium}`}
            mt="1rem"
            p="1rem"
          >
            <ImageInput callback={getImageUrl} />
          </Box>
        )
      ) : null}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: "text.primary" }} />
          <Typography
            color={"text.primary"}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: "text.primary" }} />
              <Typography color={"text.primary"}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: "text.primary" }} />
              <Typography color={"text.primary"}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: "text.primary" }} />
              <Typography color={"text.primary"}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: "text.primary" }} />
          </FlexBetween>
        )}
        <Button disabled={!canPost} onClick={handlePost} variant="contained">
          {" "}
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
