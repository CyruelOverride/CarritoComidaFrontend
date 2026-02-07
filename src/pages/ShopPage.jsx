import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import Alert from '../components/Alert';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import { obtenerCategorias } from '../services/api';
import './ShopPage.css';

function ShopPage() {
  const { productos, loading } = useProducts();
  const { carrito, agregarAlCarrito } = useCart();
  const [alert, setAlert] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlert({ mensaje, tipo });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAgregarAlCarrito = (producto) => {
    const mensaje = agregarAlCarrito(producto);
    mostrarAlerta(mensaje, 'success');
  };

  const handleCategoriaChange = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);
  };

  // Filtrar productos por categoría
  const productosFiltrados = categoriaSeleccionada === 'todos'
    ? productos
    : productos.filter(p => {
        const categoriaId = typeof p.categoria?.id === 'number' 
          ? p.categoria.id 
          : parseInt(p.categoria?.id);
        const selectedId = typeof categoriaSeleccionada === 'number' 
          ? categoriaSeleccionada 
          : parseInt(categoriaSeleccionada);
        return categoriaId === selectedId;
      });

  // Obtener nombre de la categoría actual
  const nombreCategoria = categoriaSeleccionada === 'todos'
    ? 'Destacados'
    : categorias.find(c => {
        const catId = typeof c.id === 'number' ? c.id : parseInt(c.id);
        const selectedId = typeof categoriaSeleccionada === 'number' 
          ? categoriaSeleccionada 
          : parseInt(categoriaSeleccionada);
        return catId === selectedId;
      })?.nombre || 'Productos';

  if (loading) return <Loading />;

  return (
    <div className="shop-page">
      <Header productos={productos} />
      <div className="shop-container">
        <div className="shop-content">
          {alert && <Alert mensaje={alert.mensaje} tipo={alert.tipo} />}
          
          <CategoryNav 
            categoriaSeleccionada={categoriaSeleccionada}
            onCategoriaChange={handleCategoriaChange}
          />

          <h2 className="category-heading">{nombreCategoria}</h2>

          <ProductGrid 
            productos={productosFiltrados} 
            onAgregarAlCarrito={handleAgregarAlCarrito}
          />
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
