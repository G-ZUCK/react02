import React, { useEffect, useState } from 'react'
import AppForm from './AppForm'
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../conexion/firebase';

import "react-toastify/dist/ReactToastify.css";           // Para estilos
import { ToastContainer, toast } from "react-toastify";   // Para contenedor y diseño

const AppLista = (props) => {

  ////// Lectura fnRead ///////////
  const [docBD, setDocBD] = useState([]);
  //console.log(docBD);
  const fnRead = () => {
    const xColeccionConQuery = query(collection(db, 'persona'));
    //const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const unsubcribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach((doc) => {
        xDoc.push({id: doc.id, ...doc.data()})
      });
      setDocBD(xDoc);
    });
  }
  //console.log(docBD); 

  fnRead(); //Prueba sin useEffect
  //useEffect(()=>{fnRead();}, [props.idActual]);

  ////// Delete ////////////////////
  const [idActual, setIdActual] = useState("");
  const [i, setI] = useState(1);  //Falta

  const fnDelete = async (xId) => {
    if(window.confirm("Confirme para eliminar")){
      await deleteDoc(doc(db, 'persona', xId));
      toast("Doc. eliminado con éxito", {
        type:"error",
        autoClose:2000
      });
      //console.log("Se ELIMINO con éxito...");
    }
  }

  const fnCerrar = async (xId) => {
    props.handleCerrarSesion();
  }

  //style={{ background:"greenyellow", padding:"10px" }}
  return (
    <div className='container text-center'>
      <div className='card bs-secondary p-3 mt-3'> 

        <ToastContainer />

        <div className='col-md-12 p-2'>
          <div className='card mb-1'>
            <AppForm {...{idActual, setIdActual}} />
          </div>
        </div>

        <div className='col-md-12 p-2'>
          <div className='card mb-1'>
            <h2>Lista de clientes (AppLista.js)</h2>
          </div>
        </div>

        <div className='col-md-12 p-2'>
          {
            docBD.map((row, index) =>  
              <div className='card mb-1' key={row.id} >
                <div className='card-body'>
                  <div className='d-flex justify-content-between'>
                    <h4>No. {index+1}. {row.nombre}</h4>
                    <div>
                      <i className='material-icons text-danger' 
                        onClick={() => fnDelete(row.id)}>close</i>
                        ...
                        <i className='material-icons text-warning' 
                          onClick={() => setIdActual(row.id)}>create</i>
                    </div>
                  </div>
                  <div className='d-flex justify-content'>
                    <span>Edad: {row.edad} </span> ...
                    <a href='#'>Genero: {row.genero} </a>
                  </div>
                </div>
              </div>
            )
         }
        </div>
      </div>
    </div>
  )
}

export default AppLista;