import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
const Avatars = [
  {
    image:
      "https://cdn.dribbble.com/users/4553005/screenshots/17156504/anuvab_nft-01.png",
  },
  {
    image:
      "https://i.pinimg.com/736x/0c/3a/fd/0c3afd9b52401d8e231df625291d2a6b.jpg",
  },
  {
    image:
      "https://i.pinimg.com/736x/d9/9f/58/d99f58d357e537652656f55b662d5cd7.jpg",
  },
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d54a51105791269.5f80b1b5e44ee.png",
  },
  {
    image: "https://assets.stickpng.com/images/58f366b6a4fa116215a923d3.png",
  },
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/84b8c183480077.5d3e0c9d5a302.jpg",
  },
];
type avatarProps = {
  selectedAvatar: (image: string) => void;
};
export default function ImageAvatars({ selectedAvatar }: avatarProps) {
  return (
    <Stack
      sx={{ width: "13rem", overflow: "scroll" }}
      direction="row"
      spacing={2}
    >
      {Avatars.map((it) => {
        return (
          <Avatar
            onClick={() => selectedAvatar(it.image)}
            sx={{ width: 56, height: 56 }}
            alt="Remy Sharp"
            src={it.image}
          />
        );
      })}
    </Stack>
  );
}
