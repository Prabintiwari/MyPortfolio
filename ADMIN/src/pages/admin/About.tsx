import {
  Save,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";
import { useAbout } from "../../hooks/useAbout";

const About = () => {
  const {
    about,
    loading,
    error,
    saving,
    success,
    viewMode,
    setViewMode,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit,
  } = useAbout();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">About Section</h1>
          <p className="text-gray-400">
            {viewMode === "view"
              ? "View your personal information"
              : viewMode === "edit"
                ? "Update your personal information"
                : "Create your about section"}
          </p>
        </div>

        {viewMode === "view" && about && (
          <div className="flex flex-col md:flex-row gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
            >
              <Edit size={20} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
            >
              <Trash2 size={20} />
              Delete
            </button>
          </div>
        )}

        {viewMode === "create" && !about && (
          <button
            onClick={() => setViewMode("create")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Create About
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="text-green-500" size={20} />
          <p className="text-green-500 text-sm">{success}</p>
        </div>
      )}

      {/* VIEW MODE */}
      {viewMode === "view" && about && (
        <div className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="text-blue-500" size={20} />
              <h2 className="text-xl font-bold text-white">
                Basic Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">
                  Full Name
                </label>
                <p className="text-white font-semibold mt-1">{about.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">
                  Title
                </label>
                <p className="text-white font-semibold mt-1">{about.title}</p>
              </div>
              {about.subtitle && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-400">
                    Subtitle
                  </label>
                  <p className="text-white font-semibold mt-1">
                    {about.subtitle}
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-400">Bio</label>
                <p className="text-white mt-1 whitespace-pre-line">
                  {about.bio}
                </p>
              </div>
              {about.description && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-400">
                    Description
                  </label>
                  <p className="text-white mt-1 whitespace-pre-line">
                    {about.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-400">
                  Years Experience
                </label>
                <p className="text-3xl font-bold text-blue-500 mt-2">
                  {about.yearsExperience}
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-400">
                  Projects Completed
                </label>
                <p className="text-3xl font-bold text-green-500 mt-2">
                  {about.projectsCompleted}
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-400">
                  Open Source
                </label>
                <p className="text-3xl font-bold text-purple-500 mt-2">
                  {about.openSource}
                </p>
              </div>
            </div>
            {about.globalReachText && (
              <div className="mt-4 bg-gray-700 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-400">
                  Global Reach
                </label>
                <p className="text-white font-semibold mt-1">
                  {about.globalReachText}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT/CREATE MODE */}
      {(viewMode === "edit" || viewMode === "create") && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="MERN Stack Developer"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                placeholder="Building awesome web applications"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Years Experience
                </label>
                <input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsExperience: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Projects Completed
                </label>
                <input
                  type="number"
                  value={formData.projectsCompleted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectsCompleted: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Open Source Contributions
                </label>
                <input
                  type="number"
                  value={formData.openSource}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openSource: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Global Reach Text
              </label>
              <input
                type="text"
                value={formData.globalReachText}
                onChange={(e) =>
                  setFormData({ ...formData, globalReachText: e.target.value })
                }
                placeholder="Clients Worldwide, Global Impact, etc."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {viewMode === "create" ? "Create" : "Update"} About Section
                </>
              )}
            </button>

            {viewMode === "edit" && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Empty State - No About */}
      {!about && viewMode === "view" && (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <Eye className="mx-auto text-gray-500 mb-4" size={64} />
          <h3 className="text-xl font-bold text-white mb-2">
            No About Section
          </h3>
          <p className="text-gray-400 mb-6">
            Create your about section to showcase your profile
          </p>
          <button
            onClick={() => setViewMode("create")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create About Section
          </button>
        </div>
      )}
    </div>
  );
};

export default About;
