import './CartItem.css';

function CartItem({ item, onActualizarCantidad, onEliminar }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.nombre}</h4>
        <p>${item.precio.toFixed(2)} × {item.cantidad} = ${(item.precio * item.cantidad).toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button onClick={() => onActualizarCantidad(item.id, item.cantidad - 1)}>−</button>
          <span>{item.cantidad}</span>
          <button onClick={() => onActualizarCantidad(item.id, item.cantidad + 1)}>+</button>
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => onEliminar(item.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default CartItem;

