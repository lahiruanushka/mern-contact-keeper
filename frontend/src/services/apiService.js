import axios from 'axios';

const API_URL = "http://localhost:5001/api/contacts";

const getContacts = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};

const getContact = async (id, token) => {
  try {
   const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching contact");
  }
};

const addContact = async (contactData, token) => {
  try {
    const response = await axios.post(API_URL, contactData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error adding contact");
  }
};

const updateContact = async (id, contactData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, contactData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating contact");
  }
};

const deleteContact = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Error deleting contact");
  }
};

export { getContacts, getContact,addContact, updateContact, deleteContact };
