import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../conexion/firebase';

import { useNavigate } from 'react-router-dom';
import { auth } from '../../conexion/firebase';
import { signOut } from 'firebase/auth';

import { toast } from 'react-toastify';

const AppForm = (props) => {

  ////////////////// MANEJAR INGRESO DE DATOS ///////////
  const handleStatusChange = (e) => { //Manejar cambios
    //console.log(e.target)        //obtiene camposRegistro (objeto)
    //console.log(e.target.value)  //obtiene valor por cada tipeo
    //console.log({name, value})   //obtiene (name:'nombre', value:'xx')
    //console.log({...objeto, [name]:value})  //En Objeto se acumula c/t
    const {name, value} = e.target;
    setObjeto({...objeto, [name]:value});
    //console.log(objeto);
  }

  ////////////////// GUARDAR-ACTUALIZAR /////////////////
  const camposRegistro = { nombre:"", edad:"", genero:""};
  const [objeto, setObjeto] = useState(camposRegistro);
  
  const handleSubmit = async (e) => {   //Manejar submit 
    e.preventDefault();
    try {
      if(props.idActual == ""){
        if(validarForm()){
          addDoc(collection(db, 'persona'), objeto);
          toast("Se guardo con éxito...", {type:'success', autoClose:2000 });
          //console.log("Se registro con éxito...");
        }else{
          console.log("NO se guardo...");
        }
        setObjeto(camposRegistro);
      }else{
        await updateDoc(doc(collection(db, 'persona'), props.idActual), objeto);
        props.setIdActual('');
        toast("Se ACTUALIZO el REGISTRO...", {
          type:'info',
          autoClose:2000
        });
        //console.log("Se ACTUALIZO el REGISTRO...");
      }
    } catch (error) {
      console.log("Error en Crear o actualizar", error);
    }
  }

  const validarForm = () => {
    if(objeto.nombre === "" || /^\s+$/.test(objeto.nombre)){
      toast("Escriba nombre...", {type:'warning', autoClose:2000});
      //alert("Escriba nombre...");
      return false;
    }
    if(objeto.edad === "" || /^\s+$/.test(objeto.edad)){
      toast("Escriba EDAD...", {type:'warning', autoClose:2000});
      //alert("Escriba EDAD...");
      return false;
    }
    if(objeto.genero === "" || /^\s+$/.test(objeto.genero)){
      toast("Seleccione género...", {type:'warning', autoClose:2000});
      //alert("Seleccione género...");
      return false;
    }
    
    return true;
  };

  ////////////// Objetener registro por id //////////////
  useEffect(()=>{
    if(props.idActual ===""){
      setObjeto({...camposRegistro})
    }else{
      obtenerDatosPorId(props.idActual);
    }
  }, [props.idActual]);

  const obtenerDatosPorId = async (xId) => {
    //Console.log("xId: ", xId);
    const objPorId = doc(db, "persona", xId);
    const docPorId = await getDoc(objPorId);
    if(docPorId.exists()){
      //console.log("Datos de doc...", docPorId.data());
      setObjeto(docPorId.data());
    }else{
      console.log("No hay doc");
    }
  }

  const navigate = useNavigate(); // Usa useNavigate para navegación
  const handleCerrarApp = () => {
    // Maneja el cierre de sesión
    signOut(auth);
    navigate('/home'); // Redirige a ...
  };
  //console.log(objeto);
//style={{ background:"orange", padding:"10px" }}
  return (
    <div>
      
      <form className='card card-body' onSubmit={handleSubmit}>

        <div className='col-md-12'>
          <button onClick={handleCerrarApp} className='input-group-text bd-light' >
            Cerrar aplicación
          </button>
        </div>

        <button className='btn btn-primary btn-block'>
          Registrar clientes (AppForm.js)
        </button>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>group_add</i>
          </div>
          <input className='form-control float-start' type='text' placeholder='Nombres...'  
            onChange={handleStatusChange} value={objeto.nombre} name='nombre' />
        </div>
        
        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>star_half</i>
          </div>
          <input className='form-control float-start' type='text' placeholder='Edad...'  
            onChange={handleStatusChange} value={objeto.edad} name='edad' />
        </div>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>insert_link</i>
          </div>
          <select className='form-control float-start' name='genero'
            onChange={handleStatusChange} value={objeto.genero} >
            <option value="">Seleccione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
          
        <button className='btn btn-primary btn-block'>
          {props.idActual=='' ? "Guardar": "Actualizar"}
        </button>
        
      </form>
    </div>
  )
}

export default AppForm;
