import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "../services/auth"; // 👈 Importa la función del servicio
import "../App.scss";

function Layout({ carrito, usuario, setUsuario }) {
  const cerrarSesion = async () => {
    await signOut(); // 👈 Limpia localStorage o token
    setUsuario(null);
    toast.info("Sesión cerrada correctamente 👋");
  };

  return (
    <div className="layout-container">
      <header>
        <h1>🔥 Hot Wheels Store</h1>

        <nav className="navbar">
          <div className="nav-left">
            <Link to="/">Inicio</Link>
            <Link to="/">Productos</Link>

            {usuario ? (
              <div className="usuario-info">
                <span className="nombre-usuario">
                  👋 {usuario.nombre}
                </span>
                <button className="btn-cerrar" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
              </>
            )}
          </div>

          <div className="nav-right">
            <Link to="/carrito">🛒 Carrito ({carrito.length})</Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2025 Hot Wheels Store — Proyecto DuocUC</p>
      </footer>
    </div>
  );
}

export default Layout;
