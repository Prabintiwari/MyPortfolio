
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { useExperience } from "../../hooks/useExperience";

const Experiences = () => {
  const {
    experiences,
    error,
    loading,
    showModal,
    setShowModal,
    formData,
    setFormData,
    editingExperience,
    handleSubmit,
    toggleStatus,
    handleEdit,
    handleDelete,
    resetForm,
  } = useExperience();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header  */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Experiences
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage your work experience
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm sm:text-base">Add Experience</span>
        </button>
      </div>

      {/* Error  */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
          <AlertCircle className="text-red-500 hrink-0" size={18} />
          <p className="text-red-500 text-xs sm:text-sm">{error}</p>
        </div>
      )}

      {/* Empty State  */}
      {experiences.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-6 sm:p-12 text-center border border-gray-700">
          <Briefcase className="mx-auto text-gray-500 mb-3 sm:mb-4" size={40} />
          <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
            No experiences yet
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm sm:text-base"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              {/* Mobile Layout (< 640px) */}
              <div className="sm:hidden space-y-3">
                {/* Header with Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">
                      {exp.position}
                    </h3>
                    <p className="text-green-400 font-medium text-sm truncate">
                      {exp.company}
                    </p>
                    {exp.location && (
                      <p className="text-gray-400 text-xs truncate">
                        {exp.location}
                      </p>
                    )}
                  </div>
                  
                  {/* Icon */}
                  <div className="hrink-0">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Briefcase className="text-green-500" size={20} />
                    </div>
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => toggleStatus(exp.id)}
                    checked={exp.isActive}
                  />
                  <span
                    className={`px-2 py-1 ${exp.isActive ? "bg-green-500" : "bg-red-500"} text-white text-xs font-semibold rounded`}
                  >
                    {exp.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Period & Current Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-gray-300 text-sm">{exp.period}</p>
                  {exp.current && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                      Current
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm whitespace-pre-line line-clamp-3">
                  {exp.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Desktop/Tablet Layout (>= 640px) */}
              <div className="hidden sm:flex gap-4">
                {/* Icon */}
                <div className="hrink-0">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Briefcase className="text-green-500" size={24} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      {/* Title Row */}
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-white">
                          {exp.position}
                        </h3>
                        
                        {/* Status Toggle */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            onChange={() => toggleStatus(exp.id)}
                            checked={exp.isActive}
                          />
                          <span
                            className={`px-2 py-1 ${exp.isActive ? "bg-green-500" : "bg-red-500"} text-white text-xs font-semibold rounded`}
                          >
                            {exp.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      {/* Company & Location */}
                      <p className="text-green-400 font-medium">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-gray-400 text-sm">{exp.location}</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 hrink-0">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <p className="text-gray-300 text-sm">{exp.period}</p>
                    {exp.current && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 whitespace-pre-line">
                    {exp.description}
                  </p>
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
              {/* Modal Header  */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingExperience ? "Edit Experience" : "Add Experience"}
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
                {/* Company & Position - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City, Country"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Description */}
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    required
                  />
                </div>

                {/* Period & Order - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Period *
                    </label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                      placeholder="2024 - Present"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Order (optional)
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
                </div>

                {/* Current Checkbox */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.current}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          current: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-xs sm:text-sm text-gray-300">
                      I currently work here
                    </span>
                  </label>
                </div>

                {/* Action Buttons - Stack on mobile */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
                  >
                    <Save size={18} />
                    {editingExperience ? "Update" : "Create"} Experience
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

export default Experiences;