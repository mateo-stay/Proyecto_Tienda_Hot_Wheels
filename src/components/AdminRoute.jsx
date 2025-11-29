// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../services/auth";

export default function AdminRoute({ children }) {
  if (!isAdmin()) {
    // si no es admin lo mandamos al login
    return <Navigate to="/login" replace />;
  }
  return children;
}
