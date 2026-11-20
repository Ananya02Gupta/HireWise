
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Building2,
} from "lucide-react";

const jobs = [
  // IT & TECHNOLOGY
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    field: "IT & Technology",
    location: "Remote",
    type: "Internship",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description: "Build responsive websites and modern user interfaces.",
  },
  {
    id: 2,
    title: "Software Developer",
    company: "NextGen Technologies",
    field: "IT & Technology",
    location: "Delhi",
    type: "Full-time",
    skills: ["Java", "Python", "SQL", "Problem Solving"],
    description: "Develop software applications and maintain existing systems.",
  },
  {
    id: 3,
    title: "IT Support Executive",
    company: "Digital Systems",
    field: "IT & Technology",
    location: "Jammu",
    type: "Full-time",
    skills: ["Troubleshooting", "Networking", "Computer Skills"],
    description: "Provide technical support and solve system-related issues.",
  },

  // BUSINESS & MANAGEMENT
  {
    id: 4,
    title: "Business Development Executive",
    company: "GrowthPoint",
    field: "Business & Management",
    location: "Delhi",
    type: "Full-time",
    skills: ["Communication", "Negotiation", "Business Strategy"],
    description: "Identify business opportunities and build client relationships.",
  },
  {
    id: 5,
    title: "Management Trainee",
    company: "BrightPath Group",
    field: "Business & Management",
    location: "Mumbai",
    type: "Internship",
    skills: ["Leadership", "Planning", "Team Management"],
    description: "Learn business operations and management practices.",
  },
  {
    id: 6,
    title: "Operations Coordinator",
    company: "Urban Services",
    field: "Business & Management",
    location: "Remote",
    type: "Full-time",
    skills: ["Coordination", "Planning", "Time Management"],
    description: "Coordinate daily operations and improve work processes.",
  },

  // MARKETING & SALES
  {
    id: 7,
    title: "Digital Marketing Intern",
    company: "MarketPro",
    field: "Marketing & Sales",
    location: "Remote",
    type: "Internship",
    skills: ["SEO", "Social Media", "Content Writing"],
    description: "Assist with digital campaigns and online brand promotion.",
  },
  {
    id: 8,
    title: "Sales Executive",
    company: "SalesBridge",
    field: "Marketing & Sales",
    location: "Jammu",
    type: "Full-time",
    skills: ["Communication", "Sales", "Negotiation"],
    description: "Connect with customers and help achieve sales targets.",
  },
  {
    id: 9,
    title: "Marketing Associate",
    company: "BrandSpark",
    field: "Marketing & Sales",
    location: "Pune",
    type: "Part-time",
    skills: ["Market Research", "Analytics", "Marketing"],
    description: "Support marketing research and promotional activities.",
  },

  // FINANCE & ACCOUNTING
  {
    id: 10,
    title: "Junior Accountant",
    company: "FinEdge Services",
    field: "Finance & Accounting",
    location: "Delhi",
    type: "Full-time",
    skills: ["Accounting", "Excel", "Bookkeeping"],
    description: "Maintain financial records and assist with accounting tasks.",
  },
  {
    id: 11,
    title: "Finance Intern",
    company: "Capital Connect",
    field: "Finance & Accounting",
    location: "Remote",
    type: "Internship",
    skills: ["Financial Analysis", "Excel", "Budgeting"],
    description: "Assist the finance team with reports and financial analysis.",
  },
  {
    id: 12,
    title: "Accounts Assistant",
    company: "LedgerWorks",
    field: "Finance & Accounting",
    location: "Mumbai",
    type: "Full-time",
    skills: ["Taxation", "Accounting", "Documentation"],
    description: "Support accounts management and financial documentation.",
  },

  // EDUCATION & TEACHING
  {
    id: 13,
    title: "Teaching Assistant",
    company: "Learning Tree Academy",
    field: "Education & Teaching",
    location: "Jammu",
    type: "Part-time",
    skills: ["Communication", "Lesson Planning", "Teaching"],
    description: "Support classroom activities and student learning.",
  },
  {
    id: 14,
    title: "Online Tutor",
    company: "EduConnect",
    field: "Education & Teaching",
    location: "Remote",
    type: "Part-time",
    skills: ["Subject Knowledge", "Presentation", "Teaching"],
    description: "Teach students through online classes and learning sessions.",
  },
  {
    id: 15,
    title: "Academic Coordinator",
    company: "Future Scholars",
    field: "Education & Teaching",
    location: "Delhi",
    type: "Full-time",
    skills: ["Coordination", "Planning", "Communication"],
    description: "Coordinate academic activities and support teachers.",
  },

  // DESIGN & CREATIVE
  {
    id: 16,
    title: "Graphic Design Intern",
    company: "Creative Pixel",
    field: "Design & Creative",
    location: "Remote",
    type: "Internship",
    skills: ["Photoshop", "Illustrator", "Creativity"],
    description: "Create visual content for digital and marketing campaigns.",
  },
  {
    id: 17,
    title: "UI/UX Designer",
    company: "DesignSpace",
    field: "Design & Creative",
    location: "Bangalore",
    type: "Full-time",
    skills: ["Figma", "Wireframing", "UX Research"],
    description: "Design user-friendly digital experiences and interfaces.",
  },
  {
    id: 18,
    title: "Content Creator",
    company: "Visual Media Studio",
    field: "Design & Creative",
    location: "Mumbai",
    type: "Contract",
    skills: ["Creativity", "Video Editing", "Storytelling"],
    description: "Create engaging visual and multimedia content.",
  },

  // HEALTHCARE
  {
    id: 19,
    title: "Healthcare Assistant",
    company: "CareFirst Centre",
    field: "Healthcare",
    location: "Jammu",
    type: "Full-time",
    skills: ["Patient Care", "Communication", "Teamwork"],
    description: "Assist healthcare professionals with patient support.",
  },
  {
    id: 20,
    title: "Medical Records Assistant",
    company: "HealthBridge",
    field: "Healthcare",
    location: "Delhi",
    type: "Full-time",
    skills: ["Medical Records", "Documentation", "Computer Skills"],
    description: "Maintain and organize healthcare records.",
  },
  {
    id: 21,
    title: "Healthcare Administration Intern",
    company: "Wellness Network",
    field: "Healthcare",
    location: "Remote",
    type: "Internship",
    skills: ["Administration", "Communication", "Organization"],
    description: "Learn healthcare administration and coordination.",
  },

  // HR & RECRUITMENT
  {
    id: 22,
    title: "HR Intern",
    company: "PeopleFirst",
    field: "HR & Recruitment",
    location: "Delhi",
    type: "Internship",
    skills: ["Recruitment", "Communication", "Interviewing"],
    description: "Assist with hiring, onboarding and HR activities.",
  },
  {
    id: 23,
    title: "Recruitment Executive",
    company: "TalentBridge",
    field: "HR & Recruitment",
    location: "Remote",
    type: "Full-time",
    skills: ["Recruitment", "Screening", "Coordination"],
    description: "Manage candidate screening and recruitment processes.",
  },

  // CUSTOMER SERVICE
  {
    id: 24,
    title: "Customer Support Executive",
    company: "HelpDesk Solutions",
    field: "Customer Service",
    location: "Jammu",
    type: "Full-time",
    skills: ["Communication", "Problem Solving", "Active Listening"],
    description: "Help customers resolve queries and service-related issues.",
  },
  {
    id: 25,
    title: "Customer Care Associate",
    company: "ConnectNow",
    field: "Customer Service",
    location: "Remote",
    type: "Part-time",
    skills: ["Customer Relations", "Empathy", "Communication"],
    description: "Provide customer assistance through calls and messages.",
  },

  // LAW & LEGAL
  {
    id: 26,
    title: "Legal Research Intern",
    company: "LexPoint Associates",
    field: "Law & Legal",
    location: "Delhi",
    type: "Internship",
    skills: ["Legal Research", "Case Analysis", "Legal Writing"],
    description: "Assist with legal research and case documentation.",
  },
  {
    id: 27,
    title: "Legal Assistant",
    company: "Justice Legal Services",
    field: "Law & Legal",
    location: "Mumbai",
    type: "Full-time",
    skills: ["Documentation", "Legal Research", "Communication"],
    description: "Support legal professionals with documentation and research.",
  },

  // GOVERNMENT & GENERAL
  {
    id: 28,
    title: "Administrative Assistant",
    company: "Public Services Group",
    field: "Government & General",
    location: "Jammu",
    type: "Full-time",
    skills: ["Administration", "Computer Skills", "Documentation"],
    description: "Assist with office administration and general operations.",
  },
  {
    id: 29,
    title: "Office Assistant",
    company: "National Support Services",
    field: "Government & General",
    location: "Delhi",
    type: "Contract",
    skills: ["MS Office", "Communication", "Organization"],
    description: "Support routine office activities and record management.",
  },
  {
    id: 30,
    title: "General Administration Trainee",
    company: "CareerPath Services",
    field: "Government & General",
    location: "Remote",
    type: "Internship",
    skills: ["General Knowledge", "Computer Skills", "Communication"],
    description: "Learn administrative processes and office coordination.",
  },
];

const fields = [
  "IT & Technology",
  "Business & Management",
  "Marketing & Sales",
  "Finance & Accounting",
  "Education & Teaching",
  "Design & Creative",
  "Healthcare",
  "HR & Recruitment",
  "Customer Service",
  "Law & Legal",
  "Government & General",
];

export default function FindJobs() {
  const [search, setSearch] = useState("");
  const [field, setField] = useState("All");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = [
        job.title,
        job.company,
        job.field,
        job.location,
        job.type,
        job.description,
        ...job.skills,
      ].join(" ").toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesField = field === "All" || job.field === field;
      const matchesLocation = location === "All" || job.location === location;
      const matchesType = type === "All" || job.type === type;

      return matchesSearch && matchesField && matchesLocation && matchesType;
    });
  }, [search, field, location, type]);

  function toggleSave(id) {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id]
    );
  }

  function applyJob(id) {
    setAppliedJobs((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Find Jobs</h2>
        <p className="mt-2 text-sm opacity-60">
          Explore career opportunities across different professional fields.
        </p>
      </div>

      <div className="surface grid gap-4 rounded-2xl p-5 md:grid-cols-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3.5 opacity-50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job, company, field or skill..."
            className="w-full rounded-xl border border-gray-300/30 bg-transparent py-3 pl-10 pr-3 outline-none"
          />
        </div>

        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="rounded-xl border border-gray-300/30 bg-transparent p-3"
        >
          <option value="All">All Career Fields</option>
          {fields.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-xl border border-gray-300/30 bg-transparent p-3"
        >
          <option value="All">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="Jammu">Jammu</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-gray-300/30 bg-transparent p-3"
        >
          <option value="All">All Job Types</option>
          <option value="Internship">Internship</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="surface rounded-xl px-4 py-3">
          <span className="text-sm opacity-60">Available Listings</span>
          <p className="text-xl font-bold">{filteredJobs.length}</p>
        </div>

        <div className="surface rounded-xl px-4 py-3">
          <span className="text-sm opacity-60">Saved Jobs</span>
          <p className="text-xl font-bold">{savedJobs.length}</p>
        </div>

        <div className="surface rounded-xl px-4 py-3">
          <span className="text-sm opacity-60">Applied Jobs</span>
          <p className="text-xl font-bold">{appliedJobs.length}</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredJobs.map((job) => {
          const isSaved = savedJobs.includes(job.id);
          const isApplied = appliedJobs.includes(job.id);

          return (
            <div key={job.id} className="surface rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-block rounded-lg bg-violet-500/10 px-3 py-1 text-xs text-violet-500 mb-3">
                    {job.field}
                  </span>
                  <h3 className="text-lg font-bold">{job.title}</h3>
                  <p className="mt-1 opacity-70 flex items-center gap-2">
                    <Building2 size={15} />
                    {job.company}
                  </p>
                </div>

                <button
                  onClick={() => toggleSave(job.id)}
                  title={isSaved ? "Remove saved job" : "Save job"}
                  className="rounded-xl border border-gray-300/30 p-3"
                >
                  {isSaved ? (
                    <BookmarkCheck className="text-violet-500" />
                  ) : (
                    <Bookmark />
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm opacity-70">
                <span className="flex items-center gap-1">
                  <MapPin size={15} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={15} /> {job.type}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 opacity-80">
                {job.description}
              </p>

              <p className="mt-4 text-xs font-semibold opacity-60">
                REQUIRED SKILLS
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs text-violet-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                onClick={() => applyJob(job.id)}
                disabled={isApplied}
                className="primary-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl p-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isApplied ? "Application Marked" : "Apply Now"}
                <ExternalLink size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="surface rounded-2xl p-10 text-center">
          <Search className="mx-auto mb-3 opacity-50" size={32} />
          <h3 className="font-bold">No jobs found</h3>
          <p className="mt-2 text-sm opacity-60">
            Try changing your search or filters.
          </p>
        </div>
      )}

      <p className="text-xs opacity-50">
        These 30 listings are sample demo data, not verified live vacancies.
        Apply Now only marks a listing inside this demo and does not submit a real application.
      </p>
    </div>
  );
}
