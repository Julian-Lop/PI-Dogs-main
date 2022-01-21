import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import {getAllDogs} from '../actions/index.js'

function InputBusqueda({setCurrentPage}){
    const dispatch = useDispatch()

    const [search, setsearch] = useState('');

    const onSearchChange = (event) => {
        setCurrentPage(0)
        setsearch(event.target.value)
        dispatch(getAllDogs(event.target.value))
    }
    return (
        <div className="InputBusqueda">
            <input type="text" value={search} onChange={onSearchChange}/>
            <hr/>
        </div>    
    )
} 

export default InputBusqueda