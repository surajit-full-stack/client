import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostNotification } from "../Types";

export type UserData = {
  userId: number;
  userName: string;
  profilePicture: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

type Store = {
  theme: "dark" | "light" | undefined;
  changeTheme: () => void;
  auth: boolean;
  following: Array<number> | null;
  fetchFollowing: (following: Array<number>) => void;
  newNotification: Array<PostNotification>;
  userData: UserData;
  loggedIn: () => void;
  loggedOut: () => void;
  setUserState: (data: any) => void;
  pushNotification: (newNoti: Array<PostNotification>) => void;
  resetNotification: () => void;
};

const store = (set: any) => ({
  userData: {} as UserData,
  auth: false,
  theme: "dark",
  newNotification: [],
  following: null,
  fetchFollowing: (following: Array<number>) => set(() => ({ following })),
  pushNotification: (newNoti: Array<PostNotification>) =>
    set((state: any) => ({
      newNotification: [...state.newNotification, ...newNoti],
    })),
  resetNotification: () => set(() => ({ newNotification: [] })),
  changeTheme: () =>
    set((state: any) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  loggedIn: () => set(() => ({ auth: true })),
  loggedOut: () => set(() => ({ auth: false })),
  setUserState: (data: any) => set(() => ({ userData: data })),
});
const persistConfig = {
  name: "app-theme", // name of the item in the storage (must be unique) // (optional) by default, 'localStorage' is used
};

export const theState = create<Store>(persist(store, persistConfig));
