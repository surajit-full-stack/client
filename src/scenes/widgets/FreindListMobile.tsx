import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Follower } from "../../Types";
type FriendListProps = {
  follower: Array<Follower>;
};
export default function FriendListMobile({ follower }: FriendListProps) {

  return (
    <AvatarGroup sx={{ justifyContent: "center" }} total={follower.length}>
      {follower.slice(0,4).map(({ profilePicture, userName }) => (
        <Avatar alt={userName} src={profilePicture} />
      ))}
    </AvatarGroup>
  );
}
