import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageHelper';
import './ProductCard.css';

function ProductCard({ producto, onAgregar }) {
  const imagenPrincipal = getImageUrl(producto.imagenes?.[0]?.url);
  
  // Generar una descripción basada en el nombre y categoría
  const generarDescripcion = () => {
    const categoria = producto.categoria?.nombre || '';
    const nombre = producto.nombre.toLowerCase();
    
    // Descripciones genéricas basadas en categorías comunes
    if (categoria.toLowerCase().includes('pizza')) {
      return `Disfruta de nuestra ${producto.nombre}, elaborada con ingredientes frescos y de calidad. Perfecta para compartir o disfrutar solo.`;
    } else if (categoria.toLowerCase().includes('hamburguesa')) {
      return `${producto.nombre}: Deliciosa hamburguesa con ingredientes premium, acompañada de papas fritas doradas.`;
    } else if (categoria.toLowerCase().includes('milanesa')) {
      return `${producto.nombre}: Milanesa crujiente y jugosa, preparada con los mejores ingredientes.`;
    } else if (categoria.toLowerCase().includes('picada')) {
      return `${producto.nombre}: Ideal para compartir en familia o con amigos. Incluye una variedad de opciones deliciosas.`;
    } else {
      return `Disfruta de nuestro ${producto.nombre}, preparado con ingredientes frescos y de la más alta calidad.`;
    }
  };

  const descripcion = generarDescripcion();
  const descripcionTruncada = descripcion.length > 100 
    ? descripcion.substring(0, 100) + '...' 
    : descripcion;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onAgregar(producto);
  };

  return (
    <div className="product-card-wrapper">
      <Link to={`/producto/${producto.id}`} className="product-card">
        <div className="product-image-container">
          <div className="product-image">
            <img 
              src={imagenPrincipal} 
              alt={producto.nombre}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen';
              }}
            />
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label="Agregar al carrito"
          >
            +
          </button>
        </div>
        <div className="product-info">
          <h4 className="product-title">{producto.nombre}</h4>
          <p className="product-description">{descripcionTruncada}</p>
          <div className="price">${Math.round(producto.precio)}</div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;

