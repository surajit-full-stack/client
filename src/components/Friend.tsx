import { Box, Typography, useTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { colorTokens } from "../theme";
import DrawerComp from "./Drawer";
import ViewLIst from "./ViewLIst";


type FriendCardProps = {
  name: string;
  subtitle: string;
  userPicturePath: string;
  withMenu?:boolean
};

/** Contains top part of the post */
const Friend = ({
  name,
  subtitle,
  userPicturePath,
  withMenu=true
}: FriendCardProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = colorTokens.grey[500];
  const medium = colorTokens.grey[400];
  const isSelf = false

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        {/**User profile photo */}
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${name}`);
          //refresh the page from when going into user prof and then going into another prof
          }}
        >
          {/**Name */}
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          {/**location */}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
        {/**Friend button */}
      </FlexBetween>
      {!isSelf && withMenu? <DrawerComp ListComp={<ViewLIst/>} DrawerListComp={<MoreVertIcon />} side="bottom" />:null}
    </FlexBetween>
  );
};

export default Friend;
