import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AuthWrapper from ".";
import AutoType from "../../Hooks/AutoType";
import { AccountCircle } from "@mui/icons-material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImageAvatars from "./ImgerPicker";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../Axiox";
import { theState } from "../../state";
import toast, { Toaster } from "react-hot-toast";

type inputProps = {
  getData: (data: string | null) => void;
  label: string;
  value: string;
  currentStep: number;
  setStep: Dispatch<SetStateAction<number>>;
};
type registerData = {
  userName: string;
  password: string;
  profilePicture?: string;
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<registerData>({
    userName: "",
    password: "",
    profilePicture: "",
  });
  const { setUserState, loggedIn } = theState();
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const getName = (data: string | null) => {
    if (!data) return;
    setUserData((prev: any) => {
      return { ...prev, userName: data };
    });
  };
  const getPassword = (data: string | null) => {
    setUserData((prev: any) => {
      return { ...prev, password: data };
    });
  };
  const getImage = (data: string | null) => {
    setUserData((prev: any) => {
      return { ...prev, profilePicture: data };
    });

    setCanRegister(true);
  };
  const register = (e: any) => {
    e.preventDefault();
    //console.log("userData", userData);
    http
      .post("auth/register", userData, {
        withCredentials: true,
      })
      .then((res) => {
        //console.log("res.data", res.data);
        loggedIn();
        setUserState(res.data);
        navigate("/home");
      })
      .catch((err) => {
        //console.log("err", err);
      });
  };
  return (
    <AuthWrapper>
      <Typography sx={{ marginY: 3 }}>
        RegisterForm
        <br />
        <Link to="/log-in">Already have an account? Log in here</Link>
      </Typography>

      <Box
        sx={{
          backgroundColor: "rgb(40 35 35);",
          m: 0,
          p: 5,
          borderRadius: 5,
          height: "auto",
        }}
      >
        {step === 1 ? (
          <Inputs
            value={userData.userName}
            getData={getName}
            label="Enter a user name"
            currentStep={step}
            setStep={setStep}
          />
        ) : step === 2 ? (
          <Inputs
            value={userData.password}
            getData={getPassword}
            label="Enter your password"
            currentStep={step}
            setStep={setStep}
          />
        ) : (
          <ImageUpload getImage={getImage} setStep={setStep} />
        )}
        {canRegister ? (
          <Button onClick={register} variant="contained">
            Register
          </Button>
        ) : null}
      </Box>
    </AuthWrapper>
  );
};

const Inputs = ({
  getData,
  label,
  value,
  currentStep,
  setStep,
}: inputProps) => {
  const [data, setData] = useState(value);
  const [anim, setAnim] = useState(false);
  const props = useSpring({
    opacity: anim ? 1 : 0,
  });
  useEffect(() => {
    setAnim(false);
    setData(value);
    setTimeout(() => {
      setAnim(true);
    }, 500);
  }, [currentStep]);
  useEffect(() => {
    if (data.includes(" ")) {
    }
  }, [data]);
  const checkCurrentState = (): boolean => {
    if (currentStep == 1 && data.length >= 3) return true;
    if (currentStep == 2 && data.length >= 5) return true;
    return false;
  };
  return (
    <>
      <animated.div style={props}>
        <Toaster position="top-center" reverseOrder={false} />
        <Box sx={{ height: "1rem" }}>
          <AutoType text={label} />
        </Box>
        <Box sx={{ marginY: 2 }}>
          <TextField
            value={data}
            onChange={(event) => {
             
              if (
                event.target.value.charAt(event.target.value.length-1) === " "
              ) {
                toast.error("empty space is not allowed!");
              } else setData(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (checkCurrentState()) {
                  getData(data);
                  setStep((prev: number) => prev + 1);
                }
              }
            }}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment:
                currentStep == 1 ? (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ) : null,
              endAdornment:
                currentStep === 2 ? (
                  <InputAdornment position="start">
                    <RemoveRedEyeIcon />
                  </InputAdornment>
                ) : null,
            }}
            variant="standard"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            onClick={() => {
              if (checkCurrentState()) setStep((prev: number) => prev + 1);
            }}
            sx={{ marginX: 1 }}
          >
            <ArrowForwardIcon />
          </Typography>

          {currentStep > 1 && (
            <Typography
              onClick={() => setStep((prev: number) => prev - 1)}
              sx={{ marginX: 1 }}
            >
              <KeyboardReturnIcon />
            </Typography>
          )}
        </Box>
      </animated.div>
    </>
  );
};

type imageProps = {
  setStep: Dispatch<React.SetStateAction<number>>;
  getImage: (data: string) => void;
};
const ImageUpload = ({ setStep, getImage }: imageProps) => {
  const [AvatarUrl, setAvatarUrl] = useState<string | null>(null);
  const selectedAvatar = (data: string) => {
    setAvatarUrl(data);
    getImage(data);
    //console.log(data);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {AvatarUrl ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={AvatarUrl}
            sx={{ width: 100, height: 100, m: 2 }}
          />
        </>
      ) : (
        <ImageAvatars selectedAvatar={selectedAvatar} />
      )}
      <Box sx={{ m: 2 }}>
        <Typography
          onClick={() => {
            setStep((prev: number) => prev - 1);
          }}
          sx={{ marginX: 1 }}
        >
          <KeyboardReturnIcon />
        </Typography>
      </Box>
    </Box>
  );
};
export default RegisterForm;
