
import { useState } from "react";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

const fields = {
  "IT & Technology": [
    // Beginner
    "Tell me about yourself and your technical background.",
    "What is the difference between hardware and software?",
    "What is an operating system?",
    "What is a programming language?",
    "What is the difference between frontend and backend?",
    "What is a database?",
    "What is cloud computing?",
    "What is cybersecurity?",
    "What are your strongest technical skills?",
    "Explain a technology project you have completed.",
    // Intermediate
    "How do you troubleshoot a technical problem?",
    "Explain the software development life cycle.",
    "What is the difference between SQL and NoSQL?",
    "What is an API and how is it used?",
    "How do you ensure software quality?",
    "What is version control and why is it important?",
    "How do you handle a project deadline?",
    "How do you learn a new technology?",
    "How would you explain a technical concept to a non-technical person?",
    "Describe a difficult technical problem you solved.",
    // Advanced
    "How would you design a scalable software system?",
    "How do you approach system performance optimization?",
    "Explain the importance of software architecture.",
    "How would you handle a major production failure?",
    "What are the challenges of distributed systems?",
    "How would you improve application security?",
    "How do you evaluate a new technology for an organization?",
    "How would you lead a technical project?",
    "How do you balance technical debt and new features?",
    "Describe a complex technical decision you would make and why."
  ],

  "Business & Management": [
    "What is business management?",
    "What makes a good manager?",
    "What is leadership?",
    "What is teamwork?",
    "What is business planning?",
    "What is customer satisfaction?",
    "What are business goals?",
    "What is decision-making?",
    "Why do you want to work in management?",
    "What are your management strengths?",
    "How would you manage a team project?",
    "How do you prioritize business tasks?",
    "How would you handle a disagreement at work?",
    "What is SWOT analysis?",
    "How do you measure team performance?",
    "How would you manage a limited budget?",
    "How do you motivate employees?",
    "How would you handle an unhappy client?",
    "How do you manage multiple deadlines?",
    "Describe a business problem you solved.",
    "How would you develop a long-term business strategy?",
    "How do you manage organizational change?",
    "How would you handle a major business crisis?",
    "How do you evaluate business performance?",
    "How would you improve operational efficiency?",
    "How do you manage conflict between departments?",
    "How would you lead a large organization?",
    "How do you make decisions with incomplete information?",
    "How would you manage business growth?",
    "Describe your approach to strategic leadership."
  ],

  "Marketing & Sales": [
    "What is marketing?",
    "What is digital marketing?",
    "What is a target audience?",
    "What is branding?",
    "What is social media marketing?",
    "What is SEO?",
    "What is advertising?",
    "What is a sales funnel?",
    "Why do you want to work in marketing?",
    "What makes a good salesperson?",
    "How would you promote a new product?",
    "How do you identify a target customer?",
    "What is the difference between marketing and sales?",
    "How do you measure a marketing campaign?",
    "How would you handle customer objections?",
    "What is content marketing?",
    "How do you generate leads?",
    "How would you improve social media engagement?",
    "How do you build customer relationships?",
    "Describe a successful marketing idea.",
    "How would you create a complete marketing strategy?",
    "How do you calculate campaign ROI?",
    "How would you manage a low-performing campaign?",
    "How do you use customer data in marketing?",
    "How would you position a product in a competitive market?",
    "How do you manage a large sales pipeline?",
    "How would you enter a new market?",
    "How do you forecast sales accurately?",
    "How would you handle a major brand reputation issue?",
    "Describe your approach to long-term customer retention."
  ],

  "Finance & Accounting": [
    "What is accounting?",
    "What are assets and liabilities?",
    "What is a balance sheet?",
    "What is a profit and loss statement?",
    "What is a budget?",
    "What is cash flow?",
    "What is an invoice?",
    "What is taxation?",
    "Why do you want to work in finance?",
    "What are your strengths in accounting?",
    "What is the difference between profit and revenue?",
    "What is depreciation?",
    "What is working capital?",
    "What is bank reconciliation?",
    "What are financial statements?",
    "What is the difference between debit and credit?",
    "How do you prepare a basic budget?",
    "How do you identify accounting errors?",
    "What is financial forecasting?",
    "How do you maintain financial records?",
    "How would you analyze a company's financial health?",
    "How do you evaluate an investment opportunity?",
    "What is risk management in finance?",
    "How would you manage a financial discrepancy?",
    "How do interest rates affect businesses?",
    "How would you prepare a long-term financial forecast?",
    "How do you ensure financial compliance?",
    "How would you identify financial fraud risks?",
    "How do you evaluate business profitability?",
    "Describe your approach to strategic financial planning."
  ],

  "Education & Teaching": [
    "Why do you want to become a teacher?",
    "What makes a good teacher?",
    "What is classroom management?",
    "How do you explain difficult topics?",
    "What is student-centered learning?",
    "Why is education important?",
    "How do you motivate students?",
    "What are your teaching strengths?",
    "How do you prepare a lesson?",
    "How would you introduce yourself to a class?",
    "How would you handle a disruptive student?",
    "How do you assess student performance?",
    "How do you support students who learn slowly?",
    "How would you use technology in teaching?",
    "How do you communicate with parents?",
    "How do you make lessons interactive?",
    "How do you manage a large classroom?",
    "How would you handle different learning abilities?",
    "How do you give constructive feedback?",
    "Describe a successful teaching activity.",
    "How would you design an inclusive curriculum?",
    "How do you evaluate teaching effectiveness?",
    "How would you handle a serious classroom conflict?",
    "How do you improve student engagement?",
    "How would you support students with special needs?",
    "How do you integrate digital learning tools?",
    "How would you improve academic outcomes?",
    "How do you manage curriculum changes?",
    "How would you mentor new teachers?",
    "Describe your long-term educational vision."
  ],

  "Design & Creative": [
    "What is graphic design?",
    "What is UI design?",
    "What is UX design?",
    "What is a design portfolio?",
    "What is color theory?",
    "What is typography?",
    "What makes a design attractive?",
    "Which design tools do you know?",
    "How do you find creative inspiration?",
    "Explain one design project you created.",
    "What is the difference between UI and UX?",
    "How do you understand client requirements?",
    "How do you handle design feedback?",
    "How do you choose colors for a brand?",
    "What is wireframing?",
    "What is prototyping?",
    "How do you make designs accessible?",
    "How do you manage creative deadlines?",
    "How do you maintain design consistency?",
    "Describe a challenging design task.",
    "How would you improve a poor user experience?",
    "How do you conduct user research?",
    "How would you build a complete design system?",
    "How do you balance creativity and business goals?",
    "How do you evaluate design effectiveness?",
    "How would you handle conflicting client feedback?",
    "How do you design for different devices?",
    "How would you lead a creative team?",
    "How do you manage large-scale design projects?",
    "Describe your approach to innovative design."
  ],

  "Healthcare": [
    "Why do you want to work in healthcare?",
    "What is patient care?",
    "Why is hygiene important in healthcare?",
    "What is patient confidentiality?",
    "What makes a good healthcare professional?",
    "Why is communication important with patients?",
    "What is first aid?",
    "How do you manage stressful situations?",
    "Why is teamwork important in hospitals?",
    "What are your professional strengths?",
    "How would you communicate with an anxious patient?",
    "How do you maintain patient privacy?",
    "How would you respond to a patient complaint?",
    "Why is accurate documentation important?",
    "How do you prioritize patient needs?",
    "How do you handle a medical emergency within your role?",
    "How would you work with a multidisciplinary team?",
    "How do you prevent workplace infections?",
    "How do you manage a busy shift?",
    "Describe a difficult patient-care situation.",
    "How would you improve patient safety?",
    "How do you handle an ethical dilemma?",
    "How would you respond to a serious safety incident?",
    "How do you support quality improvement?",
    "How do you manage limited healthcare resources?",
    "How would you communicate a serious concern to a supervisor?",
    "How do you maintain professional boundaries?",
    "How would you help improve hospital operations?",
    "How do you evaluate quality of care?",
    "Describe your approach to continuous professional development."
  ],

  "HR & Recruitment": [
    "What is human resource management?",
    "What is recruitment?",
    "What is onboarding?",
    "What is employee engagement?",
    "What makes a good HR professional?",
    "What is workplace culture?",
    "What is performance management?",
    "Why is communication important in HR?",
    "Why do you want to work in HR?",
    "What are your professional strengths?",
    "How would you shortlist candidates?",
    "How do you conduct an interview?",
    "How would you handle an employee complaint?",
    "What is employee retention?",
    "How do you manage confidential employee data?",
    "How would you resolve workplace conflict?",
    "How do you support new employees?",
    "How do you evaluate employee performance?",
    "How would you handle an absence issue?",
    "Describe a difficult people-management situation.",
    "How would you design an effective recruitment strategy?",
    "How do you reduce employee turnover?",
    "How would you handle a workplace harassment complaint?",
    "How do you build an inclusive workplace?",
    "How would you improve employee engagement?",
    "How do you plan workforce requirements?",
    "How would you manage organizational restructuring?",
    "How do you evaluate HR performance?",
    "How would you handle a sensitive employee dispute?",
    "Describe your long-term HR strategy."
  ],

  "Customer Service": [
    "What is customer service?",
    "What makes a good customer support executive?",
    "Why is communication important?",
    "How do you greet a customer?",
    "What is active listening?",
    "How do you stay polite?",
    "Why is patience important?",
    "What is customer satisfaction?",
    "Why do you want to work in customer service?",
    "What are your communication strengths?",
    "How would you handle an angry customer?",
    "How do you manage multiple customer requests?",
    "How would you respond to a complaint?",
    "How do you explain a complicated process?",
    "How do you handle customer feedback?",
    "How would you deal with an impatient customer?",
    "How do you maintain a professional tone?",
    "How do you prioritize support tickets?",
    "When would you escalate a customer issue?",
    "Describe a difficult customer interaction.",
    "How would you improve customer satisfaction scores?",
    "How do you handle repeated complaints?",
    "How would you manage a major service disruption?",
    "How do you identify recurring customer problems?",
    "How would you improve support team productivity?",
    "How do you maintain quality across multiple channels?",
    "How would you handle an abusive customer?",
    "How do you use feedback to improve service?",
    "How would you design a customer support process?",
    "Describe your strategy for customer retention."
  ],

  "Law & Legal": [
    "Why did you choose the legal profession?",
    "What is the rule of law?",
    "What is a contract?",
    "What is a legal agreement?",
    "What is professional ethics?",
    "What is the difference between civil and criminal law?",
    "What is the role of an advocate?",
    "Why is legal research important?",
    "What are your strengths in legal studies?",
    "How do you prepare for a legal interview?",
    "How do you conduct legal research?",
    "What is the importance of evidence?",
    "How would you prepare a legal document?",
    "What is client confidentiality?",
    "How do you explain legal concepts to clients?",
    "How do you manage legal deadlines?",
    "What is alternative dispute resolution?",
    "How would you handle conflicting legal opinions?",
    "How do you verify legal information?",
    "Describe a legal issue you have studied.",
    "How would you develop a legal case strategy?",
    "How do you manage complex legal research?",
    "How would you handle an ethical conflict?",
    "How do you assess the strength of legal evidence?",
    "How would you prepare for litigation?",
    "How do you manage multiple client matters?",
    "How would you explain legal risk to an organization?",
    "How do you stay updated on legal developments?",
    "How would you handle a high-pressure legal matter?",
    "Describe your approach to professional legal practice."
  ],

  "Government & General": [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What are your strengths?",
    "What is your biggest weakness?",
    "Why should we select you?",
    "What are your career goals?",
    "What motivates you?",
    "What does teamwork mean to you?",
    "How do you manage your time?",
    "Where do you see yourself in five years?",
    "How do you handle pressure?",
    "Describe a challenge you overcame.",
    "How do you respond to criticism?",
    "How do you prioritize responsibilities?",
    "What does professional integrity mean?",
    "How would you handle a disagreement with a colleague?",
    "How do you adapt to change?",
    "Describe a time you showed initiative.",
    "How do you learn from mistakes?",
    "What makes you suitable for this position?",
    "How would you handle an ethical dilemma at work?",
    "How do you make decisions under pressure?",
    "How would you manage competing responsibilities?",
    "How do you contribute to organizational goals?",
    "How would you handle an unexpected challenge?",
    "How do you maintain professional relationships?",
    "How would you lead a team through change?",
    "How do you approach complex problem-solving?",
    "How would you improve an existing process?",
    "Describe your vision for your professional future."
  ]
};

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function InterviewCoach() {
  const [field, setField] = useState("IT & Technology");
  const [level, setLevel] = useState("Beginner");
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState({});

  const allQuestions = fields[field];
  const start = levels.indexOf(level) * 10;
  const questions = allQuestions.slice(start, start + 10);
  const question = questions[current];
  const progressKey = `${field}-${level}`;

  function changeSelection(newField, newLevel) {
    setField(newField);
    setLevel(newLevel);
    setCurrent(0);
    setAnswer("");
    setFeedback("");
  }

  function submitAnswer() {
    const words = answer.trim().split(/\s+/).filter(Boolean).length;

    if (!answer.trim()) {
      setFeedback("Please write your answer before submitting.");
      return;
    }

    const message =
      words < 10
        ? "Your answer is too short. Add more explanation and an example."
        : words < 25
        ? "Good start! Add more details and explain your points clearly."
        : "Good effort! Your answer has a useful length. Keep it relevant and structured.";

    setFeedback(`${message} Word count: ${words}.`);

    setCompleted((old) => ({
      ...old,
      [progressKey]: {
        ...(old[progressKey] || {}),
        [current]: true,
      },
    }));
  }

  function moveQuestion(direction) {
    setCurrent((old) => Math.max(0, Math.min(9, old + direction)));
    setAnswer("");
    setFeedback("");
  }

  function resetPractice() {
    setCurrent(0);
    setAnswer("");
    setFeedback("");
    setCompleted((old) => ({
      ...old,
      [progressKey]: {},
    }));
  }

  const practiced = Object.keys(completed[progressKey] || {}).length;

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Interview Coach</h2>
        <p className="mt-2 text-sm opacity-60">
          Practice 300 interview questions across 10 professional fields.
        </p>
      </div>

      <div className="surface grid gap-4 rounded-2xl p-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Select Field</label>
          <select
            value={field}
            onChange={(e) => changeSelection(e.target.value, level)}
            className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3"
          >
            {Object.keys(fields).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Difficulty Level</label>
          <select
            value={level}
            onChange={(e) => changeSelection(field, e.target.value)}
            className="w-full rounded-xl border border-gray-300/30 bg-transparent p-3"
          >
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface rounded-2xl p-5">
          <p className="text-sm opacity-60">Questions in this level</p>
          <h3 className="mt-2 text-3xl font-bold">10</h3>
        </div>
        <div className="surface rounded-2xl p-5">
          <p className="text-sm opacity-60">Practiced</p>
          <h3 className="mt-2 text-3xl font-bold">{practiced}/10</h3>
        </div>
        <div className="surface rounded-2xl p-5">
          <p className="text-sm opacity-60">Overall Question Bank</p>
          <h3 className="mt-2 text-3xl font-bold">300</h3>
        </div>
      </div>

      <div className="surface rounded-2xl p-6">
        <div className="flex flex-wrap justify-between gap-3">
          <span className="rounded-lg bg-violet-500/10 px-3 py-2 text-sm text-violet-500">
            {field}
          </span>
          <span className="text-sm opacity-60">
            {level} · Question {current + 1} of 10
          </span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-300/30">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${((current + 1) / 10) * 100}%` }}
          />
        </div>

        <h3 className="mt-7 text-xl font-bold">{question}</h3>

        <label className="mb-2 mt-7 block text-sm font-medium">Your Answer</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={7}
          placeholder="Write your answer here..."
          className="w-full rounded-xl border border-gray-300/30 bg-transparent p-4 outline-none focus:border-violet-500"
        />

        <p className="mt-2 text-right text-xs opacity-50">
          {answer.trim() ? answer.trim().split(/\s+/).length : 0} words
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={submitAnswer}
            className="primary-button flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
          >
            <CheckCircle size={18} /> Submit Answer
          </button>

          <button
            onClick={() => moveQuestion(-1)}
            disabled={current === 0}
            className="flex items-center gap-2 rounded-xl border border-gray-300/30 px-5 py-3 disabled:opacity-40"
          >
            <ArrowLeft size={18} /> Previous
          </button>

          <button
            onClick={() => moveQuestion(1)}
            disabled={current === 9}
            className="flex items-center gap-2 rounded-xl border border-gray-300/30 px-5 py-3 disabled:opacity-40"
          >
            Next <ArrowRight size={18} />
          </button>

          <button
            onClick={resetPractice}
            className="flex items-center gap-2 rounded-xl border border-gray-300/30 px-5 py-3"
          >
            <RotateCcw size={17} /> Reset
          </button>
        </div>

        {feedback && (
          <div className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold">
              <MessageSquare size={18} /> Practice Feedback
            </h4>
            <p className="text-sm leading-6">{feedback}</p>
          </div>
        )}
      </div>

      <div className="surface rounded-2xl p-5">
        <h3 className="mb-4 font-bold">Question Progress</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setAnswer("");
                setFeedback("");
              }}
              className={`rounded-lg border p-3 text-sm ${
                completed[progressKey]?.[index]
                  ? "border-green-500 bg-green-500/10"
                  : current === index
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-gray-300/30"
              }`}
            >
              {index + 1}
              {completed[progressKey]?.[index] ? " ✓" : ""}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs opacity-50">
        This question bank contains 30 questions per field, divided into three
        difficulty levels. Feedback currently uses answer length, not AI evaluation.
      </p>
    </div>
  );
}
