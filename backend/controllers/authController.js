
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// GET LOGGED-IN USER PROFILE


const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone || "",
        location: req.user.location || "",
        education: req.user.education || "",
        skills: req.user.skills || [],
        careerGoal: req.user.careerGoal || "",
        careerProgress: req.user.careerProgress || {
          goal: "Get my dream job",
          completedCourses: 0,
          completedProjects: 0,
          interviews: 0,
          skillsLearned: 0,
          activities: [],
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user profile",
    });
  }
};

// UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      education,
      skills,
      careerGoal,
      careerProgress,
    } = req.body || {};

    const updateData = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }
      updateData.name = name.trim();
    }

    if (phone !== undefined) updateData.phone = phone.trim();
    if (location !== undefined) updateData.location = location.trim();
    if (education !== undefined) updateData.education = education.trim();
    if (careerGoal !== undefined) updateData.careerGoal = careerGoal.trim();

    if (skills !== undefined) {
      if (!Array.isArray(skills)) {
        return res.status(400).json({
          success: false,
          message: "Skills must be an array",
        });
      }

      updateData.skills = skills
        .filter((skill) => typeof skill === "string" && skill.trim())
        .map((skill) => skill.trim());
    }

    if (careerProgress !== undefined) {
      if (
        !careerProgress ||
        typeof careerProgress !== "object" ||
        Array.isArray(careerProgress)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid career progress data",
        });
      }

      const {
        goal,
        completedCourses,
        completedProjects,
        interviews,
        skillsLearned,
        activities,
      } = careerProgress;

      const numbers = [
        completedCourses,
        completedProjects,
        interviews,
        skillsLearned,
      ];

      if (
        numbers.some(
          (value) =>
            !Number.isInteger(value) ||
            value < 0
        ) ||
        !Array.isArray(activities)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid career progress values",
        });
      }

      updateData.careerProgress = {
        goal: typeof goal === "string" ? goal.trim() : "Get my dream job",
        completedCourses,
        completedProjects,
        interviews,
        skillsLearned,
        activities: activities
          .filter(
            (activity) =>
              activity &&
              typeof activity.id === "string" &&
              typeof activity.title === "string" &&
              activity.title.trim()
          )
          .map((activity) => ({
            id: activity.id,
            title: activity.title.trim(),
          })),
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone || "",
        location: updatedUser.location || "",
        education: updatedUser.education || "",
        skills: updatedUser.skills || [],
        careerGoal: updatedUser.careerGoal || "",
        careerProgress: updatedUser.careerProgress || {},
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to change password",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
};
