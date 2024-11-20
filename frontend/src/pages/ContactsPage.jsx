import React, { useState, useEffect, useCallback } from "react";
import ContactCard from "../components/ContactCard";
import { getContacts, deleteContact } from "../services/apiService";
import {
  LuAlertTriangle,
  LuChevronDown,
  LuGrid,
  LuList,
  LuLoader2,
  LuPlus,
  LuSearch,
  LuX,
} from "react-icons/lu";
import AddContactModal from "../components/AddContactModal";
import EditContactModal from "../components/EditContactModal";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  const ACCESS_TOKEN = localStorage.getItem("token");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContacts(ACCESS_TOKEN);
      setContacts(data);
      setFilteredContacts(data);
      setFadeIn(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [ACCESS_TOKEN]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedResults = [...results].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "email") {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

    setFilteredContacts(sortedResults);
  }, [searchTerm, contacts, sortBy]);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (contact) => {
    setContactToEdit(contact._id);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(contactToDelete._id, ACCESS_TOKEN);
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactToDelete._id)
        );
        setDeleteModalOpen(false);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleAddSuccess = () => {
    fetchContacts(); // Refresh the contacts list
    setIsAddModalOpen(false);
  };

  const handleEditSuccess = () => {
    fetchContacts(); 
    setIsEditModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
          <LuSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Clear search"
            >
              <LuX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls Group */}
        <div className="flex gap-3 items-center">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Sort by
              <LuChevronDown className="w-4 h-4" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setSortBy("name");
                    setShowSortDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  Sort by Name
                </button>
                <button
                  onClick={() => {
                    setSortBy("email");
                    setShowSortDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  Sort by Email
                </button>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } transition-colors duration-200`}
            >
              <LuGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } transition-colors duration-200`}
            >
              <LuList className="w-4 h-4" />
            </button>
          </div>

          {/* Add Contact Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <LuPlus className="w-4 h-4" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center gap-2">
            <LuLoader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-500">Loading contacts...</p>
          </div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-lg">
          <LuAlertTriangle className="mr-2 h-5 w-5" />
          <span>{error}</span>
        </div>
      ) : filteredContacts.length > 0 ? (
        /* Contacts Grid/List */
        <div
          className={`
            ${fadeIn ? "opacity-100" : "opacity-0"}
            transition-opacity duration-500
            ${
              viewMode === "grid"
                ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          `}
        >
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onDelete={() => handleDeleteClick(contact)}
              onEdit={() => handleEditClick(contact)}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <LuSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No contacts found
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Start by adding your first contact"}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-2">Delete Contact</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {contactToDelete?.name}? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <AddContactModal
          onSuccess={handleAddSuccess}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contactId={contactToEdit}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default ContactsPage;
