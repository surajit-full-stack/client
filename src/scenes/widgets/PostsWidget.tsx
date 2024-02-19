import { Post } from "../../Types";
import PostWidget from "./PostWidget";

type Props = {
  posts: Array<Post>;
};
const PostsWidget = ({ posts }: Props) => {
  //console.log('api', apiStore())

  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          post_id,
          post_caption,
          post_media_link,
          CreatedAt,
          comments_count,
          reaction_count,
          author_name,
          visibility,
          profilePicture,
          author_id,
          type,
        }) => {
          return (
            <PostWidget
              key={post_id}
              postId={post_id}
              name={author_name}
              author_id={author_id}
              description={post_caption}
              picturePath={post_media_link}
              userPicturePath={profilePicture}
              CreatedAt={CreatedAt}
              visibility={visibility}
              comments_count={comments_count}
              reaction_count={reaction_count}
              reactionType={type}
            />
          );
        }
      )}
    </>
  );
};

export default PostsWidget;
