import React, {useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllDogs,filterTemperament,organizeByWeight} from '../actions/index.js'

let showRazas

function InputBusqueda({setCurrentPage,setsearch, temp}){
    const dispatch = useDispatch()

    const razas = useSelector((state) => state.todosLosdogs)

    if(showRazas === undefined){
        showRazas = razas
    }

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

    const organizateByWeight = (event) => {
        setCurrentPage(0)
        setsearch(event.target.value)
        dispatch(organizeByWeight(event.target.value))
    }

    return (
        <div className="InputBusqueda">
            <input type="text" value={searchn} onChange={onSearchChange} placeholder="Nombre de Raza"/>
            <select name="select" onChange={e => onSearchChangeTemp(e)}>
                <option key="tempera" value=''>Temperamento</option>
                {temp.map(e => (
                    <option  key={e.ID} value={e.Nombre}>{e.Nombre}</option>
                ))}
            </select>
            <select name="select" onChange={e => onSearchChange(e)}>
                <option key="razaDog" value=''>Raza</option>
                {showRazas.map(e => (
                    <option key={e.ID} value={e.Nombre}>{e.Nombre}</option>
                ))}
            </select>
            <select name="select" onChange={e => organizateByWeight(e)}>
                <option key="ordenar" value=''>Ordenar</option>
                    <option key="pesomin" value="asc" >PesoAscendente</option>
                    <option key="pesomax" value="des">PesoDescendente</option>
                    <option key="a-z" value="asc">AlfabeticoAscendente</option>
                    <option key="z-a" value="des">alfabeticoDescendente</option>
            </select>
        </div>    
    )
} 

export default InputBusqueda