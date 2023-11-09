import { Routes, Route, Outlet, Switch, Redirect} from 'react-router-dom';
   
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import "./BarraNavegacion.css";
import { useNavigate } from 'react-router-dom';

///////////////// PROTEGIDA - SistemaCRUD //////////////
import SistemaCRUD from '../protegido/SistemaCRUD';
import ListaDeAlumnos from '../protegido/sistemacrud/ListaDeAlumnos';

///////////////// PROTEGIDA - SistemaFILE //////////////
import SistemaFILE from '../protegido/SistemaFILE';
import Fotos from '../protegido/sistemafile/Fotos';


//////////////////////// PAG. PUBLICOS /////////////////
import RegisterForm from '../login/RegisterForm';
import LoginForm from '../login/LoginForm';
import AppLista from '../protegido/sistemacrud/AppLista';
import ListaDeProfesores from '../protegido/sistemacrud/ListaDeProfesores';
import Documentos from '../protegido/sistemafile/Documentos';
import ListaDeDeportes from '../protegido/sistemacrud/ListaDeDeportes';
import ListaDeCarreras from '../protegido/sistemacrud/ListaDeCarreras';
import Pdf from '../protegido/sistemafile/Pdf';
import Videos from '../protegido/sistemafile/Videos';

const BarraRutasProtected = () => {
    const { user } = useAuth();
    const auth = getAuth();
    const navigate = useNavigate();
  
    const handleSignOut = () => {
      if (user) {
        signOut(auth)
          .then(() => {
            // Cierre de sesión exitoso
            navigate('/home'); // Redirigir a ruta /home
          })
          .catch((error) => {
            console.error('Error al cerrar sesión:', error);
          });
      }
    }
  
    return (
      <div style={{ background:"royalblue", padding:"10px" }}>
        <nav>
          <div id="login">
            <ul>
              <li><Link to="/nuevoregistro">Registrar</Link></li>
  
              <li><Link onClick={handleSignOut} >Cerrar sesión</Link> </li> 
  
            </ul>
          </div>
              
          <div id="menu">
            <ul>
              <li><Link to="/sistema-crud/applista">Alumnos(App-Lista)</Link> </li>
              <li><Link to="/sistema-crud/prof">Profesores</Link> </li>
              <li><Link to="/sistema-crud/depor">Deportes</Link> </li>
              <li><Link to="/sistema-crud/carre">Carreras</Link> </li>

              <li><Link to="/sistema-file/fotos">Galeria de Fotos</Link> </li>
              <li><Link to="/sistema-file/docword">Doc.Pdf</Link> </li>
              <li><Link to="/sistema-file/videos">Videos</Link> </li>
              <li><Link to="/sistema-file/docword">Doc. word</Link> </li>
              
            </ul>
          </div>
        </nav>
  
        <Routes>

          <Route path="/iniciarsesion" element={<LoginForm />} />
          <Route path="/nuevoregistro" element={<RegisterForm />} />

          
          <Route path="/sistema-crud" element={<MarcoParaSistemaCRUD />}>
            <Route index element={<SistemaCRUD />} />
            <Route path="applista" element={<AppLista />} />
            <Route path="prof" element={<ListaDeProfesores />} />
            <Route path="depor" element={<ListaDeDeportes />} />
            <Route path="carre" element={<ListaDeCarreras />} />
            
          </Route>
  
  
          <Route path="/sistema-file" element={<MarcoParaSistemaFILE />}>
            <Route index element={<SistemaFILE />} />
            <Route path="fotos" element={<Fotos />} />
            <Route path="docword" element={<Documentos />} />
            <Route path="Pdf" element={<Pdf />} />
            <Route path="Videos" element={<Videos />} />
          </Route>
  
        </Routes>        
      </div>
    )
}

export default BarraRutasProtected;

function MarcoParaSistemaCRUD() {
    return (
      <div style={{background:"cornflowerblue", padding:"10px"}}>
        <h1>Marco sistema CRUD</h1>
        < Outlet /> {/* Aquí se mostrarán las rutas secundarias */}
      </div>
    );
  }
  
function MarcoParaSistemaFILE() {
    return (
      <div style={{background:"slateblue", padding:"10px"}}>
        <h1>Marco Sistema FILES</h1>
        < Outlet /> {/* Aquí se mostrarán las rutas secundarias */}
      </div>
    );
}
  


  
  /*
  
                {user ? (         ////////  Para cerrar sesión   ///////////
                <li><Link onClick={handleSignOut} > Cerrar sesión </Link> </li> 
                ) : (
                <li> <Link to="/iniciarsesion">Iniciar sesión</Link> </li>
              )}

              <li><Link to="/nuevoregistro">Registrar</Link></li>

              {user ? (         ////////  Usuario autenticado  ///////////
                <li>Usuario autenticado: <span> {user.email}</span> </li> 
                ) : (
                null
              )}
  
  
  /*
  
  
  /*
  const handleSignOut = () => {
      if (user) {
        signOut(auth)
          .then(() => {
            // Cierre de sesión exitoso
            navigate('/home'); // Redirigir a ruta /home
          })
          .catch((error) => {
            console.error('Error al cerrar sesión:', error);
          });
      }
    }
  */