import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import './Header.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito } = useCart();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-nav navbar-standalone">
      <div className="header-nav-container">
        <div className="header-nav-left">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Inicio
          </Link>
          <Link to="/contacto" className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}>
            Contacto
          </Link>
        </div>
        
        <div className="header-nav-center">
          <Link to="/" className="logo">
            <span className="logo-icon">👑</span>
            <span className="logo-text">SmashKings</span>
          </Link>
        </div>
        
        <div className="header-nav-right">
          <Link to="/carrito" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Carrito</span>
            {carrito.length > 0 && (
              <span className="cart-badge">{carrito.length}</span>
            )}
          </Link>
          <button 
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Ingresar →
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

