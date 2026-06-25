import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const homeLink = user?.role === "admin" ? "/admin" : "/";

  return (
    <header className="topbar">
      <Link className="brand" to={homeLink}>
        M-Motors
      </Link>

      <nav aria-label="Navigation principale">
        {!user && <NavLink to="/search">Véhicules</NavLink>}

        {user?.role === "user" && (
          <>
            <NavLink to="/search">Véhicules</NavLink>
            <NavLink to="/dashboard">Espace client</NavLink>
          </>
        )}

        {user?.role === "admin" && <NavLink to="/admin">Administration</NavLink>}
      </nav>

      <div className="session">
        {user ? (
          <>
            <span>{user.email}</span>
            <button type="button" className="button ghost" onClick={logout}>
              Déconnexion
            </button>
          </>
        ) : (
          <Link className="button" to="/login">
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}