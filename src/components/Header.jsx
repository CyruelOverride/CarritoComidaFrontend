import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import './Header.css';

function Header({ productos = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito } = useCart();
  const isActive = (path) => location.pathname === path;

  const handlePedirYa = () => {
    if (location.pathname === '/') {
      // Si ya estamos en la página principal, hacer scroll a los productos
      const productosSection = document.querySelector('.shop-content');
      if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, navegar a inicio
      navigate('/');
    }
  };

  return (
    <div className="hero-wrapper">
      <header className="header-nav">
        <div className="header-nav-container">
          <div className="header-nav-left">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Inicio
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
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">👑 SmashKings</h1>
          <p className="hero-subtitle">Las mejores hamburguesas</p>
          <button className="hero-cta-btn" onClick={handlePedirYa}>
            PEDI YA →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

