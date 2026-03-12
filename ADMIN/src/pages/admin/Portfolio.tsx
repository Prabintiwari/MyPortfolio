import {
  Upload,
  Trash2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";
import { useUpload } from "../../hooks/useUpload";

interface PortfolioFiles {
  avatar: string | null;
  logo: string | null;
  resume: string | null;
}

const PortfolioFiles = () => {
  const {
    files,
    loading,
    success,
    error,
    handleUpload,
    handleDelete,
    uploading,
  } = useUpload();

  const API_URL =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio Files</h1>
        <p className="text-gray-400">Manage your avatar, logo, and resume</p>
      </div>

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

      <div className="grid md:grid-cols-3 gap-6">
        {/* Avatar */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ImageIcon size={20} />
            Avatar Image
          </h3>
          <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {files?.avatar ? (
              <img
                src={`${API_URL}${files.avatar}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="text-gray-500" size={48} />
            )}
          </div>
          <div className="space-y-2">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleUpload("avatar", e.target.files[0])
                }
                disabled={uploading === "avatar"}
                className="hidden"
              />
              <div
                className={`w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg cursor-pointer transition-colors ${uploading === "avatar" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {uploading === "avatar" ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload size={18} />
                    {files.avatar?"Change Avatar":"Upload Avatar"}
                  </span>
                )}
              </div>
            </label>
            {files.avatar && (
              <button
                onClick={() => handleDelete("avatar")}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ImageIcon size={20} />
            Logo Image
          </h3>
          <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {files.logo ? (
              <img
                src={`${API_URL}${files.logo}`}
                alt="Logo"
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <ImageIcon className="text-gray-500" size={48} />
            )}
          </div>
          <div className="space-y-2">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleUpload("logo", e.target.files[0])
                }
                disabled={uploading === "logo"}
                className="hidden"
              />
              <div
                className={`w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg cursor-pointer transition-colors ${uploading === "logo" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {uploading === "logo" ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload size={18} />
                    {files.logo?"Change Logo":"Upload Logo"}
                  </span>
                )}
              </div>
            </label>
            {files.logo && (
              <button
                onClick={() => handleDelete("logo")}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={20} />
            Resume / CV
          </h3>
          <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            {files.resume ? (
              <div className="text-center">
                <FileText className="text-green-500 mx-auto mb-2" size={48} />
                <p className="text-sm text-gray-400">Resume uploaded</p>
                <a
                  href={`${API_URL}${files.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  View PDF
                </a>
              </div>
            ) : (
              <FileText className="text-gray-500" size={48} />
            )}
          </div>
          <div className="space-y-2">
            <label className="block">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleUpload("resume", e.target.files[0])
                }
                disabled={uploading === "resume"}
                className="hidden"
              />
              <div
                className={`w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg cursor-pointer transition-colors ${uploading === "resume" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {uploading === "resume" ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload size={18} />
                    {files.resume?"Change Resume":"Upload Resume"}
                   
                  </span>
                )}
              </div>
            </label>
            {files.resume && (
              <button
                onClick={() => handleDelete("resume")}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">PDF files only</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFiles;
