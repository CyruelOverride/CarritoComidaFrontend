/**
 * Verifica si una URL es una imagen base64
 */
export const isBase64Image = (url) => {
  return url?.startsWith('data:image/');
};

/**
 * Obtiene la URL correcta para mostrar una imagen
 * Puede ser base64, URL externa, o ruta local
 */
export const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/200x150?text=Sin+Imagen';
  
  // Si ya es base64 o URL completa, devolverla tal cual
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Si la URL comienza con 'uploads/', asumimos que es relativa al servidor backend
  if (url.startsWith('uploads/')) {
    return `http://localhost:3000/${url}`;
  }
  
  // Si es una ruta local, intentar desde /images/productos/
  if (!url.startsWith('/')) {
    return `/images/productos/${url}`;
  }
  
  return url;
};

/**
 * Convierte un archivo a base64
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

