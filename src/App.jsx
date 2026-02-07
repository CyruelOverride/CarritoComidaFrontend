import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import ProductManagement from './components/ProductManagement';
import CategoryManagement from './components/CategoryManagement';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/productos" element={<ProductManagement />} />
          <Route path="/categorias" element={<CategoryManagement />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
