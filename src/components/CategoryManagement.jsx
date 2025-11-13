import { useState, useEffect } from 'react';
import { 
  obtenerCategorias, 
  crearCategoria, 
  actualizarCategoria, 
  eliminarCategoria 
} from '../services/api';
import './CategoryManagement.css';

function CategoryManagement() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      mostrarAlerta('Error al cargar categorías', 'error');
      setLoading(false);
    }
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlert({ mensaje, tipo });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editando) {
        await actualizarCategoria(editando, formData);
        mostrarAlerta('Categoría actualizada correctamente', 'success');
      } else {
        await crearCategoria(formData);
        mostrarAlerta('Categoría creada correctamente', 'success');
      }

      limpiarFormulario();
      cargarCategorias();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      mostrarAlerta('Error al guardar la categoría', 'error');
    }
  };

  const handleEditar = (categoria) => {
    setEditando(categoria.id);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || ''
    });
    setMostrarForm(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      await eliminarCategoria(id);
      mostrarAlerta('Categoría eliminada correctamente', 'success');
      cargarCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      const mensaje = error.error || 'Error al eliminar la categoría';
      mostrarAlerta(mensaje, 'error');
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      descripcion: ''
    });
    setEditando(null);
    setMostrarForm(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="category-management">
      <div className="management-header">
        <h2>📂 Gestión de Categorías</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? '❌ Cancelar' : '➕ Nueva Categoría'}
        </button>
      </div>

      {alert && (
        <div className={`alert alert-${alert.tipo}`}>
          {alert.mensaje}
        </div>
      )}

      {mostrarForm && (
        <div className="card form-card">
          <h3>{editando ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre * (incluye emoji)</label>
              <input
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: 🍕 Pizzas"
                required
              />
              <small style={{ color: 'var(--gray-600)', marginTop: '0.25rem', display: 'block' }}>
                Tip: Usa emojis para hacer más visual la categoría
              </small>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                className="form-control"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Descripción de la categoría"
                rows="3"
              />
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

      <div className="categorias-list">
        <h3>Lista de Categorías ({categorias.length})</h3>
        <div className="categorias-grid">
          {categorias.map(categoria => (
            <div key={categoria.id} className="categoria-card">
              <div className="categoria-info">
                <h4>{categoria.nombre}</h4>
                <p className="categoria-descripcion">{categoria.descripcion || 'Sin descripción'}</p>
                <span className="categoria-count">
                  {categoria._count?.productos || 0} producto(s)
                </span>
              </div>
              <div className="categoria-actions">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditar(categoria)}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(categoria.id)}
                  disabled={categoria._count?.productos > 0}
                  title={categoria._count?.productos > 0 ? 'No se puede eliminar porque tiene productos' : 'Eliminar categoría'}
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

export default CategoryManagement;

