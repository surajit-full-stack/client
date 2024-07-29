import { create } from "zustand";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { theState } from ".";
import { PostNotification } from "../Types";
import { apiStore } from "./api";
import { http } from "../Axiox";

interface SocketState {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
  unSubscribeUser: (followingId: number) => void;
  subscribeUser: (followingId: number) => void;
}
const port = 4000 + Math.floor(Math.random() * 4);

export const serverUrl = `${import.meta.env.VITE_SOCKET_HOST}:${port}`;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  connect: () => {
    const following = theState.getState().following;
    const userId = theState.getState().userData.userId;
    const socket = io(serverUrl);
    set({ socket });
    console.log("following", following);
    if (socket && !socket.connected) {
      socket.on("connect", () => {
        if (!following) {
          http
            .get("get-following/" + userId, {
              withCredentials: true,
            })
            .then(({ data }) => {
              const f = data.map((it: { userId: number }) => it.userId);
              
              const userId = theState.getState().userData.userId;
              socket.emit("join-room", { following: f, userId });
            })
            .catch((error) => {
              console.error("Error fetching following:", error);
            });
        } else {
          socket.emit("join-room", { following, userId });
        }
      });
    }

    if (socket) {
      socket.removeAllListeners("notification");
      socket.on(
        "notification",
        ({ notification }: { notification: Array<PostNotification> }) => {
          console.log("new notification",notification);

          theState.getState().pushNotification(notification);
          apiStore.getState().getNotification(following);
        }
      );
      socket.on("error", (err) => {
        console.log("socket err", err);
      });
    }

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  },
  unSubscribeUser: (followingId: number) => {
    const userId = theState.getState().userData.userId;

    const { socket } = get();
    socket?.emit("un-follow", { followingId, userId });
  },
  subscribeUser: (followingId: number) => {
    const { socket } = get();
    const userId = theState.getState().userData.userId;
    socket?.emit("join-room", { following: [followingId], userId });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
