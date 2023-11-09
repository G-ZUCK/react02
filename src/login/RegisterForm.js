import React, { useState } from 'react';
import { useAuth } from '../ruteo/AuthContext';
import { useNavigate } from 'react-router-dom';

// Para verificar que no registre con el mismo correo
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../conexion/firebase';

function RegisterForm() {

  const { register } = useAuth();             // Registra usuario
  
  const [email, setEmail] = useState('');       // Variables para correo
  const [password, setPassword] = useState(''); // Variable para password
  
  const navigate = useNavigate();               // Navegación

  const handleRegister = (e) => { 
  }

  return (
    <div  id='public'>
      <h2>Registro de Nuevo Usuario</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterForm;

/*
const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      //await registerUser(email, password);    // Verifica correo ya registrado
      navigate('/iniciarsesion'); // Redirigir a ruta /iniciarsesion
      console.log("Se registro usuario...xxx");
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  }
*/