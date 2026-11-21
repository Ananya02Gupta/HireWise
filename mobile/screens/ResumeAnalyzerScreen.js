
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { analyzeResume } from "../services/resumeApi";
import * as Print from "expo-print";

export default function ResumeAnalyzerScreen() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));

  const pickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];

        if (file.size > 5 * 1024 * 1024) {
          Alert.alert("File Too Large", "Please select a PDF under 5 MB.");
          return;
        }

        setResume({
          name: file.name,
          size: file.size,
          uri: file.uri,
          mimeType: file.mimeType,
        });

        setAnalysis(null);
        Alert.alert("Success", "Your resume has been selected!");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to select your resume.");
    }
  };

  const handleAnalyze = async () => {
    if (!resume) {
      Alert.alert("No Resume", "Please select a PDF resume first.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeResume(resume);

      if (response.success) {
        setAnalysis(response.result);
        Alert.alert("Success", "Resume analyzed successfully!");
      } else {
        Alert.alert("Analysis Failed", response.message);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Unable to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
  if (!analysis) return;

  try {
    const html = `
      <html>
        <body style="font-family:Arial;padding:24px;color:#20213A">
          <h1>HireWise Resume Analysis Report</h1>
          <p><b>Resume:</b> ${escapeHtml(resume?.name || "Resume")}</p>
          <h2>Resume Score: ${analysis.resumeScore}/100</h2>
          <h3>Detected Skills (${analysis.totalSkillsDetected})</h3>
          <ul>${analysis.detectedSkills.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
          <h3>Detected Sections</h3>
          <ul>${analysis.detectedSections.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
          <h3>Improvement Suggestions</h3>
          <ul>${analysis.suggestions.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </body>
      </html>
    `;

    await Print.printAsync({ html });
  } catch (error) {
    Alert.alert("Error", error.message || "Could not create report.");
  }
};
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Resume Analyzer</Text>

      <Text style={styles.subtitle}>
        Analyze your resume and improve your career opportunities.
      </Text>

      <View style={styles.uploadCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="cloud-upload-outline" size={38} color="#6558D3" />
        </View>

        <Text style={styles.cardTitle}>Upload Your Resume</Text>

        <Text style={styles.description}>
          Select your resume in PDF format to get started.
        </Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickResume}
        >
          <Ionicons name="document-attach-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Choose PDF Resume</Text>
        </TouchableOpacity>

        <Text style={styles.fileInfo}>Supported format: PDF (Max 5 MB)</Text>
      </View>

      {resume && (
        <View style={styles.fileCard}>
          <Ionicons name="document-text" size={32} color="#6558D3" />

          <View style={styles.fileDetails}>
            <Text style={styles.fileName}>{resume.name}</Text>
            <Text style={styles.fileStatus}>Resume selected successfully</Text>
          </View>

          <Ionicons name="checkmark-circle" size={23} color="#16A36A" />
        </View>
      )}

      {resume && (
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="sparkles" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Upload & Analyze Resume</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {analysis && (
        <>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resume Analysis Report</Text>

            <Text style={styles.score}>{analysis.resumeScore}/100</Text>
            <Text style={styles.resultSubtitle}>Resume Score</Text>

            <Text style={styles.resultSubtitle}>
              Skills detected: {analysis.totalSkillsDetected}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Detected Skills</Text>

            {analysis.detectedSkills.map((skill, index) => (
              <Text style={styles.resultText} key={index}>
                ✓ {skill}
              </Text>
            ))}
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Detected Sections</Text>

            {analysis.detectedSections.map((section, index) => (
              <Text style={styles.resultText} key={index}>
                ✓ {section}
              </Text>
            ))}
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Improvement Suggestions</Text>

            {analysis.suggestions.map((suggestion, index) => (
              <Text style={styles.resultText} key={index}>
                • {suggestion}
              </Text>
            ))}
          </View>
          <TouchableOpacity
  style={styles.downloadButton}
  onPress={downloadReport}
>
  <Ionicons name="download-outline" size={20} color="#FFFFFF" />
  <Text style={styles.buttonText}>Download Analysis Report PDF</Text>
</TouchableOpacity>
        </>
      )}

      <View style={styles.infoCard}>
        <Ionicons name="sparkles" size={24} color="#6558D3" />

        <Text style={styles.infoTitle}>What You Will Get</Text>

        <Text style={styles.infoText}>• Resume Score</Text>
        <Text style={styles.infoText}>• Skills Detection</Text>
        <Text style={styles.infoText}>• Improvement Suggestions</Text>
        <Text style={styles.infoText}>• Resume Analysis Report</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FC",
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#20213A",
    marginTop: 10,
  },
  subtitle: {
    color: "#77788C",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 25,
  },
  uploadCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 23,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E2FA",
  },
  iconCircle: {
    height: 75,
    width: 75,
    borderRadius: 40,
    backgroundColor: "#F0EEFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#20213A",
    marginTop: 17,
  },
  description: {
    color: "#77788C",
    textAlign: "center",
    fontSize: 13,
    marginTop: 9,
    lineHeight: 20,
  },
  uploadButton: {
    backgroundColor: "#6558D3",
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 22,
    width: "100%",
  },
  analyzeButton: {
    backgroundColor: "#16A36A",
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  downloadButton: {
  backgroundColor: "#6558D3",
  padding: 16,
  borderRadius: 12,
  marginTop: 18,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 9,
},
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  fileInfo: {
    color: "#9999A8",
    fontSize: 12,
    marginTop: 13,
  },
  fileCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    color: "#20213A",
    fontWeight: "bold",
    fontSize: 13,
  },
  fileStatus: {
    color: "#16A36A",
    fontSize: 11,
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginTop: 22,
  },
  infoTitle: {
    color: "#20213A",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginBottom: 12,
  },
  infoText: {
    color: "#66677A",
    fontSize: 13,
    marginTop: 9,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginTop: 18,
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#20213A",
    marginBottom: 12,
  },
  score: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#6558D3",
    textAlign: "center",
    marginTop: 8,
  },
  resultSubtitle: {
    color: "#77788C",
    textAlign: "center",
    marginTop: 8,
  },
  resultText: {
    color: "#55566B",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 21,
  },
});
