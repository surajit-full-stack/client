import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../scenes/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import notification_socket from "../socket";
import { theState } from "../state";
import { http } from "../Axiox";
import { Socket } from "socket.io-client";
import { PostNotification } from "../Types";
type authProps = {
  auth: boolean;
};
const Private = ({ auth }: authProps) => {
  const {
    userData: { userId },
    fetchFollowing,
    following,
    pushNotification,
  } = theState();

  if (auth) {
    if (!following) {
      
      http
        .get("get-following/" + userId, {
          withCredentials: true,
        })
        .then(({ data }) => {
          const f = data.map((it: { userId: number }) => it.userId);
          fetchFollowing(f);
          socket_init(notification_socket, f);
        });
    } else {
      socket_init(notification_socket, following);
    }
  }
  function socket_init(socket: Socket, following: Array<number>) {
    if (!socket.connected) {
      socket.on("connect", () => {
        console.log("Connected to Notification server");
        notification_socket.emit("join-room", { following,userId });
      });
    }
  
 
    socket.removeAllListeners("notification");
    socket.on("notification", (notf: PostNotification) => {
      console.log('new notification');
      pushNotification([notf]);
    });
  }
  return (
    <>
      <Navbar />
      <Toaster />
      {auth ? <Outlet /> : <Navigate to="/log-in" />}
    </>
  );
};

export default Private;
