import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Alert from '../components/Alert';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';

function ShopPage() {
  const { productos, loading } = useProducts();
  const { carrito, agregarAlCarrito } = useCart();
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const mostrarAlerta = (mensaje, tipo) => {
    setAlert({ mensaje, tipo });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAgregarAlCarrito = (producto) => {
    const mensaje = agregarAlCarrito(producto);
    mostrarAlerta(mensaje, 'success');
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <Header />
      {alert && <Alert mensaje={alert.mensaje} tipo={alert.tipo} />}

      <ProductGrid 
        productos={productos} 
        onAgregarAlCarrito={handleAgregarAlCarrito}
      />

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn" onClick={() => navigate('/carrito')}>
          🛍️ Ver Carrito ({carrito.length})
        </button>
      </div>
    </div>
  );
}

export default ShopPage;
