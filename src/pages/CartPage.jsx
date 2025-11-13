import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import Alert from '../components/Alert';
import useCart from '../hooks/useCart';
import { crearCliente, crearPedido } from '../services/api';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();
  const { carrito, actualizarCantidad, eliminarDelCarrito, calcularTotal, vaciarCarrito } = useCart();
  const [alert, setAlert] = useState(null);

  const mostrarAlerta = (mensaje, tipo) => {
    setAlert({ mensaje, tipo });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleEnviarPedido = async ({ cliente, pedido }) => {
    if (!cliente.nombre || !cliente.telefono) {
      mostrarAlerta('Por favor completa los datos del cliente', 'error');
      return;
    }

    if (!pedido.direccion) {
      mostrarAlerta('Por favor ingresa la dirección de entrega', 'error');
      return;
    }

    if (carrito.length === 0) {
      mostrarAlerta('El carrito está vacío', 'error');
      return;
    }

    try {
      const clienteData = await crearCliente(cliente);

      const detalles = carrito.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
      }));

      const pedidoData = {
        clienteId: clienteData.id,
        direccion: pedido.direccion,
        tipoPago: pedido.tipoPago,
        cambio: pedido.tipoPago === 'efectivo' ? pedido.cambio : null,
        detalles,
      };

      await crearPedido(pedidoData);
      mostrarAlerta('¡Pedido enviado con éxito! 🎉', 'success');
      vaciarCarrito();
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      mostrarAlerta('Error al enviar el pedido', 'error');
    }
  };

  return (
    <div className="container">
      {alert && <Alert mensaje={alert.mensaje} tipo={alert.tipo} />}

      <h1>🛒 Tu Carrito</h1>

      <Cart
        carrito={carrito}
        onActualizarCantidad={actualizarCantidad}
        onEliminar={eliminarDelCarrito}
        total={calcularTotal()}
      />

      <OrderForm
        total={calcularTotal()}
        onEnviarPedido={handleEnviarPedido}
        carritoVacio={carrito.length === 0}
      />

      <button className="btn-secondary" onClick={() => navigate('/')}>
        🔙 Seguir comprando
      </button>
    </div>
  );
}

export default CartPage;
