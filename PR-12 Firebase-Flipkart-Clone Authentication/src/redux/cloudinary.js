import axios from "axios";

export const ImageUploading = async (imgdata) => {
  const UploadImg = new FormData();
  UploadImg.append("file", imgdata);
  UploadImg.append("upload_preset", "Flipkart-Image");
  UploadImg.append("cloud_name", "dmnybab8u");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dmnybab8u/image/upload",
    UploadImg
  );

  console.log("Cloudinary Upload Response:", response.data);
  return response.data.secure_url;
};
