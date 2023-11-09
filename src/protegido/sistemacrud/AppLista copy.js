import React, { useEffect, useState } from 'react'
import AppForm from './AppForm';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../conexion/firebase';
 
const AppLista = (props) => {

  ////// Lectura fnRead ///////////
  const [docBD, setDocBD] = useState([]);
  const fnRead = () => {
    const xColeccionConQuery = query(collection(db, 'persona'));        // Dato de BD
    const unsubcribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];                            // Variable para organizar datos
      xDatosBD.forEach((doc) => {                 // Recorriendo datos fon bucle
        xDoc.push({id:doc.id, ...doc.data()});    // Juntando id y coleccion
      });
      setDocBD(xDoc);                             // Pasando datos a "docBD"
    });
  }
  //fnRead();                                     // Prueba sin useEffect
  useEffect(()=>{ fnRead(); }, [props.idActual]);
  //console.log(docBD); 

  ////// Delete ////////////////////
  const [idActual, setIdActual] = useState("");   // Variable para id de c/coleccion
  const fnDelete = async (xId) => {               // 
    if(window.confirm("Confirme para eliminar")){ // Ventana para confirmar
      await deleteDoc(doc(db, "persona", xId));   // Elimina en BD
    }
    alert("Se ELIMINO con éxito...");
  }
  
  return (
    <div style={{background:"greenyellow", padding:"10px"}}>
      <h1>AppList.js</h1>
      <AppForm {...{idActual, setIdActual}} />  {/* Envios de variables */}
      <h3>Lista de clientes</h3>
      {
        docBD.map((row, index) =>               // Extraer registro e index
          <p key={row.id}>                      {/* Asignar key a <p> */}
            No. {index + 1}. {row.nombre}       {/* Imprimir Numero y nombre */}
            ..... 
            <span onClick={() => fnDelete(row.id)}>x</span>
            ..... 
            <span onClick={() => setIdActual(row.id)}>A</span>
          </p> 
        )
      }
    </div>
  )
}

export default AppLista;
