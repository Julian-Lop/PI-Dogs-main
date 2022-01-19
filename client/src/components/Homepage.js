import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllDogs} from '../actions/index.js'

function Homepage (){
    const select = useSelector((state)=> state.todosLosdogs)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllDogs())
    }, [dispatch])

    return (
        <div className="Homepage">
            <h1>Soy la HomePage</h1>
            { select.map(dog => 
                (
                    <h2>{dog.Nombre}</h2>
                )
            )}
        </div>
    )
}

export default Homepage