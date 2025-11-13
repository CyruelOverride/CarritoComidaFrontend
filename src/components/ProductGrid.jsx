import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ productos, onAgregarAlCarrito }) {
  // Agrupar productos por categoría
  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoria = producto.categoria?.nombre || 'Sin Categoría';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});

  const categorias = Object.keys(productosPorCategoria).sort();

  return (
    <div>
      {categorias.map(categoria => (
        <div key={categoria} className="card category-section">
          <h2 className="category-title">{categoria}</h2>
          <div className="products-grid">
            {productosPorCategoria[categoria].map(producto => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onAgregar={onAgregarAlCarrito}
              />
            ))}
          </div>
        </div>
      ))}
      
      {categorias.length === 0 && (
        <div className="card empty-products">
          <p>No hay productos disponibles</p>
          <p>Ve a Administración para agregar productos</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;

