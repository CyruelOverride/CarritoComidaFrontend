# 🛒 Carrito de Pedidos - Frontend

Aplicación web moderna para gestión de productos y pedidos, con panel de administración integrado.

## ✨ Características

### 🛍️ Tienda
- Catálogo de productos con imágenes
- Carrito de compras interactivo
- Gestión de cantidades
- Formulario de pedido completo
- Cálculo automático de totales y cambio

### 🛠️ Panel de Administración
- CRUD completo de productos
- Gestión de múltiples imágenes por producto
- Interfaz intuitiva y responsiva
- Validaciones en tiempo real

## 🚀 Instalación

```bash
npm install
```

## 🏃‍♂️ Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Alert.jsx       # Notificaciones
│   ├── Cart.jsx        # Carrito de compras
│   ├── CartItem.jsx    # Item del carrito
│   ├── Header.jsx      # Cabecera
│   ├── Loading.jsx     # Spinner de carga
│   ├── OrderForm.jsx   # Formulario de pedido
│   ├── ProductCard.jsx # Tarjeta de producto
│   ├── ProductGrid.jsx # Grid de productos
│   └── ProductManagement.jsx # Panel de administración
│
├── hooks/              # Custom Hooks
│   ├── useCart.js      # Lógica del carrito
│   └── useProducts.js  # Carga de productos
│
├── services/           # Servicios API
│   └── api.js          # Llamadas al backend
│
├── pages/              # Páginas
│   └── ShopPage.jsx    # Página principal de tienda
│
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## 🎨 Tecnologías

- ⚛️ React 19
- ⚡ Vite
- 🎨 CSS Modular
- 🪝 Custom Hooks
- 📱 Diseño Responsivo

## 📦 Características del Código

- ✅ Componentes modulares y reutilizables
- ✅ Separación de responsabilidades
- ✅ Custom hooks para lógica compartida
- ✅ CSS modular por componente
- ✅ Servicios centralizados para API
- ✅ Gestión de estado con React Hooks

## 🔌 Conexión con Backend

Asegúrate de que el backend esté corriendo en `http://localhost:3000`

Si necesitas cambiar la URL, edita el archivo `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:3000';
```

## 🎯 Uso

1. **Tienda**: 
   - Navega por los productos
   - Agrégalos al carrito
   - Completa el formulario de pedido
   - Envía tu pedido

2. **Administración**:
   - Cambia a la pestaña "Administración"
   - Crea, edita o elimina productos
   - Agrega múltiples imágenes por producto
   - Los cambios se reflejan inmediatamente en la tienda

## 🏗️ Build para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`
"# CarritoComidaFrontend" 
