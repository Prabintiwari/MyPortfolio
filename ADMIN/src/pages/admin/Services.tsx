import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Code,
  Smartphone,
  Zap,
  Globe,
} from "lucide-react";
import { useService } from "../../hooks/useService";

const servicesIcons: Record<string, React.ElementType> = {
  Code: Code,
  Smartphone: Smartphone,
  Zap: Zap,
  Globe: Globe,
};

const getServiceIcon = (iconName?: string): React.ElementType => {
  if (!iconName) return Code;
  return servicesIcons[iconName] || Code;
};

const Services = () => {
  const {
    services,
    error,
    loading,
    showModal,
    setShowModal,
    formData,
    setFormData,
    editingService,
    handleSubmit,
    handleEdit,
    toggleStatus,
    handleDelete,
    resetForm,
  } = useService();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Services
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage services you offer
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm sm:text-base">Add Service</span>
        </button>
      </div>

      {/* Error */}
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

      {/* Empty State */}
      {services.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 sm:p-12 text-center border border-gray-700">
          <Code className="mx-auto text-gray-500 mb-3 sm:mb-4" size={48} />
          <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
            No services yet
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm sm:text-base"
          >
            Add Your First Service
          </button>
        </div>
      ) : (
        /* Services Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => {
            const IconComponent = getServiceIcon(service.icon);

            return (
              <div
                key={service.id}
                className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                    <IconComponent
                      size={24}
                      className="text-white sm:w-7 sm:h-7"
                    />
                  </div>

                  <div className="flex gap-1.5 sm:gap-2">
                    {/* Status Toggle */}
                    <div className="flex gap-1.5 sm:gap-2 items-center">
                      <input
                        type="checkbox"
                        className="cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4"
                        onChange={() => toggleStatus(service.id)}
                        checked={service.isActive}
                      />
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 sm:py-1 ${
                          service.isActive ? "bg-green-500" : "bg-red-500"
                        } text-white text-[10px] sm:text-xs font-semibold rounded`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-1 text-blue-400 hover:text-blue-300"
                      title="Edit"
                    >
                      <Edit size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-linear-to-r from-purple-600/30 to-blue-600/30 text-purple-300 rounded-full text-[10px] sm:text-xs font-medium border border-purple-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingService ? "Edit Service" : "Add Service"}
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
                    Service Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Features * (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    placeholder="HTML & CSS, Tailwind CSS, JavaScript"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      placeholder="Code, Globe..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
                  >
                    <Save size={18} />
                    {editingService ? "Update" : "Create"} Service
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

export default Services;