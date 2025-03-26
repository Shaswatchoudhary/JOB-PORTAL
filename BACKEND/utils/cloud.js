// This should be in your utils/datauri.js file
import DatauriParser from "datauri/parser.js";
import path from "path";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.API_SECRET,
});
const parser = new DatauriParser();

const getDataUri = (file) => {
  try {
    // Check if file has buffer property
    if (!file || !file.buffer) {
      console.error("Invalid file object:", file);
      throw new Error("Invalid file object: missing buffer property");
    }

    const extName = path.extname(file.originalname || "file");
    return parser.format(extName, file.buffer);
  } catch (error) {
    console.error("Error in getDataUri:", error);
    throw error;
  }
};

export default getDataUri;
