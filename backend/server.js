
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to HireWise API!",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Resume Analyzer Routes
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`HireWise server running on port ${PORT}`);
  });
};

startServer();
