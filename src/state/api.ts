import { create } from "zustand";
import { http } from "../Axiox";
import toast from "react-hot-toast";
import { Comment, Follower, Post, PostNotification, Reactors } from "../Types";
import { ReactionType } from "../scenes/widgets/PostWidget";
import { serverUrl } from "../socket";
import { theState } from ".";
import { useSocketStore } from "./socket";
type ApiStore = {
  commentsLoading: boolean;
  posts: Array<Post>;
  notifications: Array<PostNotification>;
  followers: Array<Follower>;
  followings: Array<any>;
  followersSuggestion: Array<any>;
  followerCount: number;
  followingCount: number;
  comments: Array<Comment>;
  feed: Array<Post>;
  getNotification: (
    following: Array<number> | null
  ) => Promise<Array<PostNotification>>;
  getPosts: (userName: string) => Promise<void>;
  addReactionPost: (
    postId: number,
    type: ReactionType,
    author_id: number
  ) => void;
  removeReactionPost: (postId: number) => void;
  getFollowers: (userId: number) => void;
  getFollowings: (userId: number) => void;
  getFollowersSuggestion: () => void;
  follow: (userId: number, userName: string) => void;
  unfollow: (userId: number, userName: string) => void;
  getComments: (postId: number) => Promise<void>;
  addComment: (postId: number, commentText: string, author_id: number) => void;
  editComment: (
    commentId: number,
    newComment: string,
    pId: number
  ) => Promise<boolean>;
  deleteComment: (
    commentId: number,
    pId: number,
    pCommentId: number | null
  ) => Promise<boolean>;
  addReply: (
    CommentId: number,
    CommentText: string,
    replyTo: string,
    postId: number
  ) => Promise<void>;
  getReplies: (
    CommentId: number,
    response: (data: Array<Comment>, err: boolean) => void
  ) => void;
  reactComment: (react: ReactionType, commentId: number) => Promise<void>;
  unReactComment: (commentId: number) => Promise<void>;
  getFeed: () => Promise<void>;
  getReactors: (postId: number) => Promise<Array<Reactors>>;
  getIPreactor: (postId: number) => Promise<string | null>;
  getCommentReactions: (cmntId: number) => Promise<Array<Reactors>>;

  logout: () => Promise<void>;
};

const store = (set: any) => ({
  // loading
  commentsLoading: false,
  // data
  posts: [],
  followers: [],
  followings: [],
  followersSuggestion: [],
  notifications: [],
  comments: [],
  feed: [],
  followerCount: 0,
  followingCount: 0,
  // calls
  getPosts: async (userName: string) => {
    http
      .get("get-profile-posts/" + userName, {
        withCredentials: true,
      })
      .then((res) => {
        set(() => ({ posts: res.data }));
      })
      .catch(() => {
        toast.error("Something went wrong . try again");
      });
  },
  addReactionPost: (postId: number, type: ReactionType, author_id: number) => {
    http.post(
      "reaction/post/" + postId,
      { type: type, author_id },
      { withCredentials: true }
    );
  },
  removeReactionPost: (postId: number) => {
    http.post("un-reaction/post/" + postId, {}, { withCredentials: true });
  },
  getFollowers: (userId: number) => {
    http
      .get("get-follower/" + userId, {
        withCredentials: true,
      })
      .then((res) => {
        set(() => ({ followers: res.data, followerCount: res.data.length }));
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  },
  getFollowings: (userId: number) => {
    http
      .get("get-following/" + userId, {
        withCredentials: true,
      })
      .then((res) => {
        set(() => ({ followings: res.data, followingCount: res.data.length }));
        theState
          .getState()
          .fetchFollowing(res.data.map((it: Follower) => it.userId));
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  },
  getFollowersSuggestion: async () => {
    http
      .get("get-follower-suggestion", { withCredentials: true })
      .then((data) => {
        set(() => ({ followersSuggestion: data.data }));
      });
  },
  getComments: async (postId: number) => {
    set(() => ({ commentsLoading: true }));
    http
      .get("get-comments/" + postId, { withCredentials: true })
      .then((res) => {
        set(() => ({ comments: res.data }));
      })
      .catch(() => {
        toast.error("error getting comments!");
      })
      .finally(() => {
        set(() => ({ commentsLoading: false }));
      });
  },
  addComment: (postId: number, commentText: string, author_id: number) => {
    http
      .post(
        "add-comment/" + postId,
        { CommentText: commentText, author_id },
        { withCredentials: true }
      )
      .then(() => {
        apiStore.getState().getComments(postId);
        toast.success("comment added");
      });
  },
  editComment: async (commentId: number, newComment: string, pId: number) => {
    http
      .post(
        "edit-comment/" + commentId,
        { CommentText: newComment },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("updated!");
        apiStore
          .getState()
          .getComments(pId)
          .then(() => {
            return true;
          });
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
    return false;
  },
  deleteComment: async (
    commentId: number,
    pId: number,
    pCommentId: number | null
  ) => {
    http
      .post(
        "delete-comment/" + commentId,
        { postId: pId, pCommentId },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("deleted!");

        apiStore
          .getState()
          .getComments(pId)
          .then(() => {
            return true;
          });
      });
    return false;
  },
  addReply: async (
    commentId: number,
    CommentText: string,
    replyTo: string,
    postId: number
  ) => {
    http
      .post(
        "add-reply/" + commentId,
        { CommentText, replyTo, postId },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("replied!");
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  },
  getReplies: async (
    CommentId: number,
    response: (data: Array<Comment>, err: boolean) => void
  ) => {
    http
      .get("get-replies/" + CommentId, { withCredentials: true })
      .then((res) => {
        response(res.data, false);
      })
      .catch(() => {
        toast.error("something went wrong!");
        response([], true);
      });
  },
  reactComment: async (react: ReactionType, commentId: number) => {
    http.post(
      "reaction/comment/" + commentId,
      { type: react },
      { withCredentials: true }
    );
  },
  unReactComment: async (commentId: number) => {
    http.post(
      `un-reaction/comment/` + commentId,
      {},
      { withCredentials: true }
    );
  },
  getFeed: async () => {
    http.get("feed", { withCredentials: true }).then((res) => {
      console.log("res", res);
      set(() => ({ feed: res.data }));
    });
  },
  logout: async () => {
    try {
      await http.post("auth/logout", {}, { withCredentials: true });

      toast.success("Logged out!");
    } catch (error) {
      // Handle errors if needed
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  },
  follow: (userId: number, userName: string) => {
    http
      .post("follow/" + userId, {}, { withCredentials: true })
      .then((myUserId) => {
        const myUid: number = parseInt(myUserId.data);
        console.log("myUid", myUid);
        apiStore.getState().getFollowings(myUid);
        apiStore.getState().getFollowersSuggestion();
        useSocketStore.getState().subscribeUser(userId)
        toast("you are now following " + userName);
      });
  },
  unfollow: (userId: number, userName: string) => {
    http
      .post("unfollow/" + userId, {}, { withCredentials: true })
      .then((myUserId) => {
        const myUid: number = parseInt(myUserId.data);
        console.log("myUid", myUid);
        apiStore.getState().getFollowings(myUid);
        apiStore.getState().getFollowersSuggestion();
        useSocketStore.getState().unSubscribeUser(userId);
        toast(" Un-following " + userName);
      });
  },
  getReactors: async (postId: number) => {
    try {
      const res = await http.get("get-reactors/" + postId, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      toast.error("something went wrong!");
      return [];
    }
  },
  getIPreactor: async (postId: number) => {
    try {
      const res = await http.get("get-important-reactors/" + postId, {
        withCredentials: true,
      });
      return res.data[0].userName;
    } catch (err) {
      return null;
    }
  },
  getCommentReactions: async (cmntId: number) => {
    try {
      const res = await http.get("get-comment-reactions/" + cmntId, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return [];
    }
  },
  getNotification: async (following: Array<number> | null) => {
    try {
      let payload = following?.map((id) => "base:" + id);

      const { data } = await http.post(
        serverUrl + "/",
        { groupIds: JSON.stringify(payload) },
        { withCredentials: true }
      );
      const _notifications = data.data.map((it: any) => it.data);
      console.log("resp.data.data", _notifications);
      set(() => ({
        notifications: _notifications,
      }));
      return _notifications;
    } catch (error) {
      throw error;
    }
  },
});

export const apiStore = create<ApiStore>(store);
// set((state: any) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
