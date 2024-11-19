import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addContact } from "../services/apiService";

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ACCESS_TOKEN = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError('All fields are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await addContact({ name, email, phone }, ACCESS_TOKEN);
      setName('');
      setEmail('');
      setPhone('');
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Phone
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          type="submit"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
