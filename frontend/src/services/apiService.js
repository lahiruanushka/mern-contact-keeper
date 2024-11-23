import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const createHeaders = (token) => ({
  Authorization: token ? `Bearer ${token}` : undefined,
  "Content-Type": "application/json",
});

const handleApiError = (error) => {
  if (error.response?.data) {
    // Return the error response from our API
    return error.response.data;
  }
  // For network errors or other issues
  return {
    success: false,
    message: error.message || "An unexpected error occurred",
  };
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
      headers: createHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
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
    return handleApiError(error);
  }
};

const authMe = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const getContacts = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts`, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const getContact = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts/${id}`, {
      headers: createHeaders(token),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const addContact = async (contactData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/contacts`,
      contactData,
      {
        headers: createHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
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
    return handleApiError(error);
  }
};

const deleteContact = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/contacts/${id}`,
      {
        headers: createHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
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