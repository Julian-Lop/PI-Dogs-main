import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllDogs,getTemperaments,filterTemperament} from '../actions/index.js'
import InputBusqueda from './InputBusqueda.js'

function Homepage (){
    const statedogs = useSelector((state)=> state.todosLosdogs)
    const stateFilter = useSelector((state)=> state.dogsfiltrados)
    // const stateTemperaments = useSelector((state)=> state.temperamentos)
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(0)
    const [search, setsearch] = useState('');

    useEffect(()=>{
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    }, [dispatch])

    const numeroDogs = statedogs.slice(currentPage,currentPage+8)

    const nextPage = () => {
        if(statedogs.slice(currentPage+8,currentPage+16).length > 1)
        setCurrentPage(currentPage+8)
    }
    const prevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage-8)
        }
    }
    // const onSearchChange = (event) => {
    //     setCurrentPage(0)
    //     setsearch(event.target.value)
    //     dispatch(filterTemperament(event.target.value))
    // }

    return (
        <div className="Homepage">
            <h1>HomePage: Listado de Dogs</h1>
            {/* <input type="text" value={search} onChange={onSearchChange}/>
            <hr/>*/}
            <InputBusqueda setCurrentPage={setCurrentPage}/>
            <button onClick={prevPage}>Anterior</button>
            <button onClick={nextPage}>Siguiente</button> 
            {numeroDogs? numeroDogs.map(elemento => (
                <div key={elemento.ID}><h2>{elemento.Nombre}</h2>
                    <h3>Peso: {elemento.PesoMax}</h3>
                    <h3>Temperamento: {elemento.Temperamento}</h3>
                    <img src={elemento.image} height="200" width="200"/>
                    <hr/>
                </div>
            )) : <p>No hay perros</p>

            }
        </div>
    )
}

export default Homepage