import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ productos, onAgregarAlCarrito }) {
  if (productos.length === 0) {
    return (
      <div className="empty-products">
        <p>No hay productos disponibles</p>
        <p>Ve a Administración para agregar productos</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {productos.map(producto => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAgregar={onAgregarAlCarrito}
        />
      ))}
    </div>
  );
}

export default ProductGrid;

