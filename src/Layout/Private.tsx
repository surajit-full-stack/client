import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../scenes/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { serverUrl } from "../socket";
import io from "socket.io-client";

import { theState } from "../state";
import { http } from "../Axiox";
import { Socket } from "socket.io-client";
import { PostNotification } from "../Types";
import { useEffect, useState } from "react";
import { AuthInvalidTokenResponseError } from "@supabase/supabase-js";
import { apiStore } from "../state/api";
type authProps = {
  auth: boolean;
};

const Private = ({ auth }: authProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    userData: { userId },
    fetchFollowing,
    following,
    pushNotification,
  } = theState();
  const { getNotification } = apiStore();
  useEffect(() => {
    if (auth) {
      const newSocket = io(serverUrl);
      setSocket(newSocket);

      return () => {
        // Cleanup function to disconnect socket when component unmounts
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [AuthInvalidTokenResponseError]);
  useEffect(() => {
    if (socket && following) {
      socket_init(following);
    } else if (auth && !following) {
      http
        .get("get-following/" + userId, {
          withCredentials: true,
        })
        .then(({ data }) => {
          const f = data.map((it: { userId: number }) => it.userId);
          fetchFollowing(f);
          socket_init(f);
        })
        .catch((error) => {
          console.error("Error fetching following:", error);
        });
    }
  }, [socket, following]);

  function socket_init(following: Array<number>) {
    if (socket && !socket.connected) {
      socket.on("connect", () => {
        console.log("Connected to Notification server");
        socket.emit("join-room", { following, userId });
      });
    }

    if (socket) {
      socket.removeAllListeners("notification");
      socket.on(
        "notification",
        ({ notification }: { notification: Array<PostNotification> }) => {
          console.log("new notification");
          pushNotification(notification);
          getNotification(following);
        }
      );
      socket.on("error",(err)=>{
        console.log('socket err',  err)
      })
    }
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
