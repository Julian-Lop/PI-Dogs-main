import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllDogs,getTemperaments} from '../actions/index.js'

function Homepage (){
    const statedogs = useSelector((state)=> state.todosLosdogs)
    const stateTemperaments = useSelector((state)=> state.temperamentos)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllDogs())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    return (
        <div className="Homepage">
            <h1>Soy la HomePage</h1>
            { stateTemperaments.map(temp => 
                (
                    <h2>{temp.Nombre}</h2>
                )
            )}
        </div>
    )
}

export default Homepage