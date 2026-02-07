import { getImageUrl } from '../utils/imageHelper';
import './CartItem.css';

function CartItem({ item, onActualizarCantidad, onEliminar }) {
  const imagenPrincipal = getImageUrl(item.imagenes?.[0]?.url);
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={imagenPrincipal} alt={item.nombre} />
      </div>
      <div className="cart-item-info">
        <h4>{item.nombre}</h4>
        <p>${Math.round(item.precio)} × {item.cantidad} = ${Math.round(item.precio * item.cantidad)}</p>
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

