
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const fields = {
  "IT & Technology": [
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
    "Describe your strategy for long-term customer retention."
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

export default function InterviewScreen() {
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
  const practiced = Object.keys(completed[progressKey] || {}).length;

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Interview Coach</Text>
      <Text style={styles.subtitle}>
        Practice 300 interview questions across 10 professional fields.
      </Text>

      <View style={styles.banner}>
        <Ionicons name="school-outline" size={34} color="#FFFFFF" />
        <Text style={styles.bannerTitle}>Build Your Interview Confidence</Text>
        <Text style={styles.bannerText}>
          Write your answers and improve your interview skills.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Select Career Field</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(fields).map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => changeSelection(item, level)}
            style={[styles.chip, field === item && styles.activeChip]}
          >
            <Text style={[styles.chipText, field === item && styles.activeChipText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Difficulty Level</Text>
      <View style={styles.levelContainer}>
        {levels.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => changeSelection(field, item)}
            style={[styles.levelButton, level === item && styles.activeLevel]}
          >
            <Text style={[styles.levelText, level === item && styles.activeLevelText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Questions</Text>
          <Text style={styles.statNumber}>10</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Practiced</Text>
          <Text style={styles.statNumber}>{practiced}/10</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Bank</Text>
          <Text style={styles.statNumber}>300</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.fieldBadge}>{field}</Text>
          <Text style={styles.counter}>
            {level} · {current + 1} of 10
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${((current + 1) / 10) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.questionLabel}>INTERVIEW QUESTION</Text>
        <Text style={styles.question}>{question}</Text>

        <Text style={styles.inputLabel}>Your Answer</Text>
        <TextInput
          style={styles.answerInput}
          placeholder="Write your answer here..."
          placeholderTextColor="#9999AA"
          multiline
          textAlignVertical="top"
          value={answer}
          onChangeText={(value) => {
            setAnswer(value);
            setFeedback("");
          }}
        />

        <Text style={styles.wordCount}>
          {answer.trim() ? answer.trim().split(/\s+/).length : 0} words
        </Text>

        <TouchableOpacity style={styles.submitButton} onPress={submitAnswer}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Submit Answer</Text>
        </TouchableOpacity>

        {feedback !== "" && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackTitle}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#6558D3" />
              {" "}Practice Feedback
            </Text>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        )}

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, current === 0 && styles.disabledButton]}
            disabled={current === 0}
            onPress={() => moveQuestion(-1)}
          >
            <Ionicons name="arrow-back" size={18} color="#6558D3" />
            <Text style={styles.previousText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, current === 9 && styles.disabledNext]}
            disabled={current === 9}
            onPress={() => moveQuestion(1)}
          >
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetPractice}>
          <Ionicons name="refresh-outline" size={18} color="#6558D3" />
          <Text style={styles.resetText}>Reset Practice</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Question Progress</Text>
        <View style={styles.questionGrid}>
          {questions.map((item, index) => {
            const isDone = completed[progressKey]?.[index];
            const isActive = current === index;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setCurrent(index);
                  setAnswer("");
                  setFeedback("");
                }}
                style={[
                  styles.questionNumber,
                  isDone && styles.completedNumber,
                  isActive && styles.activeNumber,
                ]}
              >
                <Text
                  style={[
                    styles.numberText,
                    (isDone || isActive) && styles.activeNumberText,
                  ]}
                >
                  {index + 1}{isDone ? " ✓" : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={styles.tip}>
        Tip: Write clear, relevant answers and use examples wherever possible.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FC" },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 26, fontWeight: "bold", color: "#20213A", marginTop: 10 },
  subtitle: { color: "#77788C", marginTop: 7, marginBottom: 20 },
  banner: { backgroundColor: "#6558D3", borderRadius: 16, padding: 22, alignItems: "center" },
  bannerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", marginTop: 12, textAlign: "center" },
  bannerText: { color: "#EEEAFE", textAlign: "center", marginTop: 7, lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: "bold", color: "#20213A", marginTop: 22, marginBottom: 12 },
  chip: { backgroundColor: "#FFFFFF", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 22, marginRight: 8 },
  activeChip: { backgroundColor: "#6558D3" },
  chipText: { color: "#55566B", fontSize: 12, fontWeight: "600" },
  activeChipText: { color: "#FFFFFF" },
  levelContainer: { flexDirection: "row", gap: 9 },
  levelButton: { flex: 1, backgroundColor: "#FFFFFF", paddingVertical: 13, borderRadius: 10, alignItems: "center" },
  activeLevel: { backgroundColor: "#292943" },
  levelText: { color: "#55566B", fontSize: 12, fontWeight: "bold" },
  activeLevelText: { color: "#FFFFFF" },
  statsContainer: { flexDirection: "row", gap: 9, marginTop: 20 },
  statCard: { flex: 1, backgroundColor: "#FFFFFF", padding: 13, borderRadius: 12 },
  statLabel: { fontSize: 11, color: "#77788C" },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#20213A", marginTop: 6 },
  card: { backgroundColor: "#FFFFFF", padding: 18, borderRadius: 16, marginTop: 20 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 },
  fieldBadge: { color: "#6558D3", backgroundColor: "#F0EEFF", padding: 9, borderRadius: 8, fontSize: 12, fontWeight: "bold" },
  counter: { color: "#77788C", fontSize: 12 },
  progressBackground: { height: 7, backgroundColor: "#E8E7F1", borderRadius: 10, marginTop: 20, overflow: "hidden" },
  progressFill: { height: 7, backgroundColor: "#6558D3", borderRadius: 10 },
  questionLabel: { color: "#999", fontSize: 10, fontWeight: "bold", letterSpacing: 1, marginTop: 25 },
  question: { fontSize: 20, fontWeight: "bold", color: "#20213A", marginTop: 10, lineHeight: 29 },
  inputLabel: { color: "#20213A", fontWeight: "bold", marginTop: 25, marginBottom: 10 },
  answerInput: { minHeight: 145, borderWidth: 1, borderColor: "#E0DFEA", borderRadius: 12, padding: 14, color: "#20213A", fontSize: 14, backgroundColor: "#FAFAFD" },
  wordCount: { textAlign: "right", color: "#999", fontSize: 11, marginTop: 8 },
  submitButton: { backgroundColor: "#6558D3", padding: 14, borderRadius: 10, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, marginTop: 16 },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
  feedbackBox: { backgroundColor: "#F0EEFF", borderRadius: 12, padding: 15, marginTop: 18 },
  feedbackTitle: { color: "#6558D3", fontWeight: "bold", marginBottom: 8 },
  feedbackText: { color: "#45455A", fontSize: 13, lineHeight: 21 },
  navigation: { flexDirection: "row", gap: 10, marginTop: 18 },
  navButton: { flex: 1, borderWidth: 1, borderColor: "#6558D3", padding: 13, borderRadius: 10, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 },
  disabledButton: { opacity: 0.35 },
  previousText: { color: "#6558D3", fontWeight: "bold" },
  nextButton: { flex: 1, backgroundColor: "#292943", padding: 13, borderRadius: 10, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 },
  disabledNext: { opacity: 0.35 },
  resetButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 7, marginTop: 18, padding: 10 },
  resetText: { color: "#6558D3", fontWeight: "bold" },
  questionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  questionNumber: { width: "17%", paddingVertical: 12, borderRadius: 9, borderWidth: 1, borderColor: "#E0DFEA", alignItems: "center" },
  completedNumber: { backgroundColor: "#E5F7EC", borderColor: "#36A269" },
  activeNumber: { backgroundColor: "#6558D3", borderColor: "#6558D3" },
  numberText: { color: "#55566B", fontWeight: "bold" },
  activeNumberText: { color: "#FFFFFF" },
  tip: { color: "#77788C", marginTop: 18, lineHeight: 21, fontSize: 13 },
});
