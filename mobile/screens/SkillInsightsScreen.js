
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const skillData = [
  { name: "HTML", category: "Frontend", progress: 90, level: "Advanced" },
  { name: "CSS", category: "Frontend", progress: 80, level: "Intermediate" },
  { name: "JavaScript", category: "Frontend", progress: 65, level: "Intermediate" },
  { name: "React", category: "Frontend", progress: 60, level: "Intermediate" },
  { name: "Node.js", category: "Backend", progress: 45, level: "Beginner" },
  { name: "Express.js", category: "Backend", progress: 40, level: "Beginner" },
  { name: "MongoDB", category: "Database", progress: 55, level: "Intermediate" },
  { name: "SQL", category: "Database", progress: 50, level: "Beginner" },
  { name: "Python", category: "Programming", progress: 60, level: "Intermediate" },
  { name: "Git & GitHub", category: "Tools", progress: 70, level: "Intermediate" },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Programming",
  "Tools",
];

export default function SkillInsightsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skillData
      : skillData.filter(
          (skill) => skill.category === selectedCategory
        );

  const average = Math.round(
    filteredSkills.reduce((sum, skill) => sum + skill.progress, 0) /
      (filteredSkills.length || 1)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.heading}>Skill Insights</Text>
        <Text style={styles.subtitle}>
          Track your skills and improve your career readiness.
        </Text>
      </View>

      <View style={styles.overview}>
        <View>
          <Text style={styles.overviewLabel}>Overall Skill Progress</Text>
          <Text style={styles.score}>{average}%</Text>
          <Text style={styles.overviewSmall}>Based on sample skill data</Text>
        </View>
        <Ionicons name="stats-chart" size={48} color="#A78BFA" />
      </View>

      <Text style={styles.sectionTitle}>Skill Categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.skillHeader}>
        <Text style={styles.sectionTitle}>Your Skills</Text>
        <Text style={styles.count}>{filteredSkills.length} Skills</Text>
      </View>

      {filteredSkills.map((skill) => (
        <View key={skill.name} style={styles.skillCard}>
          <View style={styles.skillTop}>
            <View>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillCategory}>{skill.category}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{skill.level}</Text>
            </View>
          </View>

          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Proficiency</Text>
            <Text style={styles.progressValue}>{skill.progress}%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${skill.progress}%` },
              ]}
            />
          </View>

          <Text style={styles.tip}>
            {skill.progress >= 75
              ? "Keep practising to maintain this skill."
              : "Practise projects and exercises to improve this skill."}
          </Text>
        </View>
      ))}

      <View style={styles.recommendation}>
        <Ionicons name="bulb-outline" size={25} color="#FBBF24" />
        <View style={{ flex: 1 }}>
          <Text style={styles.recommendTitle}>Recommended Action</Text>
          <Text style={styles.recommendText}>
            Focus on JavaScript, React and backend concepts. Build practical
            projects to strengthen your skills.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Note: These are sample skill levels. They are not automatically
        verified or extracted from your resume.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    padding: 18,
  },
  header: {
    marginTop: 15,
    marginBottom: 20,
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#24134D",
  },
  subtitle: {
    fontSize: 14,
    color: "#77718A",
    marginTop: 6,
  },
  overview: {
    backgroundColor: "#24134D",
    borderRadius: 20,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  overviewLabel: {
    color: "#D9D0F5",
    fontSize: 14,
  },
  score: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 7,
  },
  overviewSmall: {
    color: "#C4B5FD",
    fontSize: 11,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#24134D",
    marginBottom: 13,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 9,
    marginBottom: 18,
  },
  activeCategory: {
    backgroundColor: "#6D28D9",
  },
  categoryText: {
    color: "#625B75",
    fontWeight: "600",
    fontSize: 12,
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  count: {
    color: "#77718A",
    fontSize: 12,
  },
  skillCard: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 16,
    marginBottom: 13,
  },
  skillTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24134D",
  },
  skillCategory: {
    color: "#928BA3",
    fontSize: 12,
    marginTop: 4,
  },
  levelBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    color: "#6D28D9",
    fontSize: 11,
    fontWeight: "bold",
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
    marginBottom: 8,
  },
  progressLabel: {
    color: "#77718A",
    fontSize: 12,
  },
  progressValue: {
    color: "#6D28D9",
    fontWeight: "bold",
    fontSize: 12,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#EDE9FE",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#7C3AED",
    borderRadius: 10,
  },
  tip: {
    color: "#77718A",
    fontSize: 11,
    marginTop: 11,
  },
  recommendation: {
    backgroundColor: "#24134D",
    padding: 17,
    borderRadius: 16,
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    marginBottom: 15,
  },
  recommendTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  recommendText: {
    color: "#D9D0F5",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },
  footer: {
    color: "#928BA3",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 17,
  },
});
