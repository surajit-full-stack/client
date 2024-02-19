import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import UserWidget from "../../scenes/widgets/UserWidget";
import { useParams } from "react-router-dom";
import { http } from "../../Axiox";
import { UserData, theState } from "../../state";
import FriendListMobile from "../widgets/FreindListMobile";
import { apiStore } from "../../state/api";

const ProfilePage = () => {
  const { userName = "" } = useParams();
  const {
    userData: { userName: myUname },
  } = theState();
  const { getPosts } = apiStore();
  const { palette } = useTheme();
  const { getFollowers, followers, followerCount } = apiStore();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    profilePicture: "",
    userId: -1,
  });
  useEffect(() => {
    //console.log("profile");

    getUser();
    getPosts(userName);
  }, [userName]); // eslint-disable-line react-hooks/exhaustive-deps

  const getUser = () => {
    http
      .get("user-info/" + userName, {
        withCredentials: true,
      })
      .then((res) => {
        //console.log("res.data", res.data);
        getFollowers(res.data.userId);
        setUserData({
          userName: res.data.userName,
          profilePicture: res.data.profilePicture,
          userId: res.data.userId,
        });
      })
      .catch((err) => {
        //console.log("err", err);
      });
  };
  const { posts } = apiStore();

  return (
    <Box>
      <Navbar />
      {/**Main box */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/**Left side
         *  User Widget and Friend List
         */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userData={userData} />
          <Box m="2rem 0" />
          <Divider />
        </Box>
        {!isNonMobileScreens && (
          <Box>
            <Typography
              color={palette.primary.light}
              variant="h5"
              fontWeight="500"
              sx={{ marginY: "1.5rem", textAlign: "center" }}
            >
              Followers
            </Typography>
            <FriendListMobile follower={followers} />
          </Box>
        )}

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {userName === myUname && (
            <MyPostWidget picturePath={userData.profilePicture} />
          )}

          <Box m="2rem 0" />
          <PostsWidget posts={posts} />
        </Box>
        {isNonMobileScreens && (
          <Box>
            <FriendListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
