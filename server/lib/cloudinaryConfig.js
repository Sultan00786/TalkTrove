import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import DatauriParser from "datauri/parser.js";
import path from "path";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getUri = (file) => {
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString();
  console.log(extName);
  return parser.format(extName, file.buffer);
};

export const uploadImage = async (image) => {
  const imagePath = getUri(image);
  try {
    const result = await cloudinary.uploader.upload(imagePath.content, {
      resource_type: "auto",
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });
    return result;
  } catch (error) {
    console.log("Error in uploadImage \n", error);
    throw error;
  }
};
