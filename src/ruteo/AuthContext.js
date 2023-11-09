// (1) AuthContext.js

// (2) Importando las bibliotecas necesarias
import React, { createContext, useContext, useState, useEffect } from 'react';


import { createUserWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../conexion/firebase';
import { doc, getDoc} from "firebase/firestore";


// (3) Creando un contexto
const AuthContext = createContext();

// (4) Creando un componente proveedor
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Configura un observador de Firebase para la autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Limpia el observador al desmontar el componente
      unsubscribe();
    };
  }, []);
  
  // (5) Def. funciones: iniciar, cerrar, registrar usuarios, etc.
  const signIn = async (email, password) => {     //Iniciar sesión
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio sesión');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const signOut = async () => {                   //Cerrar sesión
    try {
      await signIn();
      console.log('Cerrar sesión:');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const register = async (email, password) => {   //Registrar usuario
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registro usuario');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      return false;
    }
  };

  const registerUser = async (email, password) => { //Verificar si correo ya esta registrado
    try {
      // Verificar si el correo electrónico ya está en uso
      const docRef = doc(db, 'users', email); // Suponiendo que 'users' es una colección de usuarios
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        // El correo electrónico ya está en uso, muestra un mensaje de error al usuario
        throw new Error('El correo electrónico ya está registrado.');
      }
  
      // Si el correo electrónico no está en uso, procede con el registro
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Resto del proceso de registro
  
      return user;
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error('Error al registrar usuario:', error.message);
      throw error;
    }
  }

  // (6) Proporcionar contexto
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// (7) Para consumir el contexto en otros componentes
const useAuth = () => {
  return useContext(AuthContext);   
};

export { AuthProvider, useAuth };
