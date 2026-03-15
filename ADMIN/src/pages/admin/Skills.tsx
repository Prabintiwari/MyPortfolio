import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  AlertCircle,
  Palette,
  Zap,
  BookOpen,
  Code,
  Target,
  Database,
  Server,
  FileCode,
} from "lucide-react";
import { useSkill } from "../../hooks/useSkills";
import { ColorVariant } from "../../types/theme.types";
import { getThemeColors } from "../../config/theme";

const skillsIcons: Record<string, React.ElementType> = {
  Palette: Palette,
  Zap: Zap,
  BookOpen: BookOpen,
  Code: Code,
  Target: Target,
  Database: Database,
  Server: Server,
  Html: FileCode,
};

const Skills = () => {
  const {
    skills,
    loading,
    error,
    showModal,
    setShowModal,
    formData,
    setFormData,
    editingSkill,
    handleSubmit,
    resetForm,
    handleDelete,
    toggleStatus,
    handleEdit,
  } = useSkill();

  const categories = [...new Set(skills.map((s) => s.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex col sm:row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Skills
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage your technical skills
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm sm:text-base">Add Skill</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-red-500 text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-red-400 hover:text-red-300 text-xs sm:text-sm mt-2 underline"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {skills.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 sm:p-12 text-center border border-gray-700">
          <Code className="mx-auto text-gray-500 mb-3 sm:mb-4" size={48} />
          <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
            No skills yet
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm sm:text-base"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        /* Skills by Category */
        <div className="space-y-4 sm:space-y-6">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => {
                    const themeColor = getThemeColors(
                      skill.variant ?? ColorVariant.PRIMARY
                    );
                    const IconComponent =
                      skillsIcons[skill.icon ?? "Code"] ?? Code;
                    return (
                      <div
                        key={skill.id}
                        className="bg-gray-700 rounded-lg p-3 sm:p-4 relative"
                      >
                        {/* Status Toggle */}
                        <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 items-center">
                          <input
                            type="checkbox"
                            className="cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4"
                            onChange={() => toggleStatus(skill.id)}
                            checked={skill.isActive}
                          />
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 ${
                              skill.isActive ? "bg-green-500" : "bg-red-500"
                            } text-white text-[10px] sm:text-xs font-semibold rounded`}
                          >
                            {skill.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 1 min-w-0">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-r ${themeColor.gradient} rounded flex items-center justify-center shrink-0`}
                            >
                              <IconComponent
                                className="text-white"
                                size={16}
                              />
                            </div>
                            <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                              {skill.name}
                            </h4>
                          </div>

                          <div className="flex gap-1.5 sm:gap-2 shrink-0">
                            <button
                              onClick={() => handleEdit(skill)}
                              className="p-1 text-blue-400 hover:text-blue-300"
                              title="Edit"
                            >
                              <Edit size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-1 text-red-400 hover:text-red-300"
                              title="Delete"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="1 bg-gray-600 rounded-full h-1.5 sm:h-2">
                            <div
                              className={`bg-linear-to-r ${themeColor.gradient} h-1.5 sm:h-2 rounded-full transition-all`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-gray-400 text-xs sm:text-sm font-medium">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingSkill ? "Edit Skill" : "Add Skill"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Frontend, Backend, DevOps..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Proficiency Level: {formData.level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        level: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Icon (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    placeholder="Code, Database, Server..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Variant
                    </label>
                    <select
                      value={formData.variant}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          variant: e.target.value as ColorVariant,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.values(ColorVariant).map((variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex col sm:row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full sm:1 px-4 py-2.5 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
                  >
                    <Save size={18} />
                    {editingSkill ? "Update" : "Create"} Skill
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm sm:text-base transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;