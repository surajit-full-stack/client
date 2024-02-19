import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type PreviewProps = {
  image: string;
  caption: string;
};
export default function ImagePreview({ image, caption }: PreviewProps) {
  return (
    <Card sx={{ display: "flex", m: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column",flexBasis:"60%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="caption" color="text.secondary" component="div">
            {caption.slice(0, 10)}
            {caption.length >= 10 && "..."}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            surajit
          </Typography>
        </CardContent>
      </Box>
      <CardMedia component="img" sx={{ width: 151,m:1,borderRadius:2 }} image={image} alt="" />
    </Card>
  );
}
