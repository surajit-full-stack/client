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
const INITIAL = {
  userData: {} as UserData,
  auth: false,
  theme: "dark",
  newNotification: [],
  following: null,
};
const store = (set: any) => ({
  ...INITIAL,
  fetchFollowing: (following: Array<number>) => {
    console.log("up following");
    set(() => ({ following }));
  },
  pushNotification: (newNoti: Array<PostNotification>) =>
    set((state: any) => ({
      newNotification: [...state.newNotification, ...newNoti],
    })),
  resetNotification: () => set(() => ({ newNotification: [] })),
  changeTheme: () =>
    set((state: any) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  loggedIn: () => set(() => ({ auth: true })),
  loggedOut: () => set(() => ({ ...INITIAL })),
  setUserState: (data: any) => set(() => ({ userData: data })),
});
const persistConfig = {
  name: "app-theme", // name of the item in the storage (must be unique) // (optional) by default, 'localStorage' is used
};
type PersistedStore = Store & {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
};
export const theState = create<PersistedStore>(
  persist(store, persistConfig) as any
);
