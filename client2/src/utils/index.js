// import axios from "axios";
// export const handleFileUpload = async (file) => {
//   console.log("file index", file);
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "socialmedia");
//   formData.append("cloud_name", "ddz55xfrt");

//   try {
//     const res = await axios.post(
//       "https://api.cloudinary.com/v1_1/ddz55xfrt/image/upload",
//       formData
//     );
//     console.log(res, "IMAGESSSSS");
//     return res.data.secure_url;
//   } catch (error) {
//     console.log(error);
//   }
// };

import axios from "axios";

export const handleFileUpload = async (file) => {
  console.log("Hello");
  console.log("file index", file);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "socialmedia");
  formData.append("cloud_name", "ddz55xfrt");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddz55xfrt/image/upload",
      formData
    );
    console.log(res, "IMAGESSSSS");
    console.log(res.data.secure_url, "IMAGESSSSS"); // Log the secure URL
    return res.data.secure_url;
  } catch (error) {
    console.log(error);
    return null; // Handle the error gracefully
  }
};

handleFileUpload();
