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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Filter className="text-white" size={20} />
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.id] ?? Code;

          return (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === category.id
                  ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/10"
              }`}
            >
              <IconComponent size={18} />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <p className="text-red-500 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 mx-auto block px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <p className="text-gray-400 mb-4">No projects yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-white/10 hover:scale-[1.01] hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-video bg-gray-700 relative">
                {project.image ? (
                  <img
                    src={`http://localhost:5000${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-gray-500" size={48} />
                  </div>
                )}
                {project.isFeatured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-xs font-semibold rounded">
                    Featured
                  </span>
                )}

                <div className="absolute top-2 left-2 flex gap-2 items-center z-1000">
                  <input
                    type="checkbox"
                    name="isActive"
                    className="cursor-pointer text-green-500"
                    onChange={() => toggleStatus(project.id)}
                    checked={project.isActive}
                  />
                  <p
                    className={`px-2 py-1 ${project.isActive ? "bg-green-500" : "bg-red-500"} text-white text-xs font-semibold rounded`}
                  >
                    {project.isActive ? "Active" : "InActive"}
                  </p>
                </div>
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-linear-to-r from-purple-600/30 to-blue-600/30 text-purple-300 rounded-full text-xs font-medium border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      title="View Live Demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.95]"
                    >
                      <ExternalLink size={16} />
                      View
                    </a>
                  )}
                  {project.github && (
                    <a
                      title="view code"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.95]"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}

                  <button
                    title="Update project"
                    onClick={() => handleEdit(project)}
                    className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.95]"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    title="Delete project"
                    onClick={() => handleDelete(project.id)}
                    className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.95]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingProject ? "Edit Project" : "Add Project"}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="React, TypeScript, Node.js"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveDemo}
                      onChange={(e) =>
                        setFormData({ ...formData, liveDemo: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
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
                        className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                      />
                      <span className="text-sm text-gray-300">isFeatured</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {editingProject ? "Update" : "Create"} Project
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

export default Projects;
