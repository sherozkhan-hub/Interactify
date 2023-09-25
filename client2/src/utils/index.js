import axios from "axios";
export const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "social-media");

  try {
    const res = axios.post(
      "https://api.cloudinary.com/v1_1/olympic_flag/image/upload",
      formData
    );
    console.log(res, "IMAGESSSSS");
    return res;
  } catch (error) {
    console.log(error);
  }
};
