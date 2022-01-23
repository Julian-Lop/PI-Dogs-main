import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {getTemperaments} from '../actions/index.js'
import '../css/styles.css'

function Createdog(){
    const dispatch = useDispatch()
    const stateTemp = useSelector((state)=> state.temperamentos)

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    const [temp, setTemp] = useState([])
    const [datos, setDatos] = useState({
        nombre: '',
        alturamin: 0,
        alturamax: 0,
        pesomin: 0,
        pesomax: 0,
        vida: 0,
    })

    const handleOnchange = (e) => {
        setDatos({...datos,
            [e.target.id]: e.target.value
        })
        console.log(datos)
    }

    const handleOnchangeTemp= (e) => {
        let tem = temp.indexOf(e)
        if(tem === -1){
            setTemp(old => [...old,e]);
        }else{
            temp.splice(tem,1)
        }
        console.log(temp)
    }

    return (
        <div className="Createdog">
            <h1>Soy el CreateDog</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <label>Nombre de la raza: </label>
                <input type="text" id="nombre" placeholder="Nombre de la raza" 
                value={datos.nombre} onChange={e => handleOnchange(e)}/>
                <br/>
                <label>Altura: </label>
                <input type="number" id="alturamin" placeholder="Altura mínima"
                value={datos.alturamin} onChange={e => handleOnchange(e)}/>
                <input type="number" id="alturamax" placeholder="Altura máxima"
                value={datos.alturamax} onChange={e => handleOnchange(e)}/>
                <br/>
                <label>Peso: </label>
                <input type="number" id="pesomin" placeholder="Peso mínimo"
                value={datos.pesomin} onChange={e => handleOnchange(e)}/>
                <input type="number" id="pesomax" placeholder="Peso máximo"
                value={datos.pesomax} onChange={e => handleOnchange(e)}/>
                <br/>
                <label>Tiempo de vida: </label>
                <input type="number" id="vida" placeholder="tiempo de vida"
                value={datos.vida} onChange={e => handleOnchange(e)}/>
                <br/>
                <label>Seleccione los temperamentos</label>
                <select name="select" onChange={e => handleOnchangeTemp(e.target.value)}>
                    {stateTemp.map(temp => (
                        <option value={temp.Nombre} key={temp.ID}>{temp.Nombre}</option>
                    ))}
                </select>
                <br/>
                <input type="submit" value="enviar"/>
            </form>
        </div>
    )
}

export default Createdog