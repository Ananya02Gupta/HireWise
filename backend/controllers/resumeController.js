
const pdfParse = require("pdf-parse");

// ANALYZE RESUME
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text || "";
    const text = resumeText.toLowerCase();

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text. Please upload a text-based PDF.",
      });
    }

    // Skills list
    const skillsList = [
      "HTML", "CSS", "JavaScript", "React", "Node.js",
      "Express.js", "MongoDB", "MySQL", "SQL", "Python",
      "Java", "C++", "C", "PHP", "Bootstrap", "Tailwind CSS",
      "Git", "GitHub", "REST API", "Firebase", "AWS",
      "Machine Learning", "Data Analysis", "Excel",
      "Communication", "Problem Solving", "Teamwork",
      "Leadership", "Time Management", "Figma",
      "TypeScript", "Next.js", "Redux", "PostgreSQL"
    ];

    const detectedSkills = skillsList.filter(skill =>
      text.includes(skill.toLowerCase())
    );

    // Section detection
    const sections = [
      "education",
      "experience",
      "skills",
      "projects",
      "certifications"
    ];

    const detectedSections = sections.filter(section =>
      text.includes(section)
    );

    // Calculate resume score
    let score = 0;

    score += Math.min(detectedSkills.length * 3, 45);
    score += Math.min(detectedSections.length * 8, 40);

    if (text.includes("@")) score += 5;
    if (text.includes("linkedin")) score += 5;
    if (text.includes("github")) score += 5;

    score = Math.min(score, 100);

    // Suggestions
    const suggestions = [];

    if (!text.includes("education")) {
      suggestions.push("Add a clear Education section.");
    }

    if (!text.includes("projects")) {
      suggestions.push("Include your academic or personal projects.");
    }

    if (!text.includes("experience")) {
      suggestions.push("Add internship or practical experience details.");
    }

    if (detectedSkills.length < 5) {
      suggestions.push("Add more relevant technical and professional skills.");
    }

    if (!text.includes("linkedin")) {
      suggestions.push("Add your LinkedIn profile link.");
    }

    if (!text.includes("github")) {
      suggestions.push("Add your GitHub profile link.");
    }

    if (suggestions.length === 0) {
      suggestions.push("Keep your resume updated with recent achievements.");
    }

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      result: {
        fileName: req.file.originalname,
        resumeScore: score,
        totalSkillsDetected: detectedSkills.length,
        detectedSkills,
        detectedSections,
        suggestions,
        extractedText: resumeText
      }
    });

  } catch (error) {
    console.error("Resume Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to analyze resume.",
      error: error.message
    });
  }
};

module.exports = { analyzeResume };
