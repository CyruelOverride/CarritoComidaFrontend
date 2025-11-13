import { useState, useEffect } from 'react';

const CARRITO_KEY = 'carrito';

function useCart() {
  const [carrito, setCarrito] = useState(() => {
    // Cargar el carrito desde localStorage si existe
    if (typeof window !== 'undefined') {
      const carritoGuardado = localStorage.getItem(CARRITO_KEY);
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }
    return [];
  });

  // Guardar en localStorage cuando el carrito cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    
    return `${producto.nombre} agregado al carrito`;
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad === 0) {
      setCarrito(carrito.filter(item => item.id !== id));
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad } : item
      ));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CARRITO_KEY);
    }
  };

  return {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    calcularTotal,
    vaciarCarrito
  };
}

export default useCart;

