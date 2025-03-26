import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import getDataUri from "../utils/datauri.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    let profilePhotoUrl = ""; // Default profile photo URL

    if (req.file) {
      try {
        console.log("📸 Uploading profile photo...");

        const fileUri = getDataUri(req.file); // Convert to Data URI
        const cloudResponse = await cloudinary.v2.uploader.upload(fileUri, {
          folder: "user_profiles", // Store in Cloudinary folder
          resource_type: "image",
        });

        console.log("✅ Profile photo uploaded:", cloudResponse.secure_url);
        profilePhotoUrl = cloudResponse.secure_url;
      } catch (uploadError) {
        console.error("❌ Error uploading profile photo:", uploadError);
        return res.status(500).json({
          message: "Error uploading profile photo",
          success: false,
        });
      }
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: `🎉 Account created successfully! Welcome, ${fullname}!`,
      success: true,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({
      message: "Server Error registering user",
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: false });
    }

    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: "Access denied for this role", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      message: "Server Error login failed",
      success: false,
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({
      message: "Server Error during logout",
      success: false,
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("🔹 Update profile request received");
    console.log("Body:", JSON.stringify(req.body));
    console.log(
      "Files structure:",
      req.files ? Object.keys(req.files) : "No req.files"
    );
    console.log("Single file:", req.file ? req.file.fieldname : "No req.file");

    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!user.profile) {
      user.profile = {};
    }

    // Basic profile updates
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // Handle skills - could be an array from FormData or comma-separated string
    if (skills) {
      if (Array.isArray(skills)) {
        user.profile.skills = skills;
      } else {
        user.profile.skills = skills.split(",").map((skill) => skill.trim());
      }
    }

    // Handle profile photo upload
    try {
      // Possible field names from frontend
      const profilePhotoFieldNames = ["profilePhoto", "file"];
      let profilePhotoFile = null;

      // Check req.files first (multipart/form-data with multiple files)
      if (req.files) {
        for (const fieldName of profilePhotoFieldNames) {
          if (req.files[fieldName]) {
            profilePhotoFile = Array.isArray(req.files[fieldName])
              ? req.files[fieldName][0]
              : req.files[fieldName];
            console.log(`✅ Found profile photo in req.files.${fieldName}`);
            break;
          }
        }
      }

      // If not found in req.files, check req.file (single file upload)
      if (
        !profilePhotoFile &&
        req.file &&
        profilePhotoFieldNames.includes(req.file.fieldname)
      ) {
        profilePhotoFile = req.file;
        console.log(
          `✅ Found profile photo in req.file with fieldname ${req.file.fieldname}`
        );
      }

      if (profilePhotoFile) {
        console.log(
          "🖼️ Processing profile photo:",
          profilePhotoFile.originalname
        );

        try {
          const fileUri = getDataUri(profilePhotoFile);
          console.log("🔗 Profile photo URI generated successfully");

          const cloudResponse = await cloudinary.v2.uploader.upload(fileUri, {
            folder: "user_profile_photos",
            resource_type: "image", // Ensuring it's treated as an image
          });

          console.log(
            "☁️ Profile photo uploaded to Cloudinary:",
            cloudResponse.secure_url
          );
          user.profile.profilePhoto = cloudResponse.secure_url;
        } catch (uploadError) {
          console.error("❌ Error uploading profile photo:", uploadError);
        }
      }
    } catch (profilePhotoError) {
      console.error("❌ Error processing profile photo:", profilePhotoError);
      // Continue with the rest of the updates even if profile photo upload fails
    }

    // Handle resume upload
    try {
      // Try different field names that might come from the frontend
      const resumeFieldNames = ["resume", "file"];
      let resumeFile = null;

      // Check req.files first (multipart/form-data with multiple files)
      if (req.files) {
        for (const fieldName of resumeFieldNames) {
          if (req.files[fieldName]) {
            resumeFile = Array.isArray(req.files[fieldName])
              ? req.files[fieldName][0]
              : req.files[fieldName];
            console.log(`Found resume in req.files.${fieldName}`);
            break;
          }
        }
      }

      // If not found in req.files, check req.file (single file upload)
      if (
        !resumeFile &&
        req.file &&
        resumeFieldNames.includes(req.file.fieldname)
      ) {
        resumeFile = req.file;
        console.log(
          `Found resume in req.file with fieldname ${req.file.fieldname}`
        );
      }

      if (resumeFile) {
        console.log("Processing resume file:", resumeFile.originalname);
        console.log(typeof resumeFile);
        console.log(resumeFile);

        const fileUri = getDataUri(resumeFile);
        console.log("Resume URI generated successfully");

        const cloudResponse = await cloudinary.v2.uploader.upload(fileUri, {
          folder: "user_resumes",
          resource_type: "auto", // Changed from "raw" to "auto" for better format detection
        });

        console.log("Resume uploaded to Cloudinary:", cloudResponse.secure_url);
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = resumeFile.originalname;
      }
    } catch (resumeError) {
      console.error("❌ Error processing resume:", resumeError);
      // Continue with the rest of the updates even if resume upload fails
    }

    await user.save();
    console.log("✅ User profile updated successfully");

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.clear();
    console.log("❌ Profile update error:", error);
    console.log("Error stack:", error.stack);
    res.status(500).json({
      message: "Server Error updating profile: " + error.message,
      success: false,
      error: error.message,
    });
  }
};
