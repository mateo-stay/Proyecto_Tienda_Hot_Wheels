// src/layouts/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../services/auth";
import "../App.scss";

function Layout({ carrito, usuario, setUsuario }) {
  const cerrarSesion = () => {
    setUsuario(null);   // limpia el estado en React
    clearAuth();        // limpia token + usuario en localStorage
    toast.info("Sesión cerrada");
  };

  const displayName = usuario?.nombre || usuario?.email || "Usuario";

  return (
    <div>
      <header>
        <h1>Hot Wheels Store</h1>

        <nav className="navbar">
          {/* Lado izquierdo: links principales + login/usuario */}
          <div className="nav-left">
            <Link to="/">Productos</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/nosotros">Nosotros</Link>

            {usuario ? (
              <div className="usuario-info">
                <span className="usuario-chip">{displayName}</span>
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

          {/* Lado derecho: admin (si corresponde) + carrito */}
          <div className="nav-right">
            {usuario?.rol === "admin" && (
              <Link to="/admin" className="nav-link">
                Panel admin
              </Link>
            )}

            <Link to="/carrito" className="carrito-link">
              Carrito <span className="carrito-badge">{carrito.length}</span>
            </Link>
          </div>
        </nav>
      </header>

      <Outlet />

      <footer>
        <p>&copy; 2025 Hot Wheels Store - Proyecto DuocUC</p>
      </footer>
    </div>
  );
}

export default Layout;
