import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';


const AppForm = (props) => {
 //////GUARDAR / ACTUALIZAR ////
 const campoRegistro = { nombre:"", edad:"", genero:""}
 const [objeto, setObjeto] = useState(campoRegistro);
 console.log(objeto);

    const handleSubmit = async (e) => {    //manejador de submit
        e.preventDefault();

        try {
            if(props.idActual === ""){   //guardar
                if(validarForm()){
                    addDoc(collection(db, 'persona'), objeto);
                      console.log("Se guardo con exito");
                  }else{
                      console.log("No se guardo");
                  }
            }else{   ///actualizar
             await updateDoc(doc(collection(db, "persona"), props.idActual),objeto);
             alert("Se actualizo");
             props.setIdActual('');
            }
            setObjeto(campoRegistro);

           
        } catch (error) {
            console.error();
            
        }
    }

    //Manejador del estado de cambios
    const handleStatusChange = (e) => {
        const {name,value} = e.target;
        setObjeto({...objeto,[name]:value});
        //console.log({name,value});
    }

    //validacion
    const validarForm = () => {
        if(objeto.nombre === ''){
          alert("Escriba nombre...");
          return false;
        }

        return true;
    }

    //////Obtener datos de BD /////
    useEffect(() => {
        if(props.idActual===""){
          setObjeto({...campoRegistro});
        }else{
            obtenerDatosPorId(props.idActual);
        }
    }, [props.idActual]);
    
    const obtenerDatosPorId =async (xId) => {
        const objPorId = doc(db, "persona", xId);
        const docPorId = await getDoc(objPorId);
        if (docPorId.exists()){
            setObjeto(docPorId.data());
        }else{
            alert("No hay doc ...");
        }
    }

    return (
        <div style={{background:"orange",padding:"10px",textAlign:"center"}}>
            <form onSubmit={handleSubmit}>
            <h1>AppForm.js</h1>

            <input onChange = {handleStatusChange}
            value={objeto.nombre} name='nombre'
            type='text' placeholder='Nombre...' /><br/>
            
            <input onChange = {handleStatusChange}
            value={objeto.edad} name='edad'
            type='text' placeholder='Edad...' /><br/>

            <select onChange = {handleStatusChange}
            name='genero' value={objeto.genero}>
                <option value="">Seleccione genero...</option>
                <option value="M"> Masculino </option>
                <option value="F"> Femenino </option>
            </select><br/>
            <button>
                {props.idActual === "" ? "Guardar" : "Actualizar" }
                
            </button>
            </form>
        </div>
    )
}

export default AppForm
