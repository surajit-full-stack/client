import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { apiStore } from "../../state/api";

const FriendListWidget = () => {
  const { palette } = useTheme();
  const { followers } = apiStore();
  return (
    <WidgetWrapper>
      <Typography
        color={palette.primary.light}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Followers
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {followers.map(({ userId, userName, profilePicture }) => (
          <Friend
            key={userId}
            name={`${userName}`}
            subtitle={"unknown"}
            userPicturePath={profilePicture}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
