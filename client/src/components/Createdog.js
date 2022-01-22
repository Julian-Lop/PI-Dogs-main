import React from "react";

function Createdog(){
    return (
        <div className="Createdog">
            <h1>Soy el CreateDog</h1>
            <form>
                <label>Nombre de la raza: </label>
                <input type="text" id="nombre" placeholder="Nombre de la raza"/>
                <br/>
                <label>Altura: </label>
                <input type="number" id="alturamin" placeholder="Altura mínima"/>
                <input type="number" id="alturamax" placeholder="Altura máxima"/>
                <br/>
                <label>Peso: </label>
                <input type="number" id="pesomin" placeholder="Peso mínimo"/>
                <input type="number" id="pesomax" placeholder="Peso máximo"/>
                <br/>
                <label>Tiempo de vida: </label>
                <input type="number" id="vida" placeholder="tiempo de vida"/>
                <br/>
                <label>Seleccione los temperamentos</label>
                <br/>
                <input type="submit" value="enviar"/>
            </form>
        </div>
    )
}

export default Createdog