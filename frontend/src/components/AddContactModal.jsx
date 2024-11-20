import React, { useState } from "react";
import { addContact } from "../services/apiService";

const AddContactModal = ({ onSuccess, onClose, isOpen }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ACCESS_TOKEN = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone } = contact;

    if (!name || !email || !phone) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await addContact(contact, ACCESS_TOKEN);
      onClose();

      if (onSuccess) onSuccess();
      // Reset form
      setContact({ name: "", email: "", phone: "" });
      setError("");
    } catch (error) {
      setError("Failed to add contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add New Contact
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter the details of your new contact below
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Cancel
                  </button>
                   <button
                      type="submit"
                      disabled={loading}
                      className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Adding...
                        </div>
                      ) : (
                        "Add Contact"
                      )}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default AddContactModal;