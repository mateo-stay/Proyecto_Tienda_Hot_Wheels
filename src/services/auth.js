export async function signIn(email, password) {
  const API_URL = "https://full-stack-auth-need.onrender.com";
  // @ts-ignore
  const API_KEY = import.meta.env.VITE_API_KEY;


  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error("Credenciales inválidas");
  }
}
