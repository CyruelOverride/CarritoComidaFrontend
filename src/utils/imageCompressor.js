/**
 * Comprime una imagen antes de convertirla a Base64
 * @param {File} file - Archivo de imagen
 * @param {number} maxWidth - Ancho máximo (default: 800px)
 * @param {number} maxHeight - Alto máximo (default: 800px)
 * @param {number} quality - Calidad de compresión 0-1 (default: 0.8)
 * @returns {Promise<string>} - Imagen en Base64 comprimida
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Crear canvas para redimensionar
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calcular nuevas dimensiones manteniendo aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen redimensionada
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a Base64 con compresión
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      
      img.onerror = reject;
      img.src = e.target.result;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Valida el tamaño de un archivo
 * @param {File} file - Archivo a validar
 * @param {number} maxSizeMB - Tamaño máximo en MB (default: 5MB)
 * @returns {boolean} - true si es válido
 */
export const validateFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Obtiene información sobre el tamaño de una imagen Base64
 * @param {string} base64String - Imagen en Base64
 * @returns {Object} - { sizeKB, sizeMB }
 */
export const getBase64Size = (base64String) => {
  const sizeBytes = (base64String.length * 3) / 4;
  const sizeKB = sizeBytes / 1024;
  const sizeMB = sizeKB / 1024;
  
  return {
    sizeKB: sizeKB.toFixed(2),
    sizeMB: sizeMB.toFixed(2)
  };
};

