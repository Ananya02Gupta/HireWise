
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "./services/authApi";

import ResumeAnalyzerScreen from "./screens/ResumeAnalyzerScreen";
import JobsScreen from "./screens/JobsScreen";
import InterviewScreen from "./screens/InterviewScreen";
import SkillInsightsScreen from "./screens/SkillInsightsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  primary: "#6558D3",
  background: "#F5F6FC",
  white: "#FFFFFF",
  text: "#20213A",
  muted: "#77788C",
};

// HOME SCREEN
function HomeScreen({ user }) {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.greeting}>Welcome back,</Text>
      <Text style={styles.heading}>{user?.name || "User"} 👋</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Build Your Career with HireWise</Text>
        <Text style={styles.heroText}>
          Analyze your resume, discover jobs and prepare for interviews.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Your Career Tools</Text>

      <View style={styles.toolCard}>
        <Ionicons name="document-text-outline" size={28} color={colors.primary} />
        <View style={styles.toolContent}>
          <Text style={styles.toolTitle}>Resume Analyzer</Text>
          <Text style={styles.toolDescription}>Check your resume and improve your skills.</Text>
        </View>
      </View>

      <View style={styles.toolCard}>
        <Ionicons name="briefcase-outline" size={28} color={colors.primary} />
        <View style={styles.toolContent}>
          <Text style={styles.toolTitle}>Find Jobs</Text>
          <Text style={styles.toolDescription}>Explore career opportunities.</Text>
        </View>
      </View>

      <View style={styles.toolCard}>
        <Ionicons name="chatbubbles-outline" size={28} color={colors.primary} />
        <View style={styles.toolContent}>
          <Text style={styles.toolTitle}>Interview Coach</Text>
          <Text style={styles.toolDescription}>Practice interview questions.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// PLACEHOLDER SCREEN
function FeatureScreen({ title, description, icon }) {
  return (
    <View style={styles.centerScreen}>
      <Ionicons name={icon} size={55} color={colors.primary} />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
      <Text style={styles.comingSoon}>Coming Soon</Text>
    </View>
  );
}


function ProfileScreen({ user, onLogout, onProfileUpdate }) {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    setSaving(true);
    const success = await onProfileUpdate({
      name: name.trim(),
      phone: phone.trim(),
      location: location.trim(),
    });
    setSaving(false);

    if (success) {
      setIsEditing(false);
    }
  };
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Missing Details", "Please fill all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "New passwords do not match.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await changePassword(token, {
        currentPassword,
        newPassword,
      });

      if (response.success) {
        Alert.alert("Success", "Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      }
    } catch (error) {
      Alert.alert(
        "Password Error",
        error.response?.data?.message || "Unable to change password."
      );
    }
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={42} color={colors.white} />
        </View>

        <Text style={styles.profileName}>{user?.name || "User"}</Text>
        <Text style={styles.profileEmail}>{user?.email || ""}</Text>

        {isEditing ? (
          <>
            <TextInput
              style={styles.editInput}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.editInput}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.editInput}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.logoutText}>
                {saving ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setName(user?.name || "");
                setPhone(user?.phone || "");
                setLocation(user?.location || "");
                setIsEditing(false);
              }}
            >
              <Text style={styles.switchText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {[
              ["Full Name", user?.name],
              ["Email Address", user?.email],
              ["Phone Number", user?.phone],
              ["Location", user?.location],
              ["Account Role", user?.role],
            ].map(([label, value]) => (
              <View style={styles.profileInfo} key={label}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value || "Not added"}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="create-outline" size={20} color="white" />
              <Text style={styles.logoutText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Security Settings</Text>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => setShowPasswordForm(!showPasswordForm)}
        >
          <Ionicons name="lock-closed-outline" size={20} color="white" />
          <Text style={styles.logoutText}>
            {showPasswordForm ? "Cancel" : "Change Password"}
          </Text>
        </TouchableOpacity>

        {showPasswordForm && (
          <>
            <TextInput
              style={styles.editInput}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.editInput}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.editInput}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handlePasswordChange}
            >
              <Text style={styles.logoutText}>Update Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// BOTTOM TAB NAVIGATION
function MainTabs({ user, onLogout, onProfileUpdate }) {  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: { fontWeight: "bold", color: colors.text },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home-outline",
            Resume: "document-text-outline",
            Jobs: "briefcase-outline",
            Interview: "chatbubbles-outline",
            Skills: "bar-chart-outline",
            Profile: "person-outline",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen user={user} />}
      </Tab.Screen>

      <Tab.Screen
  name="Resume"
  component={ResumeAnalyzerScreen}
/>

      <Tab.Screen
  name="Jobs"
  component={JobsScreen}
/>

      <Tab.Screen
  name="Interview"
  component={InterviewScreen}
/>
<Tab.Screen
  name="Skills"
  component={SkillInsightsScreen}
/>

      <Tab.Screen name="Profile">
  {() => (
    <ProfileScreen
      user={user}
      onLogout={onLogout}
      onProfileUpdate={onProfileUpdate}
    />
  )}
</Tab.Screen>
</Tab.Navigator>

  );
}

// LOGIN AND REGISTER SCREEN

function AuthScreen({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim() || (isRegister && !name.trim())) {
      Alert.alert("Missing Details", "Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const data = isRegister
        ? await registerUser({ name: name.trim(), email: email.trim(), password })
        : await loginUser({ email: email.trim(), password });

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        Alert.alert("Error", data.message || "Authentication failed.");
      }
    } catch (error) {
      Alert.alert(
        "Authentication Error",
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPassword(email.trim());

      if (data.success) {
        Alert.alert("OTP Sent", "Please check your email for the OTP.");
        setAuthMode("reset");
      } else {
        Alert.alert("Error", data.message || "Unable to send OTP.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim() || !otp.trim() || !newPassword || !confirmPassword) {
      Alert.alert("Missing Details", "Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      if (data.success) {
        Alert.alert("Success", "Password reset successfully. Please login.");

        setPassword("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setAuthMode("login");
        setIsRegister(false);
      } else {
        Alert.alert("Error", data.message || "Password reset failed.");
      }
    } catch (error) {
      Alert.alert(
        "Reset Error",
        error.response?.data?.message || "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.authScreen}>
      <View style={styles.logoCircle}>
        <Ionicons name="briefcase" size={36} color="white" />
      </View>

      <Text style={styles.logoTitle}>HireWise</Text>
      <Text style={styles.authSubtitle}>
        Your Personal Career Assistant
      </Text>

      <View style={styles.authCard}>
        <Text style={styles.authTitle}>
          {authMode === "forgot"
            ? "Forgot Password"
            : authMode === "reset"
            ? "Reset Password"
            : isRegister
            ? "Create Account"
            : "Welcome Back"}
        </Text>

        <Text style={styles.authDescription}>
          {authMode === "forgot"
            ? "Enter your registered email to receive an OTP"
            : authMode === "reset"
            ? "Enter the OTP and create a new password"
            : isRegister
            ? "Join HireWise and grow your career"
            : "Login to continue your journey"}
        </Text>

        {authMode === "reset" ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="6-digit OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />

            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.authButtonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </>
        ) : authMode === "forgot" ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Registered Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleForgotPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.authButtonText}>Send OTP</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {!isRegister && (
              <TouchableOpacity
                onPress={() => setAuthMode("forgot")}
                style={{ alignSelf: "flex-end", marginBottom: 12 }}
              >
                <Text style={styles.switchText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.authButtonText}>
                  {isRegister ? "Create Account" : "Login"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
              <Text style={styles.switchText}>
                {isRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {authMode !== "login" && (
          <TouchableOpacity
            onPress={() => {
              setAuthMode("login");
              setOtp("");
              setNewPassword("");
              setConfirmPassword("");
            }}
          >
            <Text style={styles.switchText}>Back to Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}


// MAIN APP
export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await getMe(token);

          if (response.success) {
            setUser(response.user);
          } else {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.log("Session restore error:", error.message);
      } finally {
        setCheckingAuth(false);
      }
    };

    restoreSession();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  const handleProfileUpdate = async (profileData) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await updateProfile(token, profileData);

      if (response.success) {
        setUser(response.user);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        Alert.alert("Success", "Profile updated successfully!");
        return true;
      }

      Alert.alert("Error", response.message || "Profile update failed.");
      return false;
    } catch (error) {
      Alert.alert(
        "Update Error",
        error.response?.data?.message || "Unable to update profile."
      );
      return false;
    }
  };

  if (checkingAuth) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading HireWise...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <MainTabs
          user={user}
          onLogout={handleLogout}
          onProfileUpdate={handleProfileUpdate}
        />
      ) : (
        <AuthScreen onLogin={setUser} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 22,
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginTop: 12,
  },
  authSubtitle: {
    textAlign: "center",
    color: colors.muted,
    marginBottom: 28,
  },
  authCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 22,
    elevation: 4,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  authDescription: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#F6F6FA",
    borderWidth: 1,
    borderColor: "#E6E5F0",
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
    color: colors.text,
  },
  authButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    textAlign: "center",
    color: colors.primary,
    fontWeight: "600",
    marginTop: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  greeting: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 10,
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
  },
  heroTitle: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heroText: {
    color: "#EEECFF",
    fontSize: 14,
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 15,
  },
  toolCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  toolContent: {
    flex: 1,
    marginLeft: 15,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  toolDescription: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
  centerScreen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 18,
  },
  featureDescription: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  comingSoon: {
    color: colors.primary,
    fontWeight: "bold",
    marginTop: 20,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 14,
  },
  profileEmail: {
    color: colors.muted,
    marginTop: 5,
  },
  profileInfo: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#EEEEF4",
    marginTop: 22,
    paddingTop: 16,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 13,
  },
  infoValue: {
    color: colors.text,
    fontWeight: "bold",
    marginTop: 5,
  },
    editInput: {
    width: "100%",
    backgroundColor: "#F6F6FA",
    borderWidth: 1,
    borderColor: "#E6E5F0",
    borderRadius: 12,
    padding: 14,
    marginTop: 15,
    color: colors.text,
    fontSize: 15,
  },
  editProfileButton: {
  backgroundColor: "#6558D3",
  borderRadius: 12,
  padding: 15,
  marginTop: 15,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 9,
},
  logoutButton: {
    backgroundColor: "#E74C5B",
    borderRadius: 12,
    padding: 15,
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.muted,
    marginTop: 12,
  },
});
