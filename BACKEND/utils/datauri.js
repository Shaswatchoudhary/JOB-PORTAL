import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
  try {
    if (!file || !file.buffer) {
      console.error("❌ Invalid file object:", file);
      throw new Error("Invalid file object: missing buffer property");
    }

    const extName = path.extname(file.originalname || "file");
    const dataUri = parser.format(extName, file.buffer);

    if (!dataUri.content) {
      throw new Error("Failed to generate data URI from file buffer");
    }

    return dataUri.content; // ✅ Return only `content`, NOT the whole object
  } catch (error) {
    console.error("❌ Error in getDataUri:", error);
    throw error;
  }
};

export default getDataUri;
