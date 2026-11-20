
import { useEffect, useState } from "react";
import {
  Target,
  BookOpen,
  FolderKanban,
  Award,
  TrendingUp,
  CheckCircle,
  Trash2,
  Save,
} from "lucide-react";
import { updateProfile, getMe } from "../services/authApi";

const defaultProgress = {
  goal: "Get my dream job",
  completedCourses: 0,
  completedProjects: 0,
  interviews: 0,
  skillsLearned: 0,
  activities: [],
};

export default function CareerProgress({ user }) {
  const [progress, setProgress] = useState(defaultProgress);
  const [newActivity, setNewActivity] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // LOAD PROGRESS FROM MONGODB
  useEffect(() => {
    async function loadProgress() {
      try {
        const token = localStorage.getItem("hirewise-token");

        if (!token) {
          setMessage("Please login again.");
          return;
        }

        const result = await getMe(token);
        const currentUser = result.user || result;

        setProgress({
          ...defaultProgress,
          ...(currentUser.careerProgress || {}),
          activities: Array.isArray(
            currentUser.careerProgress?.activities
          )
            ? currentUser.careerProgress.activities
            : [],
        });
      } catch (error) {
        console.error("Progress loading error:", error);
        setMessage("Unable to load career progress.");
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  // SAVE PROGRESS TO MONGODB
  async function saveProgress(updatedProgress) {
    setProgress(updatedProgress);
    setSaving(true);
    setMessage("Saving progress...");

    try {
      const token = localStorage.getItem("hirewise-token");

      if (!token) {
        throw new Error("Please login again.");
      }

      await updateProfile(
        { careerProgress: updatedProgress },
        token
      );

      setMessage("Career progress saved successfully!");
    } catch (error) {
      console.error("Progress saving error:", error);
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Unable to save progress."
      );
    } finally {
      setSaving(false);
    }
  }

  const progressItems = [
    {
      label: "Skills Learned",
      key: "skillsLearned",
      value: progress.skillsLearned,
      max: 10,
      icon: BookOpen,
    },
    {
      label: "Courses Completed",
      key: "completedCourses",
      value: progress.completedCourses,
      max: 5,
      icon: Award,
    },
    {
      label: "Projects Completed",
      key: "completedProjects",
      value: progress.completedProjects,
      max: 5,
      icon: FolderKanban,
    },
    {
      label: "Interviews Practiced",
      key: "interviews",
      value: progress.interviews,
      max: 10,
      icon: Target,
    },
  ];

  const totalProgress = Math.round(
    progressItems.reduce(
      (total, item) =>
        total + Math.min(item.value / item.max, 1) * 100,
      0
    ) / progressItems.length
  );

  function updateProgress(key, value, max) {
    const number = Math.max(
      0,
      Math.min(max, Number(value) || 0)
    );

    saveProgress({
      ...progress,
      [key]: number,
    });
  }

  function updateGoal(value) {
    saveProgress({
      ...progress,
      goal: value,
    });
  }

  function addActivity() {
    if (!newActivity.trim()) return;

    const updatedProgress = {
      ...progress,
      activities: [
        ...progress.activities,
        {
          id: `${Date.now()}-${Math.random()}`,
          title: newActivity.trim(),
        },
      ],
    };

    saveProgress(updatedProgress);
    setNewActivity("");
  }

  function removeActivity(id) {
    saveProgress({
      ...progress,
      activities: progress.activities.filter(
        (activity) => activity.id !== id
      ),
    });
  }

  if (loading) {
    return (
      <div className="surface rounded-2xl p-6">
        Loading your career progress...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-indigo-500">
          YOUR CAREER JOURNEY
        </p>
        <h1 className="mt-1 text-3xl font-bold">
          Career Progress
        </h1>
        <p className="mt-2 text-gray-500">
          Track your learning, achievements and career preparation.
        </p>
      </div>

      <div className="rounded-2xl bg-indigo-600 p-6 text-white">
        <div className="mb-4 flex items-center gap-3">
          <TrendingUp size={28} />
          <h2 className="text-xl font-bold">
            Overall Career Readiness
          </h2>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-4xl font-bold">
            {totalProgress}%
          </span>
          <span className="text-sm opacity-80">
            Your tracked progress
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      <div className="surface rounded-2xl p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <Target className="text-indigo-500" />
          My Career Goal
        </h2>

        <input
          value={progress.goal}
          onChange={(e) => updateGoal(e.target.value)}
          placeholder="Enter your career goal"
          className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {progressItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="surface rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="text-indigo-500" size={25} />
                  <h3 className="font-semibold">
                    {item.label}
                  </h3>
                </div>
                <span className="font-bold">
                  {item.value}/{item.max}
                </span>
              </div>

              <input
                type="number"
                min="0"
                max={item.max}
                value={item.value}
                onChange={(e) =>
                  updateProgress(
                    item.key,
                    e.target.value,
                    item.max
                  )
                }
                className="w-full rounded-lg border border-gray-300/30 bg-transparent p-3 outline-none focus:border-indigo-500"
              />

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{
                    width: `${Math.min(
                      (item.value / item.max) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="surface rounded-2xl p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <CheckCircle className="text-green-500" />
          My Achievements
        </h2>

        <div className="mb-4 flex gap-2">
          <input
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addActivity();
            }}
            placeholder="Add an achievement or completed activity"
            className="min-w-0 flex-1 rounded-xl border border-gray-300/30 bg-transparent p-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={addActivity}
            disabled={!newActivity.trim() || saving}
            className="rounded-xl bg-indigo-600 px-5 text-white disabled:opacity-50"
          >
            Add
          </button>
        </div>

        {progress.activities.length === 0 ? (
          <p className="text-sm text-gray-500">
            No achievements added yet. Add your first achievement!
          </p>
        ) : (
          <div className="space-y-3">
            {progress.activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-green-50 p-3 dark:bg-green-950/30"
              >
                <span className="break-words text-sm">
                  {activity.title}
                </span>

                <button
                  onClick={() => removeActivity(activity.id)}
                  disabled={saving}
                  className="flex shrink-0 items-center gap-1 text-sm text-red-500"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-green-600">
        <Save size={16} />
        {saving ? "Saving to database..." : message || "Progress loaded."}
      </div>
    </div>
  );
}
