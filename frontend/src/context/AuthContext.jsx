import React, { useState, useEffect } from "react";
import { authMe } from "../services/apiService";

// Authentication Context for global state management
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authorization on page load/refresh
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authMe(token);
          console.log(response);
          if (response) {
            setIsAuthenticated(true);
            setUser(response);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
