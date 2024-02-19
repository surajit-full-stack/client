import { useState } from "react";

const SeeMoreComment = ({ comment }: { comment: string }) => {
  const [more, setMore] = useState(false);
  return (
    <>
      {more ? comment : comment.slice(0, 85)}
      {comment.length >= 85 && (
        <span onClick={() => setMore(!more)}>
          {more ? "...less" : "...more"}
        </span>
      )}
    </>
  );
};

export default SeeMoreComment;
