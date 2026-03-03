import { Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-gray-400 hover:text-white"
      >
        <Menu size={24} />
      </button>

      {/* Page Title */}
      <div className="hidden lg:block">
        <h2 className="text-xl font-semibold text-white">Welcome back!</h2>
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg">
          <User size={20} className="text-gray-400" />
          <span className="text-sm text-white font-medium">
            {user?.name || "Admin"}
          </span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
