// components/RegistroUsuario.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [instrucciones, setInstrucciones] = useState({ mensaje: '', recomendacion: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar instrucciones desde el archivo XML
    fetch('/instrucciones.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        const mensaje = xmlDoc.getElementsByTagName("mensaje")[0].textContent;
        const recomendacion = xmlDoc.getElementsByTagName("recomendacion")[0].textContent;
        setInstrucciones({ mensaje, recomendacion });
      })
      .catch(error => console.error("Error cargando instrucciones.xml:", error));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
      alert('El usuario ya existe.');
      return;
    }
    users.push({ username, password, userType });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario registrado exitosamente.');
    navigate('/');
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      
      {/* Mostrar instrucciones desde el archivo XML */}
      <div className="instrucciones">
        <p>{instrucciones.mensaje}</p>
        <p>{instrucciones.recomendacion}</p>
      </div>

      <form onSubmit={handleRegister}>
        <label>Usuario:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <label>Tipo de Usuario:</label>
        <label>
          <input type="radio" name="userType" value="Alumno" onChange={() => setUserType('Alumno')} required /> Alumno
        </label>
        <label>
          <input type="radio" name="userType" value="Maestro" onChange={() => setUserType('Maestro')} required /> Maestro
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
