// src/services/api.js
import { getToken } from "./auth";

// Si no tienes VITE_API_URL en el .env, usa este por defecto:
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* =========================================================
 *                  PRODUCTOS
 * ========================================================= */

export async function getProductos() {
  const url = `${API_URL}/productos`;
  console.log("GET productos ->", url);

  const res = await fetch(url, {
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
  const url = `${API_URL}/productos`;
  console.log("POST producto ->", url);

  const res = await fetch(url, {
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
  const url = `${API_URL}/productos/${id}`;
  console.log("PUT producto ->", url);

  const res = await fetch(url, {
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
  const url = `${API_URL}/productos/${id}`;
  console.log("DELETE producto ->", url);

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar producto");
  }
}

/* =========================================================
 *                  USUARIOS / AUTH
 * ========================================================= */

/**
 * Crear usuario
 * Swagger: POST /api/usuarios  (Crear Usuario)
 */
export async function registrarUsuario(data) {
  const url = `${API_URL}/usuarios`;
  console.log("POST registro ->", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let mensaje = res.statusText || "Error al registrar usuario";
    try {
      const body = await res.json();
      if (body.detail) mensaje = body.detail;
    } catch (_e) {
      // si no viene JSON, dejamos el statusText
    }
    throw new Error(mensaje);
  }

  return await res.json(); // lo que tu API devuelva del usuario creado
}

/**
 * Login
 * Swagger: POST /api/auth/login
 */
export async function loginUsuario(credentials) {
  const url = `${API_URL}/auth/login`;
  console.log("POST login ->", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    let mensaje = res.statusText || "Error al iniciar sesión";
    try {
      const body = await res.json();
      if (body.detail) mensaje = body.detail;
    } catch (_e) {}
    throw new Error(mensaje);
  }

  return await res.json(); // normalmente: { access_token, token_type, usuario... }
}
