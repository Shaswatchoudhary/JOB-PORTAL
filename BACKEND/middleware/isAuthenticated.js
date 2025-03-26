import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login to access this resource",
        success: false,
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData || !decodedData.userId) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Set user ID in request
    req.userId = decodedData.userId;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

// Middleware to check role
export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      if (!user.role || !roles.includes(user.role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
          success: false,
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({
        message: "Server Error during authorization",
        success: false,
      });
    }
  };
};
