
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const fields = [
  "All Fields", "IT & Software", "Banking & Finance",
  "Government Jobs", "Teaching & Education",
  "Medical & Healthcare", "Management & HR",
  "Marketing & Sales", "Data Science", "Design & Creative",
  "Engineering", "Law", "Hospitality & Tourism",
];

const jobs = [
  { id: "1", title: "Frontend Developer", company: "Tech Solutions", field: "IT & Software", location: "Remote", type: "Full Time", description: "Build responsive websites and user-friendly interfaces.", skills: "HTML, CSS, JavaScript, React", experience: "Fresher" },
  { id: "2", title: "Banking Associate", company: "Finance Group", field: "Banking & Finance", location: "Delhi", type: "Full Time", description: "Assist customers with banking services and financial operations.", skills: "Communication, Basic Finance, Computer Skills", experience: "Fresher" },
  { id: "3", title: "Primary Teacher", company: "Bright School", field: "Teaching & Education", location: "Jammu", type: "Full Time", description: "Teach students and prepare classroom learning activities.", skills: "Teaching, Communication, Subject Knowledge", experience: "Fresher" },
  { id: "4", title: "Medical Assistant", company: "Care Hospital", field: "Medical & Healthcare", location: "Dehradun", type: "Full Time", description: "Support healthcare staff with basic administrative and patient-care tasks.", skills: "Communication, Patient Support", experience: "As per role requirements" },
  { id: "5", title: "Marketing Intern", company: "Digital Media", field: "Marketing & Sales", location: "Remote", type: "Internship", description: "Assist with digital campaigns and social media activities.", skills: "Creativity, Communication, Social Media", experience: "Fresher" },
  { id: "6", title: "Data Analyst", company: "Analytics Hub", field: "Data Science", location: "Noida", type: "Full Time", description: "Analyze datasets and prepare reports for business decisions.", skills: "Excel, SQL, Data Analysis", experience: "Fresher" },
  { id: "7", title: "HR Intern", company: "People First", field: "Management & HR", location: "Remote", type: "Internship", description: "Assist with recruitment and employee coordination.", skills: "Communication, Organization, MS Office", experience: "Fresher" },
  { id: "8", title: "Civil Engineer", company: "Build India", field: "Engineering", location: "Chandigarh", type: "Full Time", description: "Support engineering and construction project activities.", skills: "Civil Engineering, Planning, Teamwork", experience: "As per role requirements" },
  { id: "9", title: "Legal Associate", company: "Legal Partners", field: "Law", location: "Delhi", type: "Full Time", description: "Assist with legal research and document preparation.", skills: "Legal Research, Drafting, Communication", experience: "As per role requirements" },
  { id: "10", title: "Hotel Operations Trainee", company: "Grand Stay", field: "Hospitality & Tourism", location: "Goa", type: "Internship", description: "Learn hotel operations and guest service management.", skills: "Customer Service, Communication, Teamwork", experience: "Fresher" },
  { id: "11", title: "Government Exam Trainee", company: "Public Careers", field: "Government Jobs", location: "India", type: "Full Time", description: "Prepare for government recruitment examinations. This is a sample preparation opportunity, not a government vacancy.", skills: "General Awareness, Reasoning, Quantitative Aptitude", experience: "Fresher" },
  { id: "12", title: "Graphic Designer", company: "Creative Studio", field: "Design & Creative", location: "Remote", type: "Full Time", description: "Create visual designs for digital platforms.", skills: "Graphic Design, Creativity, Figma", experience: "Fresher" },
];

export default function JobsScreen() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("All Fields");
  const [saved, setSaved] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesField =
      selectedField === "All Fields" || job.field === selectedField;
    const text = `${job.title} ${job.company} ${job.location} ${job.field}`.toLowerCase();
    return matchesField && text.includes(search.toLowerCase());
  });

  if (selectedJob) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedJob(null)}>
          <Ionicons name="arrow-back" size={22} color="#6558D3" />
          <Text style={styles.backText}>Back to Jobs</Text>
        </TouchableOpacity>

        <View style={styles.detailCard}>
          <View style={styles.jobIcon}>
            <Ionicons name="briefcase-outline" size={28} color="#6558D3" />
          </View>
          <Text style={styles.detailTitle}>{selectedJob.title}</Text>
          <Text style={styles.company}>{selectedJob.company}</Text>
          <Text style={styles.field}>{selectedJob.field}</Text>

          <Text style={styles.sectionTitle}>Job Information</Text>
          <Text style={styles.info}>📍 Location: {selectedJob.location}</Text>
          <Text style={styles.info}>💼 Job Type: {selectedJob.type}</Text>
          <Text style={styles.info}>🎓 Experience: {selectedJob.experience}</Text>

          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{selectedJob.description}</Text>

          <Text style={styles.sectionTitle}>Required Skills</Text>
          <Text style={styles.description}>{selectedJob.skills}</Text>

          <Text style={styles.notice}>
            Note: This is a sample job listing for demonstration. It is not a verified live vacancy.
          </Text>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() =>
              Alert.alert(
                "Application",
                "This is a sample listing. Real employer applications will be connected in a future update."
              )
            }
          >
            <Text style={styles.applyText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Find Jobs</Text>
      <Text style={styles.subtitle}>Explore opportunities across all career fields.</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={21} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search job, company or location..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Choose Career Field</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fields.map((field) => (
          <TouchableOpacity
            key={field}
            onPress={() => setSelectedField(field)}
            style={[styles.chip, selectedField === field && styles.activeChip]}
          >
            <Text style={[styles.chipText, selectedField === field && styles.activeChipText]}>
              {field}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Available Jobs ({filteredJobs.length})</Text>

      {filteredJobs.map((job) => (
        <View key={job.id} style={styles.jobCard}>
          <View style={styles.topRow}>
            <View style={styles.jobIcon}>
              <Ionicons name="briefcase-outline" size={25} color="#6558D3" />
            </View>
            <TouchableOpacity
              onPress={() =>
                setSaved((old) =>
                  old.includes(job.id)
                    ? old.filter((id) => id !== job.id)
                    : [...old, job.id]
                )
              }
            >
              <Ionicons
                name={saved.includes(job.id) ? "bookmark" : "bookmark-outline"}
                size={23}
                color="#6558D3"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.field}>{job.field}</Text>
          <Text style={styles.detail}>📍 {job.location} • {job.type}</Text>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setSelectedJob(job)}
          >
            <Text style={styles.applyText}>View / Apply</Text>
          </TouchableOpacity>
        </View>
      ))}

      {filteredJobs.length === 0 && (
        <Text style={styles.empty}>No jobs found. Try another search.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FC" },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 26, fontWeight: "bold", color: "#20213A", marginTop: 10 },
  subtitle: { color: "#77788C", marginTop: 7, marginBottom: 20 },
  searchBox: {
    backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 14,
    flexDirection: "row", alignItems: "center", height: 52,
  },
  searchInput: { flex: 1, marginLeft: 10, color: "#20213A" },
  sectionTitle: { fontSize: 17, fontWeight: "bold", color: "#20213A", marginTop: 22, marginBottom: 12 },
  chip: { backgroundColor: "#FFFFFF", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 22, marginRight: 8 },
  activeChip: { backgroundColor: "#6558D3" },
  chipText: { color: "#55566B", fontSize: 12, fontWeight: "600" },
  activeChipText: { color: "#FFFFFF" },
  jobCard: { backgroundColor: "#FFFFFF", padding: 17, borderRadius: 16, marginBottom: 15 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  jobIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#F0EEFF", alignItems: "center", justifyContent: "center" },
  jobTitle: { fontSize: 17, fontWeight: "bold", color: "#20213A", marginTop: 14 },
  company: { color: "#77788C", marginTop: 5 },
  field: { color: "#6558D3", fontSize: 12, marginTop: 8, fontWeight: "600" },
  detail: { color: "#66677A", fontSize: 12, marginTop: 10 },
  applyButton: { backgroundColor: "#6558D3", padding: 13, borderRadius: 10, alignItems: "center", marginTop: 15 },
  applyText: { color: "#FFFFFF", fontWeight: "bold" },
  empty: { textAlign: "center", color: "#77788C", marginTop: 35 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 8 },
  backText: { color: "#6558D3", fontWeight: "bold", fontSize: 15 },
  detailCard: { backgroundColor: "#FFFFFF", padding: 20, borderRadius: 16 },
  detailTitle: { fontSize: 23, fontWeight: "bold", color: "#20213A", marginTop: 16 },
  info: { color: "#55566B", marginTop: 9, fontSize: 14 },
  description: { color: "#55566B", fontSize: 14, lineHeight: 22 },
  notice: { color: "#A36B20", backgroundColor: "#FFF5E5", padding: 12, borderRadius: 9, marginTop: 20, lineHeight: 20 },
});
