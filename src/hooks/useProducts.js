import { useState, useEffect } from 'react';
import productosData from '../data/products';

function useProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    try {
      // Usar datos estáticos en lugar de API
      setProductos(productosData);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar productos');
      setLoading(false);
    }
  };

  const recargarProductos = () => {
    setLoading(true);
    cargarProductos();
  };

  return { productos, loading, error, recargarProductos };
}

export default useProducts;

