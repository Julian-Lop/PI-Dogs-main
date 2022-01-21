import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import {getAllDogs,filterTemperament} from '../actions/index.js'

function InputBusqueda({setCurrentPage,setsearch, temp, razas}){
    const dispatch = useDispatch()

    const [searchn, setsearchn] = useState('');

    const onSearchChange = (event) => {
        setCurrentPage(0)
        setsearchn(event.target.value)
        dispatch(getAllDogs(event.target.value))
    }

    const onSearchChangeTemp = (event) => {
        setCurrentPage(0)
        setsearch(event.target.value)
        dispatch(filterTemperament(event.target.value))
    }
    return (
        <div className="InputBusqueda">
            <input type="text" value={searchn} onChange={onSearchChange} placeholder="Nombre de Raza"/>
            <select name="select" onChange={e => onSearchChangeTemp(e)}>
                <option value=''>Temperamento</option>
                {temp.map(e => (
                    <option value={e.Nombre}>{e.Nombre}</option>
                ))}
            </select>
            <select name="select" onChange={e => onSearchChange(e)}>
                <option value=''>Raza</option>
                {Raza.map(e => (
                    <option value={e.Nombre}>{e.Nombre}</option>
                ))}
            </select>
        </div>    
    )
} 

export default InputBusqueda