import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/api';

function useProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
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

