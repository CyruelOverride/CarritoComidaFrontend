import CartItem from './CartItem';
import './Cart.css';

function Cart({ carrito, onActualizarCantidad, onEliminar, total }) {
  if (carrito.length === 0) {
    return (
      <div className="card">
        <h2>🛍️ Carrito (0)</h2>
        <div className="empty-state">
          <p>El carrito está vacío</p>
          <p>👈 Selecciona productos para empezar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🛍️ Carrito ({carrito.length})</h2>
      
      {carrito.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onActualizarCantidad={onActualizarCantidad}
          onEliminar={onEliminar}
        />
      ))}

      <div className="cart-total">
        <h3>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </h3>
      </div>
    </div>
  );
}

export default Cart;

