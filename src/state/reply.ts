import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  isReplying: boolean;
  setIsReplying: (value: boolean) => void;
  replyTo: string;
  setReplyTo: (name: string) => void;
  commentId: number | null;
  postId: number | null;
  setReplyData: (cmntId: number | null, pId: number | null) => void;
};

const store = (set: any) => ({
  isReplying: false,
  setIsReplying: (value: boolean) => set(() => ({ isReplying: value })),
  replyTo: "",
  setReplyTo: (name: string) => set(() => ({ replyTo: name })),
  commentId: null,
  postId: null,
  setReplyData: (cmntId: number, pId: number) =>
    set(() => ({ commentId: cmntId, postId: pId })),
});
const persistConfig = {
  name: "reply", // name of the item in the storage (must be unique) // (optional) by default, 'localStorage' is used
};
type PersistedStore = Store & {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
};
export const replyState = create<PersistedStore>(
  persist(store, persistConfig) as any
);
