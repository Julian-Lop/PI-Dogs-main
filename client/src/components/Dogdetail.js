import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDetail} from '../actions/index.js'

function Dogdetail(){
    const stateraza = useSelector((state) => state.detalleRaza)
    const dispatch = useDispatch()
    const {idRaza} = useParams()

    useEffect(()=> {
        dispatch(getDetail(idRaza))
    },[dispatch])

    return (
        <div className="Dogdetail">
            <h1>Detalle de raza</h1>
            {stateraza.length < 1 ? <h2>Loading...</h2>: stateraza.map(e => (
                <div>
                    <h2>{e.Nombre}</h2>
                    <h3>Altura: {e.AlturaMin} - {e.AlturaMax} Cm</h3>
                    <h3>Peso: {e.PesoMin} - {e.PesoMax} Kg</h3>
                    <h3>Temperamento: {e.Temperamento}</h3>
                    <h3>Años de vida: {e.Vida} años</h3>
                    <img src={e.image} width="350" height="350"/>
                </div>
            ))}
            
        </div>
    )
}

export default Dogdetail