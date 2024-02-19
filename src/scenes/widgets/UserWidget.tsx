//left side user box/widget
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { colorTokens } from "../../theme";
import { LinkedIn } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { UserData } from "../../state";
import { apiStore } from "../../state/api";

type UserWidgetProps = {
  userData: UserData;
};
const dark = colorTokens.grey[700];
const medium = colorTokens.grey[400];
const main = colorTokens.grey[200];

const UserWidget = ({ userData }: UserWidgetProps) => {
  const { palette } = useTheme();
  const navigate = useNavigate();



  const location = "Kolkata";
  const occupation = "Developer";
  const viewedProfile = 45;
  const impressions = 454;
  const {followerCount}=apiStore()

  return (
    <WidgetWrapper>
      {/**FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem" //padding bottom
        onClick={() => navigate(`/profile/${userData.userName}`)}
      >
        {/**Photo, Name, Followers */}
        <FlexBetween gap="1rem">
          <UserImage image={userData.profilePicture} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {userData.userName} 
            </Typography>
            <Typography color={medium}>{followerCount} friends</Typography>
          </Box>
        </FlexBetween>
        {/**Manage Button */}
        <ManageAccountsOutlined
          sx={{
            "&:hover": {
              color: palette.primary.main,
              cursor: "pointer",
            },
          }}
        />
      </FlexBetween>

      <Divider />

      {/**SECOND ROW*/}
      <Box p="1rem 0">
        {/**Location Box */}
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        {/**Occupation Box */}
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/**THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={medium} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={medium} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/**FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
