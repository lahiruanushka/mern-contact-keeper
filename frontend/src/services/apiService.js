import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

const createHeaders = (token) => ({
  Authorization: token ? `Bearer ${token}` : undefined,
  "Content-Type": "application/json",
});

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
      headers: createHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login Error");
  }
};

const register = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData,
      {
        headers: createHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Register Error");
  }
};

const authMe = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to check authorization"
    );
  }
};

const getContacts = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts`, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch contacts"
    );
  }
};

const getContact = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts/${id}`, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching contact");
  }
};

const addContact = async (contactData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contacts`, contactData, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error adding contact");
  }
};

const updateContact = async (id, contactData, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/contacts/${id}`,
      contactData,
      {
        headers: createHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating contact");
  }
};

const deleteContact = async (id, token) => {
  try {
    await axios.delete(`${API_BASE_URL}/contacts/${id}`, {
      headers: createHeaders(token),
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting contact");
  }
};

export {
  login,
  register,
  authMe,
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
