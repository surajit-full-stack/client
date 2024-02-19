import { ReactionType } from "../scenes/widgets/PostWidget";

export type Post = {
  post_id: number;
  profilePicture: string;
  isDp: boolean | 1 | 0;
  post_caption: string;
  post_media_link: string;
  author_id: number;
  CreatedAt: string;
  comments_count: number;
  reaction_count: number;
  visibility: "public" | "private" | "follower";
  author_name: string;
  type: "wow" | "like" | "sad" | "angry" | "hate" | "love";
};

export type Comment = {
  CommentID: number;
  PostID: number | null;
  ParentCommentID: number | null;
  UserID: number;
  CommentText: string;
  Timestamp: string;
  userName: string;
  profilePicture: string;
  replycount: number;
  reactionCount: number;
  replyTo: string;
  type: "wow" | "like" | "sad" | "angry" | "hate" | "love";
};

export type Follower = {
  userId: number;
  userName: string;
  profilePicture: string;
};

export type Reactors = {
  userName: string;
  profilePicture: string;
  type: ReactionType;
  createdAt: string;
};

export type CommentReactions = {
  reactionId: number;
  reactorId: number;
  CommentId: number;
  type: ReactionType;
  createdAt: string;
};
export type PostNotification = {
  type: string;
  senderName: string;
  senderId:number;
  author_id?: number;
  postId: number;
  caption?:string;
};
