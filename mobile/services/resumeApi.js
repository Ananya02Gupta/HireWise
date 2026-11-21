import API from "./api";

export const analyzeResume = async (resume) => {
  const formData = new FormData();

  formData.append("resume", {
    uri: resume.uri,
    name: resume.name,
    type: "application/pdf",
  });

  const response = await API.post("/resume/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};