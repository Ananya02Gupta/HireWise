
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  Award,
  Trash2,
} from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const FIELD_SKILLS = {
  "IT & Technology": [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "Express", "MongoDB", "SQL", "Python", "Java",
    "Git", "GitHub", "Tailwind CSS", "REST API",
    "Firebase", "TypeScript", "Problem Solving",
  ],

  "Business & Management": [
    "Leadership", "Project Management", "Business Strategy",
    "Team Management", "Decision Making", "Planning",
    "Negotiation", "Communication", "Time Management",
    "Problem Solving", "Operations Management",
  ],

  "Marketing & Sales": [
    "Digital Marketing", "SEO", "Social Media Marketing",
    "Content Writing", "Market Research", "Sales",
    "Communication", "Google Analytics", "Email Marketing",
    "Negotiation", "Customer Relations",
  ],

  "Finance & Accounting": [
    "Financial Analysis", "Accounting", "Excel",
    "Budgeting", "Taxation", "Auditing",
    "Financial Reporting", "Bookkeeping",
    "Tally", "Financial Management",
  ],

  "Education & Teaching": [
    "Lesson Planning", "Classroom Management",
    "Communication", "Teaching", "Subject Knowledge",
    "Student Assessment", "Presentation",
    "Curriculum Development", "Time Management",
    "Educational Technology",
  ],

  "Design & Creative": [
    "Graphic Design", "Figma", "Adobe Photoshop",
    "Adobe Illustrator", "UI Design", "UX Research",
    "Typography", "Wireframing", "Creativity",
    "Video Editing", "Canva",
  ],

  "Healthcare": [
    "Patient Care", "Medical Knowledge", "First Aid",
    "Clinical Skills", "Medical Records", "Patient Safety",
    "Communication", "Healthcare Administration",
    "Teamwork", "Clinical Documentation",
  ],

  "HR & Recruitment": [
    "Recruitment", "Interviewing", "Communication",
    "Employee Relations", "HR Management",
    "Conflict Resolution", "Onboarding",
    "Performance Management", "Payroll",
    "Talent Acquisition",
  ],

  "Customer Service": [
    "Communication", "Active Listening",
    "Problem Solving", "Customer Relations",
    "Conflict Resolution", "Time Management",
    "CRM", "Customer Support", "Empathy",
    "Complaint Handling",
  ],

  "Law & Legal": [
    "Legal Research", "Legal Writing",
    "Contract Drafting", "Case Analysis",
    "Communication", "Critical Thinking",
    "Negotiation", "Documentation",
    "Legal Documentation", "Public Speaking",
  ],

  "Government & General": [
    "General Knowledge", "Communication",
    "Analytical Thinking", "Computer Skills",
    "Current Affairs", "Time Management",
    "Problem Solving", "Reasoning",
    "Decision Making", "MS Office",
  ],
};

const SECTION_LIST = [
  {
    name: "Contact Information",
    keywords: ["@", "phone", "contact", "mobile", "email"],
  },
  {
    name: "Education",
    keywords: ["education", "degree", "university", "college", "academic"],
  },
  {
    name: "Skills",
    keywords: ["skills", "key skills", "core competencies", "expertise"],
  },
  {
    name: "Experience",
    keywords: ["experience", "work history", "employment", "professional experience"],
  },
  {
    name: "Projects / Achievements",
    keywords: ["projects", "achievements", "portfolio", "accomplishments"],
  },
  {
    name: "Certifications",
    keywords: ["certification", "certificate", "certifications", "licenses"],
  },
];

export default function ResumeAnalyzer() {
  const [field, setField] = useState("IT & Technology");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function analyzeResume(selectedFile) {
    setError("");
    setResult(null);

    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
    setLoading(true);

    try {
      const buffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
      }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        fullText +=
          content.items.map((item) => item.str).join(" ") + "\n";
      }

      if (fullText.trim().length < 30) {
        throw new Error(
          "No readable text found. Please upload a text-based PDF resume."
        );
      }

      const text = fullText.toLowerCase();

      // Detect skills according to the selected career field
      const relevantSkills = FIELD_SKILLS[field];

      const foundSkills = relevantSkills.filter((skill) =>
        text.includes(skill.toLowerCase())
      );

      const missingSkills = relevantSkills.filter(
        (skill) => !foundSkills.includes(skill)
      );

      // Detect resume sections
      const completed = SECTION_LIST.filter((section) =>
        section.keywords.some((word) => text.includes(word))
      );

      // Generate improvement suggestions
      const suggestions = [];

      if (!text.includes("@")) {
        suggestions.push("Add a professional email address.");
      }

      if (!completed.some((item) => item.name === "Education")) {
        suggestions.push("Add a clear Education section.");
      }

      if (!completed.some((item) => item.name === "Skills")) {
        suggestions.push("Add a dedicated Skills or Core Competencies section.");
      }

      if (!completed.some((item) => item.name === "Experience")) {
        suggestions.push(
          "Add relevant work experience, internships, volunteering or practical training."
        );
      }

      if (!completed.some((item) => item.name === "Projects / Achievements")) {
        suggestions.push(
          "Include relevant projects, achievements or professional accomplishments."
        );
      }

      if (!completed.some((item) => item.name === "Certifications")) {
        suggestions.push(
          "Add relevant certifications, licenses or completed courses if available."
        );
      }

      if (foundSkills.length < 5) {
        suggestions.push(
          `Add more relevant ${field} skills that match your actual knowledge and experience.`
        );
      }

      if (text.length < 1000) {
        suggestions.push(
          "Your resume looks short. Add more useful details about your education, experience and achievements."
        );
      }

      if (suggestions.length === 0) {
        suggestions.push(
          "Keep your resume updated with recent skills, experience and achievements."
        );
      }

      // Rule-based score
      const sectionScore =
        (completed.length / SECTION_LIST.length) * 60;

      const skillScore =
        (Math.min(foundSkills.length, 8) / 8) * 40;

      const score = Math.min(
        100,
        Math.round(sectionScore + skillScore)
      );

      setResult({
        text: fullText,
        field,
        score,
        skills: foundSkills,
        missingSkills,
        sections: completed.map((item) => item.name),
        allSections: SECTION_LIST.map((item) => item.name),
        totalSections: SECTION_LIST.length,
        suggestions,
        pages: pdf.numPages,
      });
    } catch (err) {
      setError(err.message || "Unable to analyse this PDF.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError("");
  }

  return (
    <div className="mt-9 space-y-7">
      <div>
        <p className="primary-text font-bold uppercase tracking-widest text-sm">
          Resume Tools
        </p>

        <h2 className="mt-2 text-3xl font-extrabold">
          Resume Analyzer
        </h2>

        <p className="muted mt-2">
          Analyze your resume according to your chosen professional field.
        </p>
      </div>

      <div className="surface rounded-2xl p-7 space-y-5">
        <div>
          <label className="mb-2 block font-bold">
            Select Your Career Field
          </label>

          <select
            value={field}
            onChange={(e) => {
              setField(e.target.value);
              setResult(null);
              setFile(null);
              setError("");
            }}
            className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none"
          >
            {Object.keys(FIELD_SKILLS).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <p className="muted mt-2 text-xs">
            Skills will be checked according to the selected field.
          </p>
        </div>

        <div className="text-center">
          <div className="soft-bg primary-text mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
            <Upload size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold">
            Upload Your Resume
          </h3>

          <p className="muted mt-2 text-sm">
            PDF format only · Maximum 5 MB
          </p>

          <label className="primary-button mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl px-7 py-3 font-bold">
            <Upload size={18} />
            Choose PDF

            <input
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) analyzeResume(selected);
                e.target.value = "";
              }}
            />
          </label>
        </div>

        {file && (
          <div className="surface mt-6 flex items-center gap-3 rounded-xl border p-4">
            <FileText className="primary-text" size={25} />

            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{file.name}</p>
              <p className="muted text-xs">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button onClick={reset} aria-label="Remove resume">
              <Trash2 className="muted" size={19} />
            </button>
          </div>
        )}

        {loading && (
          <p className="primary-text mt-6 text-center font-semibold">
            Analysing your resume...
          </p>
        )}

        {error && (
          <p className="mt-5 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle size={18} />
            {error}
          </p>
        )}
      </div>

      {result && (
        <>
          <div className="surface rounded-2xl p-5">
            <p className="muted text-sm">Selected Career Field</p>
            <h3 className="mt-1 text-xl font-bold">{result.field}</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="surface rounded-2xl p-6">
              <Award className="primary-text" size={27} />
              <p className="muted mt-4 text-sm">Resume Score</p>
              <h3 className="mt-1 text-3xl font-extrabold">
                {result.score}/100
              </h3>
            </div>

            <div className="surface rounded-2xl p-6">
              <Target className="primary-text" size={27} />
              <p className="muted mt-4 text-sm">Skills Found</p>
              <h3 className="mt-1 text-3xl font-extrabold">
                {result.skills.length}
              </h3>
            </div>

            <div className="surface rounded-2xl p-6">
              <FileText className="primary-text" size={27} />
              <p className="muted mt-4 text-sm">PDF Pages</p>
              <h3 className="mt-1 text-3xl font-extrabold">
                {result.pages}
              </h3>
            </div>
          </div>

          <div className="surface rounded-2xl p-7">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <CheckCircle2 className="primary-text" />
              Detected Skills
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              {result.skills.length ? (
                result.skills.map((skill) => (
                  <span
                    key={skill}
                    className="soft-bg primary-text rounded-full px-4 py-2 text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="muted text-sm">
                  No listed skills detected for this field.
                </p>
              )}
            </div>
          </div>

          <div className="surface rounded-2xl p-7">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <Target className="primary-text" />
              Skills You Can Improve
            </h3>

            <p className="muted mt-2 text-sm">
              These are sample skills for {result.field}. Add only the skills
              you genuinely know to your resume.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {result.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-orange-500/10 px-4 py-2 text-sm text-orange-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-7">
            <h3 className="text-xl font-bold">Resume Sections</h3>

            <p className="muted mt-2 text-sm">
              {result.sections.length} of {result.totalSections} sections detected.
            </p>

            <div className="mt-5 space-y-3">
              {result.allSections.map((section) => (
                <div
                  key={section}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="font-medium">{section}</span>

                  {result.sections.includes(section) ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : (
                    <AlertCircle className="text-orange-500" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-7">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <Sparkles className="primary-text" />
              Improvement Suggestions
            </h3>

            <div className="mt-5 space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="soft-bg flex items-start gap-3 rounded-xl p-4"
                >
                  <Target className="primary-text mt-1 shrink-0" size={18} />
                  <p className="text-sm leading-6">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-6">
            <h3 className="font-bold">Extracted Resume Text</h3>

            <textarea
              readOnly
              value={result.text}
              className="surface mt-4 min-h-48 w-full resize-y rounded-xl border p-4 text-sm leading-6 outline-none"
            />
          </div>

          <button
            onClick={reset}
            className="primary-button rounded-xl px-6 py-3 font-bold"
          >
            Analyse Another Resume
          </button>

          <p className="muted text-xs">
            Note: This is a rule-based analysis, not an AI evaluation.
            Skill matching checks text keywords and may miss synonyms or
            differently written skills. Scanned image PDFs may not contain
            extractable text.
          </p>
        </>
      )}
    </div>
  );
}
