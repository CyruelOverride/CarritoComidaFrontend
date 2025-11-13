import { useState } from 'react';
import { compressImage, validateFileSize, getBase64Size } from '../utils/imageCompressor';
import './ImageUploader.css';

function ImageUploader({ onImagenesChange, imagenesIniciales = [] }) {
  const [imagenes, setImagenes] = useState(imagenesIniciales);
  const [previews, setPreviews] = useState(
    imagenesIniciales.map(img => img.url || img)
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        // Validar tamaño (máximo 10MB antes de comprimir)
        if (!validateFileSize(file, 10)) {
          alert(`La imagen ${file.name} es demasiado grande (máximo 10MB)`);
          continue;
        }
        
        try {
          // Comprimir imagen (800x800, calidad 0.8)
          const base64String = await compressImage(file, 800, 800, 0.8);
          
          // Verificar tamaño después de comprimir
          const size = getBase64Size(base64String);
          console.log(`Imagen comprimida: ${size.sizeKB} KB`);
          
          const nuevaImagen = { url: base64String };
          
          setImagenes(prev => {
            const updated = [...prev, nuevaImagen];
            onImagenesChange(updated);
            return updated;
          });
          
          setPreviews(prev => [...prev, base64String]);
        } catch (error) {
          console.error('Error al procesar imagen:', error);
          alert(`Error al procesar ${file.name}`);
        }
      }
    }
    
    setLoading(false);
    // Limpiar el input para permitir seleccionar el mismo archivo
    e.target.value = '';
  };

  const agregarImagenURL = () => {
    const url = prompt('Ingresa la URL de la imagen:');
    if (url && url.trim()) {
      const nuevaImagen = { url: url.trim() };
      const nuevasImagenes = [...imagenes, nuevaImagen];
      setImagenes(nuevasImagenes);
      setPreviews([...previews, url.trim()]);
      onImagenesChange(nuevasImagenes);
    }
  };

  const eliminarImagen = (index) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    const nuevosPreviews = previews.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes);
    setPreviews(nuevosPreviews);
    onImagenesChange(nuevasImagenes);
  };

  return (
    <div className="image-uploader">
      <div className="upload-actions">
        <label className={`upload-button btn btn-primary ${loading ? 'loading' : ''}`}>
          {loading ? '⏳ Procesando...' : '📁 Seleccionar Archivos'}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={loading}
          />
        </label>
        
        <button
          type="button"
          className="btn btn-secondary"
          onClick={agregarImagenURL}
          disabled={loading}
        >
          🔗 Agregar por URL
        </button>
      </div>
      
      {loading && (
        <div className="upload-info">
          <small>Comprimiendo imágenes para mejor rendimiento...</small>
        </div>
      )}

      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((preview, index) => (
            <div key={index} className="image-preview-item">
              <img src={preview} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="btn-remove"
                onClick={() => eliminarImagen(index)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}

      {previews.length === 0 && (
        <div className="no-images">
          <p>No hay imágenes. Selecciona archivos o agrega URLs.</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

