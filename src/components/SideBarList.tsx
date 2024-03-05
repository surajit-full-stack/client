import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { theState } from "../state";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiStore } from "../state/api";
import Swal from "sweetalert2";
const SideBarList = () => {
  const {
    userData: { userId, userName, profilePicture },
  } = theState();
  const navigate = useNavigate();

  const { logout } = apiStore();
  const { loggedOut } = theState();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/profile/" + userName);
          }}
        >
          <ListItemIcon>
            <Avatar alt="Cindy Baker" src={profilePicture} />
          </ListItemIcon>
          <ListItemText primary={userName} />
        </ListItemButton>
      </ListItem>
      <ListItem onClick={() => navigate("/home/")} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>{" "}
      </ListItem>{" "}
      <ListItem onClick={() => navigate("/followers/" + userId)} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Followers" />
        </ListItemButton>{" "}
      </ListItem>
      <ListItem
        disablePadding
        onClick={() => {
          Swal.fire({
            title: "Log out?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
          }).then((result) => {
            if (result.isConfirmed) {
              logout().then(() => {
                localStorage.clear();
                loggedOut();
                setTimeout(() => {
                  navigate("/log-in");
                }, 1000);
              });
            }
          });
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SideBarList;
