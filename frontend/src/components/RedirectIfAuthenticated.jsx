import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RedirectIfAuthenticated = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/" /> : element;
};

export default RedirectIfAuthenticated;
