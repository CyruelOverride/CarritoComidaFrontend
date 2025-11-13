const API_URL = 'http://localhost:3000';

// ============ AUTENTICACIÓN ============
export const loginUsuario = async (email, contrasena) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, contrasena }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al iniciar sesión');
  }

  return response.json();
};

// ============ CLIENTES ============
export const crearCliente = async (cliente) => {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });
  return response.json();
};

// ============ CATEGORÍAS ============
export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/categorias`);
  return response.json();
};

export const obtenerCategoria = async (id) => {
  const response = await fetch(`${API_URL}/categorias/${id}`);
  return response.json();
};

export const crearCategoria = async (categoria) => {
  const response = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  });
  return response.json();
};

export const actualizarCategoria = async (id, categoria) => {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  });
  return response.json();
};

export const eliminarCategoria = async (id) => {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

// ============ PEDIDOS ============
export const crearPedido = async (pedidoData) => {
  const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedidoData)
  });
  return response.json();
};

// ============ PRODUCTOS ============
export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  return response.json();
};

export const obtenerProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`);
  return response.json();
};

export const crearProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return response.json();
};

export const actualizarProducto = async (id, producto) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return response.json();
};

export const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};
