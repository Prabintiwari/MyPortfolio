
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, AlertCircle, Phone, Mail, MapPin, Globe } from 'lucide-react';
import api from '../../services/api';

interface ContactMethod {
  id: string;
  type: string;
  value: string;
  icon?: string;
  order: number;
}

const iconMap: Record<string, any> = {
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
  Globe: Globe,
};

const ContactMethods = () => {
  const [methods, setMethods] = useState<ContactMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ContactMethod | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    icon: 'Phone',
    order: 0,
  });

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/contact-methods');
      setMethods(data.data || []);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch contact methods');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingMethod) {
        await api.put(`/contact-methods/${editingMethod.id}`, formData);
      } else {
        await api.post('/contact-methods', formData);
      }
      fetchMethods();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (method: ContactMethod) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      value: method.value,
      icon: method.icon || 'Phone',
      order: method.order,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact method?')) return;

    try {
      await api.delete(`/contact-methods/${id}`);
      fetchMethods();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({ type: '', value: '', icon: 'Phone', order: 0 });
    setEditingMethod(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Methods</h1>
          <p className="text-gray-400">Manage your contact information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Method
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {methods.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <p className="text-gray-400 mb-4">No contact methods yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Add Your First Contact Method
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {methods.map((method) => {
            const Icon = iconMap[method.icon || 'Phone'] || Phone;
            return (
              <div key={method.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Icon className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{method.type}</h3>
                      <p className="text-gray-400 text-sm">{method.value}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(method)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingMethod ? 'Edit Contact Method' : 'Add Contact Method'}
                </h2>
                <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Email, Phone, Location..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Value *</label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="example@email.com, +1234567890..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.keys(iconMap).map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2">
                    <Save size={20} />
                    {editingMethod ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
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

export default ContactMethods;