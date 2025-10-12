export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "password1234") {
        const user = { nombre: "Usuario Demo", email, token: "sadjsagdhsgdsadsdjksagd" };
        localStorage.setItem("usuario", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 1000);
  });
}

export function signOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("usuario");
      resolve();
    }, 500);
  });
}