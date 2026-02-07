import CartItem from './CartItem';
import './Cart.css';

function Cart({ carrito, onActualizarCantidad, onEliminar, total }) {
  if (carrito.length === 0) {
    return (
      <div className="cart-card">
        <h2 className="cart-card-title">🛍️ Carrito (0)</h2>
        <div className="empty-state">
          <p>El carrito está vacío</p>
          <p>👈 Selecciona productos para empezar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-card">
      <h2 className="cart-card-title">🛍️ Carrito ({carrito.length})</h2>
      
      <div className="cart-items-list">
        {carrito.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onActualizarCantidad={onActualizarCantidad}
            onEliminar={onEliminar}
          />
        ))}
      </div>

      <div className="cart-total">
        <h3>
          <span>Total:</span>
          <span>${Math.round(total)}</span>
        </h3>
      </div>
    </div>
  );
}

export default Cart;

