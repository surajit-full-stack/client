import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadImage } from "../Supabase";
import { useState } from "react";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
type ImageUrlCallback = {
  callback: (url: string | undefined, loading: boolean) => void;
};
const ImageInput = ({ callback }: ImageUrlCallback) => {
  function handleFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      callback(undefined, true);
      uploadImage(file, (url) => {
        callback(url, false);
      }).finally(() => {
        callback(undefined, false);
      });
    }
  }
  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
      >
        Upload Photo
        <VisuallyHiddenInput
          accept="image/*"
          onChange={handleFileChange}
          type="file"
        />
      </Button>
    </>
  );
};

export default ImageInput;
