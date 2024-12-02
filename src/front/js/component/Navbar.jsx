import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useContext } from "react";
import "../../styles/nav.css";
import starwarsImageUrl from "../../img/logo-starwars.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()


  const handleLogin = () => {
    if (store.isLoged) {
      actions.logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img className="mx-4" height="70" src={starwarsImageUrl} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Menu</h5>
            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item text-white p-2">
                {store.isLoged ? `Bienvenido ${store.user}` : ''}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/characters">
                  Characters
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/planets">
                  Planets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/starships">
                  Starships
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacts">
                  Contacts
                </Link>
              </li>
              <li className="nav-item dropdown dropdown-menu-left">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Favorites({store.favorites.length})
                </a>
                <ul className="dropdown-menu dropdown-menu-dark p-2">
                  {store.favorites.map((favorite, id) => (
                    <div className="d-flex">
                      <li><a className="dropdown-item">{favorite.name}</a></li>
                      <a onClick={() => { actions.deleteFavorite(favorite) }}><i className="fas fa-trash"></i></a>
                    </div>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <div>
                  <button className="btn btn-primary" onClick={handleLogin}>
                    {store.isLoged ? 'Logout' : 'Login'}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
