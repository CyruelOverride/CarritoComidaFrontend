import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageHelper';
import './ProductCard.css';

function ProductCard({ producto, onAgregar }) {
  const imagenPrincipal = getImageUrl(producto.imagenes?.[0]?.url);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onAgregar(producto);
  };

  return (
    <Link to={`/producto/${producto.id}`} className="product-card">
      <div className="product-image">
        <img 
          src={imagenPrincipal} 
          alt={producto.nombre}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x150?text=Sin+Imagen';
          }}
        />
      </div>
      <div className="product-info">
        <h4>{producto.nombre}</h4>
        <div className="price">${producto.precio.toFixed(2)}</div>
        <button 
          className="btn btn-primary btn-block btn-sm"
          onClick={handleAddToCart}
        >
          ➕ Agregar
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;

