import multer from "multer";

// ✅ Configure storage in memory
const storage = multer.memoryStorage();

// ✅ File filter function to restrict file types
const fileFilter = (req, file, cb) => {
  const allowedImages = ["image/png", "image/jpeg", "image/jpg"];
  const allowedResumes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (
    file.fieldname === "profilePhoto" &&
    !allowedImages.includes(file.mimetype)
  ) {
    return cb(
      new Error("Only PNG, JPEG, and JPG image files are allowed!"),
      false
    );
  }

  if (file.fieldname === "resume" && !allowedResumes.includes(file.mimetype)) {
    return cb(
      new Error("Only PDF and Word documents are allowed for resumes!"),
      false
    );
  }

  cb(null, true);
};

// ✅ Multer Configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Define Upload Handlers
export const uploadResume = upload.single("resume");
export const uploadProfilePhoto = upload.single("profilePhoto");
export const uploadProfileFiles = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);
export const singleUpload = upload.single("resume");
export const multipleUpload = upload.array("files", 5); // Allows up to 5 files

// ✅ Handle Unexpected Fields Error Gracefully
export const handleMulterError = (err, req, res, next) => {
  console.log("error: " + err);
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File is too large. Maximum size is 5MB",
        success: false,
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json({ message: `Unexpected field: ${err.field}`, success: false });
    }
    return res.status(400).json({ message: err.message, success: false });
  }
  if (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
  next();
};
