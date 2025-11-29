// src/services/api.js
import { getToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }
  return await res.json();
}

export async function createProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear producto");
  }

  return await res.json();
}

export async function updateProducto(id, data) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar producto");
  }

  return await res.json();
}

export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar producto");
  }
}
