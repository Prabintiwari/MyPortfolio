import { useState, useEffect } from "react";
import {
  Save,
  AlertCircle,
  CheckCircle,
  User,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Palette,
  Database,
  Shield,
  Trash2,
} from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "preferences" | "account"
  >("profile");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile Data
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Password Data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    projectAlerts: true,
    contactFormNotifications: true,
    weeklyReport: false,
    theme: "dark",
    language: "en",
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data } = await api.get("/settings/preferences");
      if (data.data) {
        setPreferences(data.data);
      }
    } catch (error) {
      console.log("No preferences found, using defaults");
    }
  };

  // Profile Update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.put("/auth/profile", profileData);
      setSuccess("Profile updated successfully");
    } catch (error: any) {
      setError(error.response?.data?.message || "Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  // Password Change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSaving(true);

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess("Password changed successfully");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      setError(error.response?.data?.message || "Password change failed");
    } finally {
      setSaving(false);
    }
  };

  // Save Preferences
  const handlePreferencesSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.put("/settings/preferences", preferences);
      setSuccess("Preferences saved successfully");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING: This will permanently delete your account and all associated data. This action cannot be undone. Are you absolutely sure?",
    );

    if (!confirmed) return;

    const doubleConfirm = window.prompt(
      'Type "DELETE MY ACCOUNT" to confirm (case-sensitive):',
    );

    if (doubleConfirm !== "DELETE MY ACCOUNT") {
      setError("Account deletion cancelled - confirmation text did not match");
      return;
    }

    try {
      await api.delete("/auth/account");
      logout();
    } catch (error: any) {
      setError(error.response?.data?.message || "Account deletion failed");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "account", label: "Account", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="text-green-500 shrink-0" size={20} />
          <p className="text-green-500 text-sm">{success}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <User size={20} />
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 text-sm flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  Your email is used for login and notifications. Make sure it's
                  accurate.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <form
            onSubmit={handlePasswordChange}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock size={20} />
              Change Password
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  Password must be at least 6 characters long
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                "Changing..."
              ) : (
                <>
                  <Lock size={18} /> Change Password
                </>
              )}
            </button>
          </form>

          {/* Session Info */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield size={20} />
              Session Information
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Role</span>
                <span className="text-white font-semibold">{user?.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Account ID</span>
                <span className="text-white font-mono text-sm">
                  {user?.id?.slice(0, 8)}...
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Bell size={20} />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive email updates</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">Project Alerts</p>
                  <p className="text-sm text-gray-400">
                    Get notified about project updates
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.projectAlerts}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      projectAlerts: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">
                    Contact Form Notifications
                  </p>
                  <p className="text-sm text-gray-400">
                    Alert when new messages arrive
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.contactFormNotifications}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      contactFormNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">Weekly Report</p>
                  <p className="text-sm text-gray-400">
                    Receive weekly activity summary
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.weeklyReport}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      weeklyReport: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Palette size={20} />
              Appearance
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) =>
                    setPreferences({ ...preferences, theme: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="np">नेपाली (Nepali)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handlePreferencesSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} /> Save Preferences
              </>
            )}
          </button>
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          {/* Account Info */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Database size={20} />
              Account Information
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Name</span>
                <span className="text-white">{user?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Role</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
              <AlertCircle size={20} />
              Danger Zone
            </h2>
            <p className="text-gray-300 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 size={18} />
              Delete Account Permanently
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
