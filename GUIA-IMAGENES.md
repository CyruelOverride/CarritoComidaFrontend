# 📸 Guía de Manejo de Imágenes

## 🎯 Problema Resuelto

Antes las imágenes solo podían agregarse por URL. Ahora puedes:
1. ✅ Subir archivos desde tu computadora (se convierten a Base64)
2. ✅ Agregar URLs de imágenes externas
3. ✅ Usar imágenes desde la carpeta `public/images/productos/`

## 📁 Opciones para Cargar Imágenes

### Opción 1: Subir Archivos (Recomendado para empezar)
Las imágenes se convierten a Base64 y se guardan directamente en la base de datos.

**Ventajas:**
- ✅ No necesitas servidor de archivos
- ✅ Funciona inmediatamente
- ✅ Las imágenes se guardan con el producto

**Desventajas:**
- ⚠️ Base de datos más grande
- ⚠️ No ideal para muchas imágenes grandes

### Opción 2: URLs Externas
Usa servicios como Unsplash, Imgur, etc.

**Ejemplo:**
```
https://images.unsplash.com/photo-123456789?w=400
```

### Opción 3: Carpeta Public (Para imágenes locales)
Coloca tus imágenes en `carrito-front/public/images/productos/`

**Ejemplo:**
```
pizza.jpg
hamburguesa.png
```

Luego en el código solo usa el nombre del archivo: `pizza.jpg`

## 🚀 Cómo Usar el Nuevo Sistema

### En el Panel de Administración:

1. **Crear/Editar Producto**
2. En la sección "Imágenes" verás dos botones:
   - 📁 **Seleccionar Archivos**: Sube desde tu PC
   - 🔗 **Agregar por URL**: Pega una URL

3. **Vista Previa**: Verás las imágenes antes de guardar
4. **Eliminar**: Click en ❌ para quitar una imagen

## 🔧 Configuración del Backend

El servidor backend ya está configurado para aceptar imágenes en Base64 o URLs.

### Iniciar el Backend:

```bash
cd carrito-pedidos
npm start
```

El backend debe estar corriendo en `http://localhost:3000`

## 🗄️ Almacenamiento en Base de Datos

Las imágenes se guardan como texto en la tabla `ImagenProducto`:

```sql
url: String  -- Puede ser Base64, URL externa, o nombre de archivo
```

## 💡 Recomendaciones

### Para Desarrollo/Pruebas:
- Usa Base64 (subir archivos)
- Usa URLs de Unsplash

### Para Producción:
- Usa un servicio como:
  - **Cloudinary** (gratis hasta 25GB)
  - **AWS S3** 
  - **ImgBB**
  - **Imgur**

## 🔄 Migrar a Servidor de Archivos (Futuro)

Si quieres cambiar a un servidor de archivos más adelante:

1. Instala `multer` en el backend
2. Configura una ruta para subir archivos
3. Guarda solo la ruta en la BD
4. Las imágenes en Base64 seguirán funcionando

## 📝 Ejemplo de Uso

### Crear un producto con imagen local:

1. Guarda `pizza.jpg` en `carrito-front/public/images/productos/`
2. En el admin, usa "Agregar por URL"
3. Escribe: `pizza.jpg`
4. Guarda el producto

### Crear un producto con archivo:

1. Click en "Seleccionar Archivos"
2. Elige una imagen de tu PC
3. Verás la vista previa
4. Guarda el producto

## ⚠️ Importante

**El backend debe estar corriendo** en `http://localhost:3000` para que el frontend funcione.

Si ves errores de conexión, verifica:
```bash
cd carrito-pedidos
npm start
```

