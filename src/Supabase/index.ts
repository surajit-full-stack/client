import { createClient } from "@supabase/supabase-js";
const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(baseUrl, apiKey);

//console.log(import.meta.env.VITE_SUPABASE_URL, "elllo");

export const uploadImage = async (
  file: File,
  callback: (data: string) => void
) => {
  try {
    const { data, error } = await supabase.storage
      .from("socio_bucket")
      .upload("Posts/" + file.name, file);
    if (error) {
      if (error.message == "Duplicate")
        callback(
          baseUrl + "/storage/v1/object/public/socio_bucket/Posts/" + file.name
        );
      //console.error("Error uploading image:", error);
    } else {
      //console.log("Image uploaded successfully:", data);
      const imgurl =
        baseUrl + "/storage/v1/object/public/socio_bucket/" + data.path;
      callback(imgurl);
    }
  } catch (error: any) {
    //console.error("Error uploading image:", error.message);
  }
};
