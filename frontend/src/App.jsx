
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

import {
  BrainCircuit, Moon, Sun, ArrowRight, LayoutDashboard,
  FileText, Briefcase, MessageSquare, Settings, LogOut,
  Menu, X, Sparkles, User, Target, ChartNoAxesCombined,
  Lock, Mail, Eye, EyeOff, CheckCircle2
} from "lucide-react";

import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
} from "./services/authApi";

import ResumeAnalyzer from "./components/ResumeAnalyzer";
import ResumeBuilder from "./components/ResumeBuilder";
import FindJobs from "./components/FindJobs";
import InterviewCoach from "./components/InterviewCoach";
import SkillInsights from "./components/SkillInsights";
import CareerProgress from "./components/CareerProgress";
import { changePassword } from "./services/authApi";

function AppContent() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("hirewise-theme") === "dark"
  );

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("hirewise-theme", dark ? "dark" : "light");
  }, [dark]);

  // Restore login session and verify token
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("hirewise-token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const result = await getMe(token);
        setUser(result.user);
      } catch (error) {
        localStorage.removeItem("hirewise-token");
        localStorage.removeItem("hirewise-user");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
  const handleProfileUpdate = (event) => {
    setUser(event.detail);

    localStorage.setItem(
      "hirewise-user",
      JSON.stringify(event.detail)
    );
  };

  window.addEventListener(
    "hirewise-profile-updated",
    handleProfileUpdate
  );

  return () => {
    window.removeEventListener(
      "hirewise-profile-updated",
      handleProfileUpdate
    );
  };
}, []);

  function logout() {
    localStorage.removeItem("hirewise-token");
    localStorage.removeItem("hirewise-user");
    setUser(null);
    setMenu(false);
  }

  const theme = () => setDark(!dark);

  return (
    <div className={`app ${dark ? "dark" : ""} min-h-screen`}>
      <Routes>
        <Route
          path="/"
          element={<Home dark={dark} theme={theme} user={user} />}
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage type="login" setUser={setUser} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage type="signup" setUser={setUser} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            authLoading ? (
              <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg font-bold">Loading HireWise...</p>
              </div>
            ) : user ? (
              <Dashboard
                user={user}
                dark={dark}
                theme={theme}
                logout={logout}
                menu={menu}
                setMenu={setMenu}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function Home({ dark, theme, user }) {
  return (
    <>
      <header className="site-nav sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <BrainCircuit className="primary-text" size={32} />
            <span className="text-2xl font-extrabold">
              Hire<span className="primary-text">Wise</span>
            </span>
          </Link>

          <div className="hidden gap-8 md:flex">
            <a href="#features" className="muted">Features</a>
            <a href="#how-it-works" className="muted">How It Works</a>
            <a href="#about" className="muted">About</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={theme} className="surface rounded-xl p-3">
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {user ? (
              <Link to="/dashboard" className="primary-button rounded-xl px-5 py-3 font-bold">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden font-semibold sm:block">
                  Login
                </Link>
                <Link to="/signup" className="primary-button rounded-xl px-5 py-3 font-bold">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <section className="hero-gradient">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <div className="soft-bg primary-text inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold">
              <Sparkles size={17} /> Your AI-powered career companion
            </div>

            <h1 className="hero-title mt-7 text-5xl font-black sm:text-7xl">
              Build Your <span className="primary-text">Dream Career</span> With Confidence.
            </h1>

            <p className="muted mt-7 text-lg leading-8">
              Analyze your resume, discover better job opportunities and prepare
              for interviews with your intelligent career assistant.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="primary-button rounded-xl px-7 py-4 font-bold">
                Start Your Journey <ArrowRight className="ml-2 inline" size={18} />
              </Link>
              <a href="#features" className="surface rounded-xl px-7 py-4 font-bold">
                Explore Features
              </a>
            </div>
          </div>

          <div className="surface rounded-3xl p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="muted text-xs font-bold">CAREER OVERVIEW</p>
                <h2 className="mt-2 text-2xl font-extrabold">Welcome to HireWise</h2>
              </div>
              <BrainCircuit className="primary-text" size={34} />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="soft-bg rounded-2xl p-5">
                <FileText className="primary-text" />
                <p className="muted mt-3 text-sm">Resume Status</p>
                <b>Ready to analyze</b>
              </div>
              <div className="soft-bg rounded-2xl p-5">
                <Target className="primary-text" />
                <p className="muted mt-3 text-sm">Career Goal</p>
                <b>Find your path</b>
              </div>
            </div>

            <div className="surface mt-4 rounded-2xl p-5">
              <h3 className="font-bold">Improve your resume</h3>
              <p className="muted mt-2 text-sm">Get personalized career insights.</p>
              <Link to="/signup" className="primary-button mt-5 block rounded-xl p-3 text-center font-bold">
                Get Started <ArrowRight className="ml-2 inline" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <p className="primary-text font-bold uppercase tracking-widest">Our Features</p>
          <h2 className="mt-3 text-4xl font-extrabold">Everything for Your Career</h2>
          <p className="muted mt-4">One platform to prepare for your professional future.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [FileText, "AI Resume Analyzer", "Analyze your resume and identify areas for improvement."],
            [Briefcase, "Smart Job Matching", "Discover job opportunities based on your skills."],
            [MessageSquare, "Interview Coach", "Practice technical and HR interview questions."],
            [Sparkles, "Resume Builder", "Create professional resumes using templates."],
            [ChartNoAxesCombined, "Career Analytics", "Track your applications and career progress."],
            [Target, "Skill Gap Insights", "Discover skills you need to improve."]
          ].map(([Icon, title, desc]) => (
            <div key={title} className="surface feature-card rounded-2xl p-7">
              <div className="soft-bg primary-text inline-flex rounded-xl p-4">
                <Icon size={27} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="muted mt-3 leading-7">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="soft-bg px-5 py-20 text-center">
        <h2 className="text-4xl font-extrabold">Your Career Starts Here</h2>
        <p className="muted mt-4">Create your profile. Improve your skills. Find opportunities.</p>
        <Link to="/signup" className="primary-button mt-7 inline-block rounded-xl px-8 py-4 font-bold">
          Create Free Account
        </Link>
      </section>

      <footer id="about" className="site-nav border-t p-7 text-center">
        <b>HireWise</b>
        <p className="muted mt-2 text-sm">Your Career. Your Skills. Your Future.</p>
      </footer>
    </>
  );
}

function AuthPage({ type, setUser }) {
  const navigate = useNavigate();
  const signup = type === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (signup && !name.trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const result = signup
        ? await registerUser({
            name: name.trim(),
            email: email.trim(),
            password,
          })
        : await loginUser({
            email: email.trim(),
            password,
          });

      // Save authentication details
      localStorage.setItem("hirewise-token", result.token);
      localStorage.setItem("hirewise-user", JSON.stringify(result.user));

      setUser(result.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-gradient flex min-h-screen items-center justify-center p-5">
      <div className="surface grid w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl md:grid-cols-2">
        <div className="primary-button hidden flex-col justify-center p-12 md:flex">
          <BrainCircuit size={45} />
          <h1 className="mt-8 text-4xl font-black">HireWise</h1>
          <p className="mt-5 text-lg leading-8 text-white/85">
            Your career journey deserves the right guidance.
            Build skills, improve your resume and prepare for success.
          </p>
          <div className="mt-9 space-y-4 text-sm">
            <p><CheckCircle2 className="mr-2 inline" /> Personalized career insights</p>
            <p><CheckCircle2 className="mr-2 inline" /> Smart job opportunities</p>
            <p><CheckCircle2 className="mr-2 inline" /> Interview preparation</p>
          </div>
        </div>

        <div className="p-7 sm:p-12">
          <Link to="/" className="muted text-sm font-semibold">← Back to Home</Link>

          <h2 className="mt-9 text-3xl font-extrabold">
            {signup ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="muted mt-3">
            {signup
              ? "Start building your career with HireWise."
              : "Login to continue your career journey."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {signup && (
              <div>
                <label className="mb-2 block text-sm font-bold">Full Name</label>
                <div className="surface flex items-center gap-3 rounded-xl px-4">
                  <User className="muted" size={19} />
                  <input
                    className="w-full bg-transparent py-4 outline-none"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-bold">Email Address</label>
              <div className="surface flex items-center gap-3 rounded-xl px-4">
                <Mail className="muted" size={19} />
                <input
                  type="email"
                  className="w-full bg-transparent py-4 outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">Password</label>
              <div className="surface flex items-center gap-3 rounded-xl px-4">
                <Lock className="muted" size={19} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent py-4 outline-none"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="primary-button w-full rounded-xl py-4 font-bold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : signup
                  ? "Create My Account"
                  : "Login to HireWise"}
              {!loading && <ArrowRight className="ml-2 inline" size={18} />}
            </button>
          </form>

          <p className="muted mt-7 text-center text-sm">
            {signup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link className="primary-text font-bold" to={signup ? "/login" : "/signup"}>
              {signup ? "Login" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, dark, theme, logout, menu, setMenu }) {
  const navigate = useNavigate();

const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const [showPasswords, setShowPasswords] = useState(false);
const [passwordMessage, setPasswordMessage] = useState("");
const [passwordError, setPasswordError] = useState("");
const [passwordLoading, setPasswordLoading] = useState(false);

  const [activePage, setActivePage] = useState("Overview");

  const [profile, setProfile] = useState({
  name: user.name || "",
  phone: user.phone || "",
  location: user.location || "",
  education: user.education || "",
  skills: (user.skills || []).join(", "),
  careerGoal: user.careerGoal || "",
});

useEffect(() => {
  setProfile({
    name: user.name || "",
    phone: user.phone || "",
    location: user.location || "",
    education: user.education || "",
    skills: (user.skills || []).join(", "),
    careerGoal: user.careerGoal || "",
  });
}, [user]);

const [profileMessage, setProfileMessage] = useState("");
const [profileLoading, setProfileLoading] = useState(false);

const profileFields = [
  user.name,
  user.email,
  user.phone,
  user.location,
  user.education,
  user.skills?.length > 0 ? "skills" : "",
  user.careerGoal,
];

const completedFields = profileFields.filter(
  (field) => field && field.toString().trim() !== ""
).length;

const profileCompletion = Math.round(
  (completedFields / profileFields.length) * 100
);

async function handleProfileSave(e) {
  e.preventDefault();

  setProfileLoading(true);
  setProfileMessage("");

  try {
    const token = localStorage.getItem("hirewise-token");

    const profileData = {
      ...profile,
      skills: profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    const result = await updateProfile(profileData, token);

    window.dispatchEvent(
  new CustomEvent("hirewise-profile-updated", {
    detail: result.user,
  })
);

    setProfile({
      ...result.user,
      skills: result.user.skills.join(", "),
    });

    setProfileMessage("Profile updated successfully!");
  } catch (error) {
    setProfileMessage(
      error.response?.data?.message || "Unable to update profile."
    );
  } finally {
    setProfileLoading(false);
  }
}


async function handlePasswordChange(e) {
  e.preventDefault();

  setPasswordMessage("");
  setPasswordError("");

  if (passwordData.newPassword.length < 6) {
    setPasswordError("New password must contain at least 6 characters.");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordError("New password and confirm password do not match.");
    return;
  }

  try {
    setPasswordLoading(true);

    const token = localStorage.getItem("hirewise-token");

    const result = await changePassword(
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      token
    );

    setPasswordMessage(result.message || "Password changed successfully!");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    setPasswordError(
      error.response?.data?.message || "Unable to change password."
    );
  } finally {
    setPasswordLoading(false);
  }
}


    const items = [
    [LayoutDashboard, "Overview"],
    [FileText, "Resume Analyzer"],
    [FileText, "Resume Builder"],
    [Briefcase, "Find Jobs"],
    [MessageSquare, "Interview Coach"],
    [Target, "Skill Insights"],
    [ChartNoAxesCombined, "Career Progress"],
    [User, "My Profile"],
    [Settings, "Settings"]
  ];

  return (
    <div className="flex min-h-screen">
      <aside className={`surface fixed inset-y-0 left-0 z-40 w-64 p-6 transition-transform lg:translate-x-0 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <BrainCircuit className="primary-text" /> HireWise
        </Link>

        <p className="muted mb-5 mt-10 text-xs font-bold uppercase tracking-widest">
          Workspace
        </p>

        <div className="space-y-2">
          {items.map(([Icon, label]) => (
  <button
    key={label}
    onClick={() => {
      setActivePage(label);
      setMenu(false);
    }}
    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left font-semibold ${
      activePage === label ? "soft-bg primary-text" : "muted"
    }`}
  >
    <Icon size={19} /> {label}
  </button>
))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="muted flex w-full items-center gap-3 rounded-xl p-3 font-semibold"
          >
            <LogOut size={19} /> Logout
          </button>
        </div>
      </aside>

      {menu && (
        <button
          aria-label="Close menu"
          onClick={() => setMenu(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <main className="min-w-0 flex-1 p-5 lg:ml-64 lg:p-10">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setMenu(!menu)}
            className="surface rounded-xl p-3 lg:hidden"
          >
            {menu ? <X /> : <Menu />}
          </button>

          <div>
            <p className="muted text-sm">Your personal workspace</p>
            <h1 className="text-2xl font-extrabold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={theme} className="surface rounded-xl p-3">
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <div className="soft-bg primary-text flex h-11 w-11 items-center justify-center rounded-full font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>


{activePage === "My Profile" && (

  <div className="surface mt-9 rounded-2xl p-7">
    <h2 className="text-2xl font-extrabold">My Profile</h2>
    <p className="muted mt-2">
      Update your personal and career information.
    </p>

    <form onSubmit={handleProfileSave} className="mt-7 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">Full Name</label>
          <input
            className="surface w-full rounded-xl border p-3 outline-none"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">Phone Number</label>
          <input
            className="surface w-full rounded-xl border p-3 outline-none"
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">Location</label>
          <input
            className="surface w-full rounded-xl border p-3 outline-none"
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">Education</label>
          <input
            className="surface w-full rounded-xl border p-3 outline-none"
            value={profile.education}
            onChange={(e) =>
              setProfile({ ...profile, education: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Skills (separate with commas)
        </label>
        <input
          className="surface w-full rounded-xl border p-3 outline-none"
          placeholder="HTML, CSS, JavaScript, React"
          value={profile.skills}
          onChange={(e) =>
            setProfile({ ...profile, skills: e.target.value })
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Career Goal</label>
        <input
          className="surface w-full rounded-xl border p-3 outline-none"
          placeholder="e.g. Frontend Developer"
          value={profile.careerGoal}
          onChange={(e) =>
            setProfile({ ...profile, careerGoal: e.target.value })
          }
        />
      </div>

      {profileMessage && (
        <p className="text-sm font-semibold primary-text">
          {profileMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={profileLoading}
        className="primary-button rounded-xl px-7 py-3 font-bold disabled:opacity-60"
      >
        {profileLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  </div>
)}


{activePage === "Settings" && (
  <div className="mt-9 space-y-6">

    <div>
      <p className="text-sm font-semibold primary-text">
        PERSONAL PREFERENCES
      </p>
      <h2 className="mt-1 text-3xl font-extrabold">
        Settings
      </h2>
      <p className="muted mt-2">
        Manage your account and application preferences.
      </p>
    </div>

    {/* Account Information */}

    <div className="surface rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="soft-bg primary-text rounded-xl p-3">
          <User size={25} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Account Information</h3>
          <p className="muted text-sm">
            Your registered account details
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="muted text-sm">Full Name</p>
          <p className="mt-1 font-semibold">{user.name}</p>
        </div>

        <div>
          <p className="muted text-sm">Email Address</p>
          <p className="mt-1 break-all font-semibold">{user.email}</p>
        </div>

        <div>
          <p className="muted text-sm">Account Role</p>
          <p className="mt-1 font-semibold">
            {user.role || "User"}
          </p>
        </div>

        <div>
          <p className="muted text-sm">Account Status</p>
          <p className="mt-1 font-semibold text-green-500">
            Active
          </p>
        </div>
      </div>
    </div>

    {/* Appearance */}

    <div className="surface rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="soft-bg primary-text rounded-xl p-3">
          {dark ? <Moon size={25} /> : <Sun size={25} />}
        </div>

        <div>
          <h3 className="text-lg font-bold">Appearance</h3>
          <p className="muted text-sm">
            Customize your HireWise theme.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold">
            {dark ? "Dark Mode" : "Light Mode"}
          </p>
          <p className="muted mt-1 text-sm">
            Choose your preferred display theme.
          </p>
        </div>

        <button
          onClick={theme}
          className="primary-button flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          Switch to {dark ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>

    {/* Profile Settings */}

    <div className="surface rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="soft-bg primary-text rounded-xl p-3">
          <User size={25} />
        </div>

        <div>
          <h3 className="text-lg font-bold">Profile Settings</h3>
          <p className="muted text-sm">
            Update your personal and career details.
          </p>
        </div>
      </div>

      <button
        onClick={() => setActivePage("My Profile")}
        className="primary-button mt-5 rounded-xl px-5 py-3 font-semibold"
      >
        Edit My Profile
      </button>
    </div>


<div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-5">
  <div>
    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
      Change Password
    </h3>
    <p className="text-sm text-slate-500 mt-1">
      Update your account password securely.
    </p>
  </div>

  <form onSubmit={handlePasswordChange} className="space-y-4">
    <input
      type={showPasswords ? "text" : "password"}
      placeholder="Current Password"
      value={passwordData.currentPassword}
      onChange={(e) =>
        setPasswordData({ ...passwordData, currentPassword: e.target.value })
      }
      required
      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white outline-none"
    />

    <input
      type={showPasswords ? "text" : "password"}
      placeholder="New Password (minimum 6 characters)"
      value={passwordData.newPassword}
      onChange={(e) =>
        setPasswordData({ ...passwordData, newPassword: e.target.value })
      }
      required
      minLength={6}
      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white outline-none"
    />

    <input
      type={showPasswords ? "text" : "password"}
      placeholder="Confirm New Password"
      value={passwordData.confirmPassword}
      onChange={(e) =>
        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
      }
      required
      minLength={6}
      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white outline-none"
    />

    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <input
        type="checkbox"
        checked={showPasswords}
        onChange={(e) => setShowPasswords(e.target.checked)}
      />
      Show passwords
    </label>

    {passwordError && (
      <p className="text-sm text-red-500">{passwordError}</p>
    )}

    {passwordMessage && (
      <p className="text-sm text-green-600">{passwordMessage}</p>
    )}

    <button
      type="submit"
      disabled={passwordLoading}
      className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50"
    >
      {passwordLoading ? "Updating..." : "Update Password"}
    </button>
  </form>
</div>

    {/* Logout */}

    <div className="surface rounded-2xl border border-red-500/20 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-red-500/10 p-3 text-red-500">
          <LogOut size={25} />
        </div>

        <div>
          <h3 className="text-lg font-bold">Logout</h3>
          <p className="muted text-sm">
            Sign out from your HireWise account.
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-5 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white"
      >
        Logout from Account
      </button>
    </div>

  </div>
)}

{activePage === "Overview" && (
  <div className="surface mt-9 rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-extrabold">
          Profile Completion
        </h2>
        <p className="muted mt-1 text-sm">
          Complete your profile to get better career recommendations.
        </p>
      </div>

      <span className="text-3xl font-extrabold primary-text">
        {profileCompletion}%
      </span>
    </div>

    <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500"
        style={{ width: `${profileCompletion}%` }}
      />
    </div>

    <p className="muted mt-3 text-sm">
      {completedFields} out of 7 profile fields completed.
    </p>
  </div>
)}
{activePage === "Overview" && (
  <>
        <div className="primary-button mt-9 rounded-2xl p-7">
          <p className="text-sm text-white/80">WELCOME TO HIREWISE</p>
          <h2 className="mt-3 text-3xl font-extrabold">
            Hello, {user.name}!
          </h2>
          <p className="mt-3 max-w-xl text-white/85">
            Let's take the next step toward your dream career.
          </p>
        </div>

        
<div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
  {[
    [FileText, "Resume Analyzer", "Upload and improve your resume."],
    [FileText, "Resume Builder", "Create your professional resume."],
    [Briefcase, "Find Jobs", "Discover opportunities for your skills."],
    [MessageSquare, "Interview Coach", "Practice for your next interview."],
    [Target, "Skill Insights", "Identify skills to improve."],
    [ChartNoAxesCombined, "Career Progress", "Monitor your career journey."],
    [User, "My Profile", "Manage your personal information."]
  ].map(([Icon, title, description]) => (
    <button
      key={title}
      onClick={() => setActivePage(title)}
      className="surface feature-card w-full rounded-2xl p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="soft-bg primary-text inline-flex rounded-xl p-3">
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="muted mt-2 text-sm leading-6">{description}</p>
      <p className="primary-text mt-5 text-sm font-bold">
        Explore Feature →
      </p>
    </button>
  ))}
</div>
        </>
)}

{activePage === "Resume Analyzer" && (
  <ResumeAnalyzer />
)}

{activePage === "Resume Builder" && (
  <ResumeBuilder />
)}

{activePage === "Find Jobs" && (
  <FindJobs />
)}

{activePage === "Interview Coach" && (
  <InterviewCoach />
)}

{activePage === "Skill Insights" && (
  <SkillInsights />
)}

{activePage === "Career Progress" && (
  <CareerProgress />
)}


      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
