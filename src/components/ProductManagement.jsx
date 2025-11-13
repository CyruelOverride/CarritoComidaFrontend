import { useState, useEffect } from 'react';
import { 
  obtenerProductos, 
  crearProducto, 
  actualizarProducto, 
  eliminarProducto,
  obtenerCategorias 
} from '../services/api';
import ImageUploader from './ImageUploader';
import './ProductManagement.css';

function ProductManagement() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoriaId: '',
    tiempoPreparacion: 15,
    imagenes: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [productosData, categoriasData] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias()
      ]);
      setProductos(productosData);
      setCategorias(categoriasData);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      mostrarAlerta('Error al cargar datos', 'error');
      setLoading(false);
    }
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlert({ mensaje, tipo });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.imagenes.length === 0) {
      mostrarAlerta('Agrega al menos una imagen', 'error');
      return;
    }

    try {
      const productoData = {
        ...formData,
        imagenes: formData.imagenes
      };

      if (editando) {
        await actualizarProducto(editando, productoData);
        mostrarAlerta('Producto actualizado correctamente', 'success');
      } else {
        await crearProducto(productoData);
        mostrarAlerta('Producto creado correctamente', 'success');
      }

      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      mostrarAlerta('Error al guardar el producto', 'error');
    }
  };

  const handleEditar = (producto) => {
    setEditando(producto.id);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      categoriaId: producto.categoriaId,
      tiempoPreparacion: producto.tiempoPreparacion,
      imagenes: producto.imagenes || []
    });
    setMostrarForm(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await eliminarProducto(id);
      mostrarAlerta('Producto eliminado correctamente', 'success');
      cargarDatos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      mostrarAlerta('Error al eliminar el producto', 'error');
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      precio: '',
      categoriaId: '',
      tiempoPreparacion: 15,
      imagenes: []
    });
    setEditando(null);
    setMostrarForm(false);
  };

  const handleImagenesChange = (nuevasImagenes) => {
    setFormData({
      ...formData,
      imagenes: nuevasImagenes
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="management-header">
        <h2>🛠️ Gestión de Productos</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? '❌ Cancelar' : '➕ Nuevo Producto'}
        </button>
      </div>

      {alert && (
        <div className={`alert alert-${alert.tipo}`}>
          {alert.mensaje}
        </div>
      )}

      {mostrarForm && (
        <div className="card form-card">
          <h3>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio *</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoría *</label>
                <select
                  className="form-control"
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tiempo de Preparación (minutos) *</label>
              <input
                type="number"
                className="form-control"
                value={formData.tiempoPreparacion}
                onChange={(e) => setFormData({ ...formData, tiempoPreparacion: e.target.value })}
                min="1"
                step="1"
                required
              />
              <small style={{ color: 'var(--gray-600)', display: 'block', marginTop: '0.5rem' }}>
                Tiempo estimado de preparación del producto
              </small>
            </div>

            <div className="form-group">
              <label>Imágenes *</label>
              <ImageUploader
                onImagenesChange={handleImagenesChange}
                imagenesIniciales={formData.imagenes}
              />
              <small style={{ color: 'var(--gray-600)', display: 'block', marginTop: '0.5rem' }}>
                Puedes subir archivos desde tu computadora o agregar URLs de imágenes
              </small>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                {editando ? '💾 Actualizar' : '➕ Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="productos-list">
        <h3>Lista de Productos ({productos.length})</h3>
        <div className="productos-table">
          {productos.map(producto => (
            <div key={producto.id} className="producto-item">
              <div className="producto-imagen">
                <img 
                  src={producto.imagenes?.[0]?.url || 'https://via.placeholder.com/80?text=Sin+Imagen'} 
                  alt={producto.nombre}
                />
              </div>
              <div className="producto-info">
                <h4>{producto.nombre}</h4>
                <p className="producto-categoria">{producto.categoria?.nombre || 'Sin categoría'}</p>
                <p className="producto-precio">${producto.precio.toFixed(2)}</p>
                <p className="producto-tiempo">⏱️ {producto.tiempoPreparacion} min</p>
                {producto.imagenes && producto.imagenes.length > 1 && (
                  <small className="producto-imagenes-count">
                    📷 {producto.imagenes.length} imágenes
                  </small>
                )}
              </div>
              <div className="producto-actions">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditar(producto)}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(producto.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;

