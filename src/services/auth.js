// src/services/auth.js
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function decodeToken(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error("Error al decodificar token", e);
    return null;
  }
}

export async function signIn(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await res.json(); // { token, usuario? }
  const payload = decodeToken(data.token); // { sub, role, exp, ... }

  // si el backend te devuelve usuario, lo usamos; si no, rellenamos con el token
  const usuarioBackend = data.usuario || {};

  const usuario = {
    id: usuarioBackend.id ?? null,
    nombre: usuarioBackend.nombre ?? "",       // 👈 clave: ahora SIEMPRE existe nombre
    email: usuarioBackend.email ?? payload?.sub ?? email,
    rol: usuarioBackend.rol ?? payload?.role ?? "cliente",
  };

  // Guardar token y usuario
  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(usuario));

  return { token: data.token, usuario };
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("usuario");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.rol === "admin";
}
