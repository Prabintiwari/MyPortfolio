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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-gray-400">Manage your technical skills</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5" size={20} />
            <div>
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-red-400 hover:text-red-300 text-sm mt-2 underline"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills by Category */}
      {skills.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <p className="text-gray-400 mb-4">No skills yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => {
                    const themeColor = getThemeColors(
                      skill.variant ?? ColorVariant.PRIMARY,
                    );
                    const IconComponent = skillsIcons[skill.icon ?? "Code"];
                    return (
                      <div
                        key={skill.id}
                        className="bg-gray-700 rounded-lg p-4 relative"
                      >
                        <div className=" flex gap-2 mb-4 items-center z-1000">
                          <input
                            type="checkbox"
                            className="cursor-pointer text-green-500"
                            onChange={() => toggleStatus(skill.id)}
                            checked={skill.isActive}
                          />
                          <p
                            className={`px-2 py-1 ${skill.isActive ? "bg-green-500" : "bg-red-500"} text-white text-xs font-semibold rounded`}
                          >
                            {skill.isActive ? "Active" : "InActive"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 bg-linear-to-r ${themeColor.gradient} rounded flex items-center justify-center mr-2`}
                            >
                              <IconComponent className="text-white" size={24} />
                            </div>
                            <h4 className="text-white font-semibold">
                              {skill.name}
                            </h4>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(skill)}
                              className="p-1 text-blue-400 hover:text-blue-300"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-600 rounded-full h-2">
                            <div
                              className={`bg-linear-to-r ${themeColor.gradient} h-2 rounded-full transition-all`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-gray-400 text-sm font-medium">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingSkill ? "Edit Skill" : "Add Skill"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Frontend, Backend, DevOps..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
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
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    placeholder="react, nodejs, python..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
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
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
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
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.values(ColorVariant).map((variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {editingSkill ? "Update" : "Create"} Skill
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
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
