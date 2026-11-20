
import { useState } from "react";
import {
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Plus,
  X,
  Save,
} from "lucide-react";

import { updateProfile } from "../services/authApi";

const fieldSkills = {
  "IT & Technology": [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "MongoDB", "SQL", "Git", "REST API", "Problem Solving",
  ],
  "Business & Management": [
    "Leadership", "Communication", "Project Management",
    "Decision Making", "Planning", "Team Management",
    "Business Strategy", "Negotiation", "Problem Solving",
    "Time Management",
  ],
  "Marketing & Sales": [
    "Digital Marketing", "SEO", "Social Media Marketing",
    "Content Writing", "Market Research", "Communication",
    "Sales Strategy", "Customer Relations", "Analytics",
    "Negotiation",
  ],
  "Finance & Accounting": [
    "Financial Analysis", "Accounting", "Excel",
    "Budgeting", "Taxation", "Auditing",
    "Financial Reporting", "Bookkeeping",
    "Analytical Thinking", "Communication",
  ],
  "Education & Teaching": [
    "Lesson Planning", "Classroom Management",
    "Communication", "Subject Knowledge",
    "Student Assessment", "Teaching Methods",
    "Time Management", "Presentation",
    "Patience", "Leadership",
  ],
  "Design & Creative": [
    "Graphic Design", "Figma", "Adobe Photoshop",
    "Adobe Illustrator", "UI Design", "UX Research",
    "Typography", "Creativity", "Wireframing",
    "Visual Communication",
  ],
  "Healthcare": [
    "Patient Care", "Medical Knowledge",
    "Communication", "First Aid", "Clinical Skills",
    "Medical Records", "Teamwork", "Patient Safety",
    "Time Management", "Problem Solving",
  ],
  "HR & Recruitment": [
    "Recruitment", "Interviewing", "Communication",
    "Employee Relations", "HR Management",
    "Conflict Resolution", "Onboarding",
    "Performance Management", "Excel", "Teamwork",
  ],
  "Customer Service": [
    "Communication", "Active Listening",
    "Problem Solving", "Customer Relations",
    "Conflict Resolution", "Time Management",
    "Product Knowledge", "Empathy",
    "Teamwork", "CRM Tools",
  ],
  "Law & Legal": [
    "Legal Research", "Legal Writing",
    "Contract Drafting", "Case Analysis",
    "Communication", "Critical Thinking",
    "Negotiation", "Documentation",
    "Attention to Detail", "Public Speaking",
  ],
  "Government & General": [
    "General Knowledge", "Communication",
    "Analytical Thinking", "Computer Skills",
    "Current Affairs", "Time Management",
    "Problem Solving", "Reasoning",
    "Decision Making", "Leadership",
  ],
};

const suggestions = {
  "IT & Technology":
    "Practice coding, build projects, and learn modern development tools.",
  "Business & Management":
    "Improve leadership, planning, and decision-making through practical projects.",
  "Marketing & Sales":
    "Learn digital marketing tools and practice creating marketing campaigns.",
  "Finance & Accounting":
    "Practice financial analysis, Excel, budgeting, and accounting concepts.",
  "Education & Teaching":
    "Improve lesson planning, presentation, and classroom management skills.",
  "Design & Creative":
    "Build a design portfolio and practice using professional design tools.",
  Healthcare:
    "Strengthen clinical knowledge, patient communication, and safety practices.",
  "HR & Recruitment":
    "Practice interviewing, recruitment processes, and employee management.",
  "Customer Service":
    "Practice communication, active listening, and handling customer complaints.",
  "Law & Legal":
    "Improve legal research, case analysis, and legal writing skills.",
  "Government & General":
    "Prepare current affairs, reasoning, general knowledge, and computer skills.",
};

function getSavedSkills() {
  try {
    const user = JSON.parse(
      localStorage.getItem("hirewise-user") || "{}"
    );

    return Array.isArray(user.skills) ? user.skills : [];
  } catch {
    return [];
  }
}

export default function SkillInsights() {
  const [field, setField] = useState("IT & Technology");
  const [mySkills, setMySkills] = useState(getSavedSkills);
  const [newSkill, setNewSkill] = useState("");
  const [message, setMessage] = useState("");

  
  async function saveSkills(updatedSkills) {
    const uniqueSkills = [
      ...new Map(
        updatedSkills
          .map((skill) => skill.trim())
          .filter(Boolean)
          .map((skill) => [skill.toLowerCase(), skill])
      ).values(),
    ];

    setMySkills(uniqueSkills);
    setMessage("Saving skills...");
    
    try {
      const token = localStorage.getItem("hirewise-token");

      if (!token) {
        throw new Error("Please login again to save your skills.");
      }

      const result = await updateProfile(
        { skills: uniqueSkills },
        token
      );

      const updatedUser = result.user || result;

      const existingUser = JSON.parse(
        localStorage.getItem("hirewise-user") || "{}"
      );

      const finalUser = {
        ...existingUser,
        ...updatedUser,
        skills: uniqueSkills,
      };

      localStorage.setItem(
        "hirewise-user",
        JSON.stringify(finalUser)
      );

      window.dispatchEvent(
        new CustomEvent("hirewise-profile-updated", {
          detail: finalUser,
        })
      );

      setMessage("Skills saved successfully!");
    } catch (error) {
      console.error("Unable to save skills:", error);
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Could not save skills. Please try again."
      );
    }
  }


  function addSkill(skill = newSkill) {
    const skillsToAdd = skill
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (skillsToAdd.length === 0) return;

    const updatedSkills = [...mySkills, ...skillsToAdd];

    saveSkills(updatedSkills);
    setNewSkill("");
  }

  function removeSkill(skillToRemove) {
    const updatedSkills = mySkills.filter(
      (skill) =>
        skill.toLowerCase() !== skillToRemove.toLowerCase()
    );

    saveSkills(updatedSkills);
  }

  const requiredSkills = fieldSkills[field];

  const enteredSkills = mySkills.map((skill) =>
    skill.trim().toLowerCase()
  );

  const matchedSkills = requiredSkills.filter((skill) =>
    enteredSkills.includes(skill.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !enteredSkills.includes(skill.toLowerCase())
  );

  const percentage = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-semibold text-indigo-500">
          CAREER DEVELOPMENT
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Skill Insights
        </h1>

        <p className="mt-2 text-gray-500">
          Discover your strengths and identify the skills you need for your career.
        </p>
      </div>

      {/* Career Field */}

      <div className="surface rounded-2xl p-6">

        <label className="mb-2 block font-semibold">
          Select Your Career Field
        </label>

        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-indigo-500"
        >
          {Object.keys(fieldSkills).map((item) => (
            <option
              key={item}
              value={item}
              className="text-black"
            >
              {item}
            </option>
          ))}
        </select>

        {/* Add Skills */}

        <label className="mb-2 mt-6 block font-semibold">
          Add Your Skills
        </label>

        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSkill();
            }}
            placeholder="Enter skills separated by commas"
            className="min-w-0 flex-1 rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={() => addSkill()}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 text-white"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          You can enter one or multiple skills separated by commas.
        </p>

        {/* Current Skills */}

        <div className="mt-5">
          <h3 className="mb-3 font-semibold">
            My Current Skills ({mySkills.length})
          </h3>

          <div className="flex flex-wrap gap-2">
            {mySkills.length === 0 ? (
              <p className="text-sm text-gray-500">
                No skills added yet.
              </p>
            ) : (
              mySkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-2 rounded-lg bg-indigo-100 px-3 py-2 text-sm text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                >
                  {skill}

                  <button
                    onClick={() => removeSkill(skill)}
                    title={`Remove ${skill}`}
                    className="text-red-500"
                  >
                    <X size={15} />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {message && (
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
            <Save size={16} />
            {message}
          </p>
        )}
      </div>

      {/* Suggested Skills */}

      <div className="surface rounded-2xl p-6">
        <h2 className="mb-3 font-bold">
          Suggested Skills for {field}
        </h2>

        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="rounded-full border border-indigo-500/30 px-3 py-2 text-xs transition hover:bg-indigo-600 hover:text-white"
            >
              + {skill}
            </button>
          ))}
        </div>

        {missingSkills.length === 0 && (
          <p className="text-sm text-green-600">
            You have matched all the sample skills for this field!
          </p>
        )}
      </div>

      {/* Skill Statistics */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-950/40">
          <Target className="mb-3 text-indigo-500" size={26} />
          <p className="text-sm text-gray-500">Skill Match</p>
          <h2 className="text-3xl font-bold">{percentage}%</h2>
        </div>

        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/30">
          <CheckCircle className="mb-3 text-green-600" size={26} />
          <p className="text-sm text-gray-500">Matched Skills</p>
          <h2 className="text-3xl font-bold">
            {matchedSkills.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/30">
          <AlertCircle className="mb-3 text-orange-500" size={26} />
          <p className="text-sm text-gray-500">Skills to Learn</p>
          <h2 className="text-3xl font-bold">
            {missingSkills.length}
          </h2>
        </div>

      </div>

      {/* Progress Bar */}

      <div className="surface rounded-2xl p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Your Skill Match Progress
          </h2>

          <span className="font-bold text-indigo-600">
            {percentage}%
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-3 rounded-full bg-indigo-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Matched and Missing Skills */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div className="surface rounded-2xl p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <CheckCircle className="text-green-500" />
            Your Matched Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {matchedSkills.length ? (
              matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No matched skills yet.
              </p>
            )}
          </div>
        </div>

        <div className="surface rounded-2xl p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <BookOpen className="text-orange-500" />
            Skills to Improve
          </h2>

          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-orange-100 px-3 py-2 text-sm text-orange-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Career Tips */}

      <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="text-indigo-600" />
          <h2 className="text-lg font-bold">
            Career Improvement Tips
          </h2>
        </div>

        <p className="text-gray-700 dark:text-gray-200">
          {suggestions[field]}
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Skill match is based on your entered skills and this field's sample skill list.
          It is an estimate, not a professional assessment.
        </p>
      </div>

    </div>
  );
}
