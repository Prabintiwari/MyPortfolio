import { Plus, Edit, Trash2, X, Save, AlertCircle } from "lucide-react";
import { useSkill } from "../../hooks/useSkills";

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
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
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
                  .map((skill) => (
                    <div key={skill.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">
                          {skill.name}
                        </h4>
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
                            className="bg-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-sm font-medium">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
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
