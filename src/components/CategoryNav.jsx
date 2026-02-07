import categoriasData from '../data/categories';
import './CategoryNav.css';

function CategoryNav({ categoriaSeleccionada, onCategoriaChange }) {
  // Usar datos estáticos en lugar de API
  // Agregar "Destacados" como primera opción
  const categorias = [{ id: 'todos', nombre: 'Destacados' }, ...categoriasData];

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

