import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from ".";
import AutoType from "../../Hooks/AutoType";
import toast, { Toaster } from "react-hot-toast";
import { http } from "../../Axiox";
import { theState } from "../../state";
const text1 = `Enter user name`;
const text2 = `Enter password`;
const LoginForm = () => {
  const { setUserState, loggedIn } = theState();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: null,
    password: null,
  });
  const signin = (e: any) => {
    e.preventDefault();
    if (!userData.userName || !userData.password) {
      toast.error("Enter full details");
      return;
    }
    http
      .post("auth/login", userData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Successfully logged in!");
        const { userData,accessToken } = res.data;

        setUserState(userData);
        setTimeout(() => {
          loggedIn();

          navigate("/home");
        }, 1000);
      })
      .catch((err) => {
        //console.log("err", err);
        toast.error(err.response?.data || err.message);
      });
  };
  return (
    <>
      <AuthWrapper>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Typography>Log in</Typography>
        <Box
          sx={{
            backgroundColor: "rgb(40 35 35);",
            m: 0,
            marginTop: 2,
            p: 5,
            borderRadius: 5,
          }}
        >
          <Box sx={{ m: 3 }}>
            <TextField
              onChange={(e) =>
                setUserData((prev: any) => {
                  return { ...prev, userName: e.target.value };
                })
              }
              id="user-name"
              name="userName"
              label={<AutoType text={text1} />}
              variant="standard"
            />
          </Box>
          <Box sx={{ m: 3 }}>
            <TextField
              onChange={(e) =>
                setUserData((prev: any) => {
                  return { ...prev, password: e.target.value };
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  signin(event);
                }
              }}
              id="password"
              name="password"
              label={<AutoType text={text2} />}
              variant="standard"
            />
          </Box>
          <Box onClick={signin} sx={{ m: 3 }}>
            <Button variant="contained">sign in</Button>
          </Box>
          <Link style={{ color: "#7a7aff" }} to="/register">
            Dont't have an account ? Register here
          </Link>
        </Box>
      </AuthWrapper>
    </>
  );
};

export default LoginForm;
