import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
  Code,
  Palette,
  Filter,
  ExternalLink,
  Github,
} from "lucide-react";
import { useProject } from "../../hooks/useProject";
import { motion } from "framer-motion";
import { API_URL } from "../../services/api";

const categoryIcons: Record<string, React.ElementType> = {
  all: Code,
  react: Code,
  vanilla: Palette,
  fullstack: Code,
};

const Projects = () => {
  const {
    projects,
    loading,
    error,
    categories,
    filter,
    setFilter,
    showModal,
    editingProject,
    formData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleStatus,
    resetForm,
    setImageFile,
    setFormData,
    setShowModal,
  } = useProject();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header  */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Projects
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm sm:text-base">Add Project</span>
        </button>
      </div>

      {/* Category Filters  */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
        <Filter className="text-white hidden sm:block" size={20} />
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.id] ?? Code;

          return (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                filter === category.id
                  ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/10"
              }`}
            >
              <IconComponent size={16} className="sm:w-4.5 sm:h-4.5" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Error State  */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 sm:mt-4 mx-auto block px-4 sm:px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State  */}
      {projects.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 sm:p-12 text-center border border-gray-700">
          <ImageIcon className="mx-auto text-gray-500 mb-3 sm:mb-4" size={48} />
          <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
            No projects yet
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        /* Projects Grid  */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-white/10 hover:scale-[1.01] hover:-translate-y-1"
            >
              {/* Image  */}
              <div className="aspect-video bg-gray-700 relative">
                {project.image ? (
                  <img
                    src={`${API_URL}${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-gray-500" size={40} />
                  </div>
                )}

                {/* Featured Badge */}
                {project.isFeatured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-[10px] sm:text-xs font-semibold rounded">
                    Featured
                  </span>
                )}

                {/* Status Toggle  */}
                <div className="absolute top-2 left-2 flex gap-1.5 sm:gap-2 items-center z-10">
                  <input
                    type="checkbox"
                    className="cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4"
                    onChange={() => toggleStatus(project.id)}
                    checked={project.isActive}
                  />
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 ${
                      project.isActive ? "bg-green-500" : "bg-red-500"
                    } text-white text-[10px] sm:text-xs font-semibold rounded`}
                  >
                    {project.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Hover linear */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content  */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-400 mb-1.5 sm:mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags  */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-linear-to-r from-purple-600/30 to-blue-600/30 text-purple-300 rounded-full text-[10px] sm:text-xs font-medium border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons  */}
                <div className="flex gap-1.5 sm:gap-2">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Live Demo"
                      className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm active:scale-95"
                    >
                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">View</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Code"
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm active:scale-95"
                    >
                      <Github size={14} className="sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Code</span>
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(project)}
                    title="Edit Project"
                    className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center active:scale-95"
                  >
                    <Edit size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    title="Delete Project"
                    className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center active:scale-95"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal  */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingProject ? "Edit Project" : "Add Project"}
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

              {/* Form  */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="React, TypeScript, Node.js"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveDemo}
                      onChange={(e) =>
                        setFormData({ ...formData, liveDemo: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-end col-span-2 sm:col-span-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isFeatured: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-gray-300">
                        Featured
                      </span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
                  >
                    <Save size={18} />
                    {editingProject ? "Update" : "Create"} Project
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

export default Projects;