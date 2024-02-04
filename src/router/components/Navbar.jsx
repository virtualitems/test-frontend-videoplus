import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAuthToken, deleteAuthToken, getAuthData } from '../../auth/token';


function Navbar() {

  const token = getAuthToken();
  const authdata = JSON.parse(getAuthData());

  function logout() {
    deleteAuthToken();
    window.location.href = '/';
  }

  return (
    // dark header
    <Nav className="bg-dark text-dark" variant="pills">
      <Nav.Item>
        <Link to="/videos" className="nav-link text-light">Videos</Link>
      </Nav.Item>
      {
        token === null?
        (
          <>
          <Nav.Item>
            <Link to="/login" className="nav-link text-light">Iniciar sesión</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/register" className="nav-link text-light">Registrarse</Link>
          </Nav.Item>
          </>
        ) : (
          <>
          <Nav.Item>
            <Link to={`/users/${authdata.person}`} className="nav-link text-light">
              Perfil
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/videos/create" className="nav-link text-light">Subir video</Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="nav-link text-light" onClick={logout} >Cerrar sesión</Nav.Link>
          </Nav.Item>
          </>
        )
      }
    </Nav>
  );
}

export default Navbar;