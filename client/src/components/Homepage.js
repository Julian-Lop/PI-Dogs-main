import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAllDogs,getTemperaments,getDetail} from '../actions/index.js'

function Homepage (){
    const statedogs = useSelector((state)=> state.todosLosdogs)
    const stateTemperaments = useSelector((state)=> state.temperamentos)
    const statedetail = useSelector((state)=> state.detalleRaza)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllDogs())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    useEffect(()=>{
        dispatch(getDetail(3))
    },[dispatch])

    return (
        <div className="Homepage">
            <h1>Soy la HomePage</h1>
            { statedetail.map(info => (
                <h2>{info.Nombre}</h2>
            ))}
        </div>
    )
}

export default Homepage