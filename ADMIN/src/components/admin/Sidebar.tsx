import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Code,
  Briefcase,
  Wrench,
  Mail,
  User,
  FileText,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Experiences', path: '/admin/experiences', icon: Briefcase },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Contacts', path: '/admin/contacts', icon: Mail },
    { name: 'About', path: '/admin/about', icon: User },
    { name: 'Portfolio', path: '/admin/portfolio', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
        <h1 className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;