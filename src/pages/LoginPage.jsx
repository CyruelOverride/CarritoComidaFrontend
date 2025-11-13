import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/api';
import './LoginPage.css';

function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUsuario(usuario, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');

      if (data.isAdmin) navigate('/productos');
      else navigate('/');
    } catch (err) {
      setError('Credenciales inválidas o error de conexión');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🔐 Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
