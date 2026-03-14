import {
  Mail,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";
import { useContact } from "../../hooks/useContact";

const Contacts = () => {
  const {
    contacts,
    loading,
    error,
    selectedContact,
    filter,
    setFilter,
    markAsRead,
    handleDelete,
    handleView,
    filteredContacts,
    unreadCount,
  } = useContact();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-400">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All messages read"}
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            All ({contacts.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 md:px-4 md:py-2  rounded-lg ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1 md:px-4 md:py-2  rounded-lg ${
              filter === "read"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Read ({contacts.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-2 max-h-150 overflow-y-auto">
          {filteredContacts?.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <Mail className="mx-auto text-gray-500 mb-2" size={48} />
              <p className="text-gray-400">No messages</p>
            </div>
          ) : (
            filteredContacts?.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleView(contact)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedContact?.id === contact.id
                    ? "bg-blue-600 border-blue-500"
                    : contact.isRead
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-gray-800 border-red-500/50 hover:border-red-500"
                } border`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-semibold truncate">
                    {contact.name}
                  </h4>
                  {!contact.isRead && (
                    <span className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2"></span>
                  )}
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {contact.subject}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedContact.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail size={16} />
                      {selectedContact.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-300 whitespace-pre-line">
                  {selectedContact.message}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Mail size={18} />
                  Reply
                </a>
                {!selectedContact.isRead && (
                  <button
                    onClick={() => markAsRead(selectedContact.id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <Eye className="mx-auto text-gray-500 mb-4" size={64} />
              <h3 className="text-xl font-bold text-white mb-2">
                Select a message
              </h3>
              <p className="text-gray-400">
                Choose a message from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
