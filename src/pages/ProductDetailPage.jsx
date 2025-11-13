import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import './ProductDetailPage.css';
import { getImageUrl } from '../utils/imageHelper';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto);
    navigate('/carrito');
  };

  if (loading) return <div className="loading">Cargando producto...</div>;
  if (error) return <div className="error">Error: {error} 😢</div>;
  if (!producto) return <div>Producto no encontrado 😢</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        {producto.imagenes && producto.imagenes.length > 0 ? (
          <img 
            src={getImageUrl(producto.imagenes[0].url)} 
            alt={producto.nombre}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
            }}
            className="product-image"
          />
        ) : (
          <div className="no-image">
            <img 
              src="https://via.placeholder.com/400x300?text=Sin+imagen" 
              alt="Imagen no disponible"
            />
          </div>
        )}
      </div>
      <div className="detail-info">
        <h1>{producto.nombre}</h1>
        <p className="price">${producto.precio.toFixed(2)}</p>
        {producto.descripcion && (
          <div className="description">
            <h3>Descripción:</h3>
            <p>{producto.descripcion}</p>
          </div>
        )}
        {producto.categoria && (
          <div className="category">
            <strong>Categoría:</strong> {producto.categoria.nombre}
          </div>
        )}
        <div className="actions">
          <button 
            className="add-to-cart-btn"
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
