import WidgetWrapper from "../../components/WidgetWrapper";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";

import Friend from "../../components/Friend";
import SideBarList from "../../components/SideBarList";
import { theState } from "../../state";


const SideBar = () => {
  const {userData}=theState()
  return (
    <WidgetWrapper>
      <Box sx={{ m: 2 }}>
        <Friend
        withMenu={false}
          friendId={userData.userName}
          name={userData.userName}
          subtitle=""
          userPicturePath={userData.profilePicture}
        />
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <SideBarList />
      </Box>
    </WidgetWrapper>
  );
};

export default SideBar;
