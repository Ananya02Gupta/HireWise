
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Career profile details
    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    careerGoal: {
      type: String,
      default: "",
    },
    careerProgress: {
  type: mongoose.Schema.Types.Mixed,
  default: {
    goal: "Get my dream job",
    completedCourses: 0,
    completedProjects: 0,
    interviews: 0,
    skillsLearned: 0,
    activities: [],
  },
},
    // Forgot Password OTP
    resetPasswordOTP: {
      type: String,
      default: null,
    },

    resetPasswordOTPExpires: {
      type: Date,
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
