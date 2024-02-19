import { Box, useMediaQuery } from "@mui/material";

import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostModal from "../../components/PostModal";
import { theState } from "../../state";
import { useEffect, useState } from "react";
import SideBar from "../widgets/SideBar";
import { apiStore } from "../../state/api";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {
    theme,
    userData: { userId },
  } = theState();
  const [mode, setMode] = useState<0 | 256>(() => {
    return theme === "dark" ? 256 : 0;
  });
  useEffect(() => {
    setMode(theme === "dark" ? 256 : 0);
  }, [theme]);
  const boxShadow = {
    boxShadow: `rgba(${mode}, ${mode}, ${mode}, 0.15) 2.4px 2.4px 3.2px`,
  };

  const { getFeed, feed, getFollowers } = apiStore();
  useEffect(() => {
    getFeed();
    getFollowers(userId);
  }, []);
console.log('feed', feed)
  return (
    <Box>
      {" "}
      <PostModal />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        marginTop="5rem"
      >
        {/**Side Box*/}
        {isNonMobileScreens ? (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <Box sx={{ boxShadow, borderRadius: 5 }} position={"fixed"}>
              <SideBar />
            </Box>
          </Box>
        ) : null}

        {/**Actual Posts */}

        <Box
          sx={{ boxShadow, borderRadius: 5 }}
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget posts={feed} />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box sx={{ boxShadow, borderRadius: 5 }} position={"fixed"}>
              {" "}
              <FriendListWidget />{" "}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
