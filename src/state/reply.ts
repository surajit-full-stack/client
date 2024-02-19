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
  commentId:null,
  postId:null,
  setReplyData: (cmntId: number, pId: number) =>
    set(() => ({ commentId: cmntId, postId: pId })),
});
const persistConfig = {
  name: "reply", // name of the item in the storage (must be unique) // (optional) by default, 'localStorage' is used
};

export const replyState = create<Store>(persist(store, persistConfig));
