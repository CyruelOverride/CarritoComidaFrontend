import { useState, useEffect } from 'react';
import { obtenerCategorias } from '../services/api';
import './CategoryNav.css';

function CategoryNav({ categoriaSeleccionada, onCategoriaChange }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      // Agregar "Destacados" como primera opción
      setCategorias([{ id: 'todos', nombre: 'Destacados' }, ...data]);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="category-nav-loading">Cargando categorías...</div>;
  }

  return (
    <div className="category-nav-wrapper">
      <div className="category-nav">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            className={`category-nav-btn ${
              categoriaSeleccionada === categoria.id ? 'active' : ''
            }`}
            onClick={() => onCategoriaChange(categoria.id)}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryNav;

