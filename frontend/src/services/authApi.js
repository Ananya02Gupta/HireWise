
import API from "./api";

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// LOGIN USER
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// GET LOGGED-IN USER
export const getMe = async (token) => {
  const response = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// UPDATE USER PROFILE
export const updateProfile = async (profileData, token) => {
  const response = await API.put("/auth/update-profile", profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// CHANGE PASSWORD
export const changePassword = async (passwordData, token) => {
  const response = await API.put("/auth/change-password", passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
