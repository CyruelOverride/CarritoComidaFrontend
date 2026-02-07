import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { obtenerProducto } from '../services/api';
import { getImageUrl } from '../utils/imageHelper';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [bebidasAbierto, setBebidasAbierto] = useState(false);
  const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState({});

  // Lista de bebidas disponibles
  const bebidas = [
    { id: 1, nombre: 'Coca Cola', precio: 100 },
    { id: 2, nombre: 'Coca Cola Cero', precio: 100 },
    { id: 3, nombre: 'Fanta', precio: 100 },
    { id: 4, nombre: 'Sprite', precio: 100 },
    { id: 5, nombre: 'Schweppes pomelo', precio: 100 },
    { id: 6, nombre: 'Agua', precio: 100 },
    { id: 7, nombre: 'Agua con gas', precio: 100 },
  ];

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await obtenerProducto(id);
        setProducto(data);
      } catch (err) {
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleCantidadChange = (delta) => {
    setCantidad(Math.max(1, cantidad + delta));
  };

  const handleBebidaCantidad = (bebidaId, delta) => {
    setBebidasSeleccionadas(prev => {
      const nuevaCantidad = (prev[bebidaId] || 0) + delta;
      if (nuevaCantidad < 0) return prev;
      if (nuevaCantidad > 10) return prev;
      return { ...prev, [bebidaId]: nuevaCantidad };
    });
  };

  const handleAgregarAlCarrito = () => {
    // Agregar el producto con la cantidad seleccionada
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    navigate('/carrito');
  };

  const calcularTotalBebidas = () => {
    return Object.entries(bebidasSeleccionadas).reduce((total, [id, cant]) => {
      const bebida = bebidas.find(b => b.id === parseInt(id));
      return total + (bebida ? bebida.precio * cant : 0);
    }, 0);
  };

  const totalBebidas = calcularTotalBebidas();
  const totalItems = Object.values(bebidasSeleccionadas).reduce((sum, val) => sum + val, 0);

  if (loading) return <Loading />;
  if (error) return <div className="error-container">Error: {error} 😢</div>;
  if (!producto) return <div className="error-container">Producto no encontrado 😢</div>;

  // Generar descripción si no existe
  const descripcion = producto.descripcion || (() => {
    const categoria = producto.categoria?.nombre || '';
    if (categoria.toLowerCase().includes('pizza')) {
      return `Disfruta de nuestra ${producto.nombre}, elaborada con ingredientes frescos y de calidad. Perfecta para compartir o disfrutar solo.`;
    } else if (categoria.toLowerCase().includes('hamburguesa')) {
      return `${producto.nombre}: Deliciosa hamburguesa con ingredientes premium, acompañada de papas fritas doradas.`;
    } else {
      return `Disfruta de nuestro ${producto.nombre}, preparado con ingredientes frescos y de la más alta calidad.`;
    }
  })();

  return (
    <div className="product-detail-page">
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-content">
          {/* Botón de volver */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            ←
          </button>

          <div className="product-detail-grid">
            {/* Sección izquierda - Imagen */}
            <div className="product-image-section">
              {producto.imagenes && producto.imagenes.length > 0 ? (
                <img 
                  src={getImageUrl(producto.imagenes[0].url)} 
                  alt={producto.nombre}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=Imagen+no+disponible';
                  }}
                  className="product-detail-image"
                />
              ) : (
                <div className="no-image">
                  <img 
                    src="https://via.placeholder.com/600x600?text=Sin+imagen" 
                    alt="Imagen no disponible"
                  />
                </div>
              )}
            </div>

            {/* Sección derecha - Detalles */}
            <div className="product-details-section">
              <h1 className="product-name">{producto.nombre}</h1>
              
              <p className="product-description">{descripcion}</p>
              
              <div className="product-price">${Math.round(producto.precio)}</div>

              {/* Selector de cantidad */}
              <div className="quantity-selector">
                <button 
                  className="qty-btn minus"
                  onClick={() => handleCantidadChange(-1)}
                  disabled={cantidad <= 1}
                >
                  −
                </button>
                <span className="qty-value">{cantidad}</span>
                <button 
                  className="qty-btn plus"
                  onClick={() => handleCantidadChange(1)}
                >
                  +
                </button>
              </div>

              {/* Sección de bebidas */}
              <div className="addons-section">
                <button 
                  className="addons-header"
                  onClick={() => setBebidasAbierto(!bebidasAbierto)}
                >
                  <span>¿Algo para tomar? (500 ml) (hasta 10 items)</span>
                  <span className={`addons-arrow ${bebidasAbierto ? 'open' : ''}`}>▼</span>
                </button>
                
                {bebidasAbierto && (
                  <div className="addons-list">
                    {bebidas.map(bebida => (
                      <div key={bebida.id} className="addon-item">
                        <div className="addon-qty-selector">
                          <button 
                            className="addon-qty-btn minus"
                            onClick={() => handleBebidaCantidad(bebida.id, -1)}
                            disabled={(bebidasSeleccionadas[bebida.id] || 0) === 0}
                          >
                            −
                          </button>
                          <span className="addon-qty-value">
                            {bebidasSeleccionadas[bebida.id] || 0}
                          </span>
                          <button 
                            className="addon-qty-btn plus"
                            onClick={() => handleBebidaCantidad(bebida.id, 1)}
                            disabled={(bebidasSeleccionadas[bebida.id] || 0) >= 10 || totalItems >= 10}
                          >
                            +
                          </button>
                        </div>
                        <span className="addon-name">{bebida.nombre}</span>
                        <span className="addon-price">+ ${bebida.precio}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón agregar al carrito */}
              <button 
                className="add-to-cart-btn-large"
                onClick={handleAgregarAlCarrito}
              >
                Agregar al carrito →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
