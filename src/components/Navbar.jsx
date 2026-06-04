import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '/src/assets/LOGO_BANCOSOL.png';

// uso module 

export default function Navbar() {
    const location = useLocation();

    // Comprueba la ruta y devuelve el string con las clases normales
    const checkActive = (path) => {
        return location.pathname.includes(path) ? "nav-item active" : "nav-item";
    };

    return (
        <div className="main-header">
            <div className="top-navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo Bancosol" className="logo-img" />
                </div>
            </div>
            
            <nav className="bottom-navbar">
                <ul className="nav-menu">
                    <li className={checkActive('/campanyas')}>
                        <Link to="/campanyas" className="nav-link">
                            <i className="ri-megaphone-line"></i>
                            <span>Gestión de Campañas</span>
                        </Link>
                    </li>
                    
                    <li className={checkActive('/tiendas')}>
                        <Link to="/tiendas" className="nav-link">
                            <i className="ri-store-2-line"></i>
                            <span>Tiendas</span>
                        </Link>
                    </li>
                    
                    <li className={checkActive('/colaboradores')}>
                        <Link to="/colaboradores" className="nav-link">
                            <i className="ri-user-heart-line"></i>
                            <span>Colaboradores</span>
                        </Link>
                    </li>
                    
                    <li className={checkActive('/coordinadores')}>
                        <Link to="/coordinadores" className="nav-link">
                            <i className="ri-team-line"></i>
                            <span>Coordinadores</span>
                        </Link>
                    </li>
                    
                    <li className={checkActive('/asignacion_turno')}>
                        <Link to="/asignacion_turno" className="nav-link">
                            <i className="ri-clipboard-line"></i>
                            <span>Asignación de turno</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}