import { useState } from 'react';
import './OrderForm.css';

function OrderForm({ total, onEnviarPedido, carritoVacio }) {
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: ''
  });
  
  const [pedido, setPedido] = useState({
    direccion: '',
    tipoPago: 'efectivo',
    cambio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnviarPedido({ cliente, pedido });
    
    // Limpiar formulario después de enviar
    setCliente({ nombre: '', telefono: '' });
    setPedido({ direccion: '', tipoPago: 'efectivo', cambio: '' });
  };

  const calcularCambio = () => {
    if (pedido.cambio && pedido.cambio >= total) {
      return (pedido.cambio - total).toFixed(2);
    }
    return null;
  };

  return (
    <div className="card">
      <h2>📝 Datos del Pedido</h2>
      <form onSubmit={handleSubmit}>
        <h3>Cliente</h3>
        <div className="form-group">
          <label>Nombre *</label>
          <input
            type="text"
            className="form-control"
            value={cliente.nombre}
            onChange={(e) => setCliente({...cliente, nombre: e.target.value})}
            placeholder="Nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono *</label>
          <input
            type="tel"
            className="form-control"
            value={cliente.telefono}
            onChange={(e) => setCliente({...cliente, telefono: e.target.value})}
            placeholder="Número de teléfono"
            required
          />
        </div>

        <h3>Entrega</h3>
        <div className="form-group">
          <label>Dirección *</label>
          <textarea
            className="form-control"
            value={pedido.direccion}
            onChange={(e) => setPedido({...pedido, direccion: e.target.value})}
            placeholder="Dirección completa de entrega"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Pago *</label>
          <select
            className="form-control"
            value={pedido.tipoPago}
            onChange={(e) => setPedido({...pedido, tipoPago: e.target.value})}
            required
          >
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        {pedido.tipoPago === 'efectivo' && (
          <div className="form-group">
            <label>¿Con cuánto paga? *</label>
            <input
              type="number"
              className="form-control"
              value={pedido.cambio}
              onChange={(e) => setPedido({...pedido, cambio: e.target.value})}
              placeholder="Monto con el que pagará"
              min={total}
              step="0.01"
            />
            {calcularCambio() && (
              <small className="cambio-info">
                Cambio: ${calcularCambio()}
              </small>
            )}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-success btn-block"
          disabled={carritoVacio}
        >
          🚀 Enviar Pedido
        </button>
      </form>
    </div>
  );
}

export default OrderForm;

