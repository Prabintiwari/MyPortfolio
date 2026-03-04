// src/pages/admin/Dashboard.tsx
import { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Mail, 
  Award, 
  Briefcase, 
  Wrench,
  TrendingUp,
  Eye
} from 'lucide-react';
import api from '../../services/api';

interface Stats {
  projects: number;
  skills: number;
  experiences: number;
  services: number;
  contacts: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    experiences: 0,
    services: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, skills, experiences, services, contacts] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/experiences'),
        api.get('/services'),
        api.get('/contacts'),
      ]);

      setStats({
        projects: projects.data.data.count || 0,
        skills: skills.data.count || 0,
        experiences: experiences.data.count || 0,
        services: services.data.count || 0,
        contacts: contacts.data.count || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Projects', 
      value: stats.projects, 
      icon: FolderKanban, 
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Total Skills', 
      value: stats.skills, 
      icon: Award, 
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Experiences', 
      value: stats.experiences, 
      icon: Briefcase, 
      color: 'green',
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      title: 'Services', 
      value: stats.services, 
      icon: Wrench, 
      color: 'orange',
      gradient: 'from-orange-500 to-yellow-500'
    },
    { 
      title: 'Messages', 
      value: stats.contacts, 
      icon: Mail, 
      color: 'red',
      gradient: 'from-red-500 to-pink-500'
    },
    { 
      title: 'Total Views', 
      value: '1.2K', 
      icon: Eye, 
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500'
    },
  ];

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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-linear-to-r ${stat.gradient} rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/projects"
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center transition-colors"
          >
            <FolderKanban className="mx-auto mb-2 text-blue-400" size={24} />
            <p className="text-sm text-white font-medium">Add Project</p>
          </a>
          <a
            href="/admin/skills"
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center transition-colors"
          >
            <Award className="mx-auto mb-2 text-purple-400" size={24} />
            <p className="text-sm text-white font-medium">Add Skill</p>
          </a>
          <a
            href="/admin/experiences"
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center transition-colors"
          >
            <Briefcase className="mx-auto mb-2 text-green-400" size={24} />
            <p className="text-sm text-white font-medium">Add Experience</p>
          </a>
          <a
            href="/admin/contacts"
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center transition-colors"
          >
            <Mail className="mx-auto mb-2 text-red-400" size={24} />
            <p className="text-sm text-white font-medium">View Messages</p>
          </a>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome to Admin Panel! 🎉
        </h2>
        <p className="text-blue-100 mb-4">
          Manage your portfolio content efficiently. Select a section from the sidebar to get started.
        </p>
        <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
          View Portfolio
        </button>
      </div>
    </div>
  );
};

export default Dashboard;