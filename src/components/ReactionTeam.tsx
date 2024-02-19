import { Box } from "@mui/material";
import { ReactionType } from "../scenes/widgets/PostWidget";

type Prop = {
  reactions: [string, any][];
  addReact: (react: ReactionType) => void;
};

const ReactionTeam = ({ reactions, addReact }: Prop) => {
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 2,
      }}
    >
      {reactions.map(([key, value]) => (
        <Box
          onClick={() => addReact(key as ReactionType)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              transform: "scale(2)",
              transition: "transform 300ms",
            },
          }}
        >
          {value}
        </Box>
      ))}
    </Box>
  );
};

export default ReactionTeam;
