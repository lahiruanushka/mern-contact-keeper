import React, { useState, useEffect, useCallback } from "react";
import ContactCard from "../components/ContactCard";
import { getContacts, deleteContact } from "../services/apiService";
import {
  FaSearch,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ACCESS_TOKEN = localStorage.getItem("authToken");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContacts(ACCESS_TOKEN);
      setContacts(data);
      setFilteredContacts(data);
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
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id, ACCESS_TOKEN);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 pl-12 pr-12 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-xl" />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center text-red-500 mb-4">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </div>
      )}

      {filteredContacts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onDelete={() => handleDelete(contact._id)}
            />
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-600">No contacts available</p>
        )
      )}
    </div>
  );
};

export default ContactsPage;
