import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(`data:${image.mimetype};base64,${image.toString('base64')}`, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
