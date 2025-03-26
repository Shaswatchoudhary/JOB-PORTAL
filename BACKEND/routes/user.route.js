import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"; // ✅ Corrected Import
import {
  singleUpload,
  uploadResume,
  uploadProfilePhoto,
  uploadProfileFiles,
} from "../middleware/multer.js"; // ✅ Added uploadProfilePhoto & uploadProfileFiles

const router = express.Router();

// ✅ Register Route (with Profile Photo Upload)
router.route("/register").post(uploadProfilePhoto, register);

// ✅ Login & Logout Routes
router.route("/login").post(login);
router.route("/logout").post(logout);

// ✅ Profile Update Route (Uploads Both Resume & Profile Photo)
router
  .route("/profile/update")
  .post(isAuthenticated, uploadProfileFiles, updateProfile); // ✅ Now supports both `resume` and `profilePhoto`

export default router;
