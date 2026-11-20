
import { useState } from "react";
import { Download, FileText, Sparkles } from "lucide-react";
import jsPDF from "jspdf";

const CAREER_FIELDS = {
  "IT & Technology": [
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "Python", "Java", "SQL", "MongoDB", "Git"
  ],
  "Business & Management": [
    "Business Strategy", "Project Management", "Leadership",
    "Communication", "Team Management", "Planning",
    "Problem Solving", "MS Excel"
  ],
  "Marketing & Sales": [
    "Digital Marketing", "SEO", "Social Media Marketing",
    "Content Writing", "Google Analytics", "Sales",
    "Market Research", "Communication"
  ],
  "Finance & Accounting": [
    "Accounting", "Financial Analysis", "MS Excel",
    "Taxation", "Budgeting", "Auditing",
    "Financial Reporting", "Bookkeeping"
  ],
  "Education & Teaching": [
    "Lesson Planning", "Classroom Management",
    "Communication", "Curriculum Development",
    "Student Assessment", "Teaching", "Research"
  ],
  "Design & Creative": [
    "UI/UX Design", "Figma", "Adobe Photoshop",
    "Illustrator", "Graphic Design", "Typography",
    "Creativity", "Prototyping"
  ],
  "Healthcare": [
    "Patient Care", "Medical Terminology",
    "Clinical Documentation", "First Aid",
    "Communication", "Healthcare Management"
  ],
  "HR & Recruitment": [
    "Recruitment", "Talent Acquisition",
    "Employee Relations", "HR Management",
    "Communication", "Interviewing", "Payroll"
  ],
  "Customer Service": [
    "Communication", "Customer Support",
    "Problem Solving", "CRM", "Time Management",
    "Conflict Resolution", "Active Listening"
  ],
  "Law & Legal": [
    "Legal Research", "Legal Writing",
    "Case Analysis", "Contract Drafting",
    "Documentation", "Communication"
  ],
  "Government & General": [
    "Administration", "Public Speaking",
    "General Knowledge", "Communication",
    "MS Office", "Report Writing",
    "Problem Solving", "Time Management"
  ],
};

export default function ResumeBuilder() {
  const [field, setField] = useState("IT & Technology");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    summary: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    certifications: "",
    achievements: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  }

  function selectField(e) {
    setField(e.target.value);
    setMessage("");
  }

  function addSuggestedSkill(skill) {
    const currentSkills = form.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !currentSkills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setForm({
        ...form,
        skills: [...currentSkills, skill].join(", "),
      });
    }
  }

  function downloadResume() {
    if (!form.name.trim() || !form.email.trim()) {
      setMessage("Please enter your name and email first.");
      return;
    }

    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(form.name.trim(), 20, y);

    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const contact = [
      form.email,
      form.phone,
      form.location,
    ].filter(Boolean).join(" | ");

    const contactLines = doc.splitTextToSize(contact, 170);
    contactLines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 6;
    });

    if (form.role.trim()) {
      y += 3;
      doc.setFont("helvetica", "bold");
      doc.text(form.role, 20, y);
      y += 5;
    }

    const addSection = (heading, content) => {
      if (!content.trim()) return;

      y += 9;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(heading, 20, y);

      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const lines = doc.splitTextToSize(content, 170);

      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(line, 20, y);
        y += 6;
      });
    };

    addSection("PROFESSIONAL SUMMARY", form.summary);
    addSection("EDUCATION", form.education);
    addSection("SKILLS", form.skills);
    addSection("WORK EXPERIENCE", form.experience);
    addSection("PROJECTS / PRACTICAL WORK", form.projects);
    addSection("CERTIFICATIONS", form.certifications);
    addSection("ACHIEVEMENTS", form.achievements);

    doc.save("HireWise_Resume.pdf");
    setMessage("Your resume PDF has been downloaded successfully!");
  }

  const fields = [
    ["name", "Full Name", "Enter your full name"],
    ["email", "Email Address", "Enter your email"],
    ["phone", "Phone Number", "Enter your phone number"],
    ["location", "Location", "City, State"],
    ["role", "Target Job Role", "e.g. Teacher, Accountant, Designer"],
  ];

  const sections = [
    [
      "summary",
      "Professional Summary",
      "Write 3-4 lines about your career goals, strengths and experience...",
    ],
    [
      "education",
      "Education",
      "Degree, college/school, year, marks or percentage...",
    ],
    [
      "skills",
      "Professional Skills",
      "Add your skills separated by commas...",
    ],
    [
      "experience",
      "Work Experience / Internship",
      "Organization, job title, duration and responsibilities...",
    ],
    [
      "projects",
      "Projects / Practical Work",
      "Project name, your role and a short description...",
    ],
    [
      "certifications",
      "Certifications",
      "Certificate name, issuing organization and year...",
    ],
    [
      "achievements",
      "Achievements & Activities",
      "Awards, achievements, volunteering or extracurricular activities...",
    ],
  ];

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-2">

      <div className="surface rounded-2xl p-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-3">
            <FileText className="text-violet-500" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Resume Builder</h2>
            <p className="text-sm opacity-60">
              Build a professional resume for any career
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold">
            Select Your Career Field
          </label>

          <select
            value={field}
            onChange={selectField}
            className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-violet-500"
          >
            {Object.keys(CAREER_FIELDS).map((item) => (
              <option key={item} value={item} className="text-black">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold">
            Suggested Skills for {field}
          </label>

          <div className="flex flex-wrap gap-2">
            {CAREER_FIELDS[field].map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => addSuggestedSkill(skill)}
                className="rounded-full border border-violet-500/30 px-3 py-2 text-xs transition hover:bg-violet-500 hover:text-white"
              >
                + {skill}
              </button>
            ))}
          </div>

          <p className="mt-2 text-xs opacity-60">
            Click a skill to add it to your resume.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([name, label, placeholder]) => (
            <div key={name}>
              <label className="mb-2 block text-sm font-medium">
                {label}
              </label>

              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-violet-500"
              />
            </div>
          ))}
        </div>

        {sections.map(([name, label, placeholder]) => (
          <div className="mt-5" key={name}>
            <label className="mb-2 block text-sm font-medium">
              {label}
            </label>

            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              rows={3}
              className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-violet-500"
            />
          </div>
        ))}

        <button
          onClick={downloadResume}
          className="primary-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl p-3 font-semibold"
        >
          <Download size={18} />
          Download Resume PDF
        </button>

        {message && (
          <p className="mt-4 text-sm font-medium">
            {message}
          </p>
        )}
      </div>

      <div className="surface h-fit rounded-2xl p-6">

        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="text-violet-500" />
          <h2 className="text-xl font-bold">Live Resume Preview</h2>
        </div>

        <div className="min-h-[650px] rounded-xl bg-white p-7 text-gray-800 shadow-lg">

          <h1 className="break-words text-2xl font-bold text-violet-700">
            {form.name || "Your Name"}
          </h1>

          <p className="mt-2 break-words text-xs text-gray-500">
            {[form.email, form.phone, form.location]
              .filter(Boolean)
              .join(" | ") || "Email | Phone | Location"}
          </p>

          {form.role && (
            <p className="mt-2 text-sm font-semibold text-violet-600">
              {form.role}
            </p>
          )}

          <p className="mt-2 text-xs font-medium text-gray-500">
            Career Field: {field}
          </p>

          {sections.map(([name, label]) => (
            <div key={name} className="mt-7">
              <h3 className="border-b border-violet-300 pb-2 text-sm font-bold uppercase text-violet-700">
                {label}
              </h3>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">
                {form[name] || `Your ${label.toLowerCase()} will appear here.`}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
