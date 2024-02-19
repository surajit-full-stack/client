import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
interface WrapperProps {
  children: ReactNode; // ReactNode allows any valid React children
  // Add other props as needed
}
const AuthWrapper: React.FC<WrapperProps> = ({ children }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      {/** LOGO */}
      <Box
        width="100%"
        sx={{
          backgroundColor: theme.palette.background.paper,
          p: "1rem 6%",
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize={32} color="primary">
          Surajit
        </Typography>
      </Box>

      {/** Welcome sign and form component */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        {/** Welcome sign */}
        <Typography fontWeight={500} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to socio!
        </Typography>

        {/** Form component */}
        {children}
        
      </Box>
    </Box>
  );
};

export default AuthWrapper;
