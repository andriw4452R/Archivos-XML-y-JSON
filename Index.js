// components/Index.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactInfo, setContactInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos de contacto desde data.json
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setContactInfo(data))
      .catch(error => console.error("Error cargando data.json:", error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (user.userType === 'Alumno') {
        navigate('/dashboard-alumno');
      } else {
        navigate('/gestion-trabajos');
      }
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <label>Usuario:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <a href="/registro">¿No tienes una cuenta? Regístrate aquí</a>

      {/* Mostrar información de contacto si está disponible */}
      {contactInfo && (
        <div className="contact-info">
          <h3>Información de Contacto</h3>
          <p>Teléfono: {contactInfo.telefono}</p>
          <p>Ciudad: {contactInfo.ciudad}</p>
          <p>Email: {contactInfo.email}</p>
        </div>
      )}
    </div>
  );
}

export default Index;
