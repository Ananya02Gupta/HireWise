
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

import { registerUser, loginUser, getMe } from "./services/authApi";

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

  const items = [
    [LayoutDashboard, "Overview", "/dashboard"],
    [FileText, "Resume Analyzer", "#"],
    [Briefcase, "Find Jobs", "#"],
    [MessageSquare, "Interview Coach", "#"],
    [Settings, "Settings", "#"]
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
          {items.map(([Icon, label, path]) => (
            <button
              key={label}
              onClick={() => path !== "#" && navigate(path)}
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left font-semibold ${label === "Overview" ? "soft-bg primary-text" : "muted"}`}
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
            [Briefcase, "Find Jobs", "Discover opportunities for your skills."],
            [MessageSquare, "Interview Coach", "Practice for your next interview."],
            [Target, "Skill Insights", "Identify skills to improve."],
            [ChartNoAxesCombined, "Career Progress", "Monitor your career journey."],
            [User, "My Profile", "Manage your personal information."]
          ].map(([Icon, title, description]) => (
            <div key={title} className="surface feature-card rounded-2xl p-6">
              <div className="soft-bg primary-text inline-flex rounded-xl p-3">
                <Icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="muted mt-2 text-sm leading-6">{description}</p>
              <p className="primary-text mt-5 text-sm font-bold">Coming soon</p>
            </div>
          ))}
        </div>
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
