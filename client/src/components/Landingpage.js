import React from 'react'
import '../css/styles.css'

function Landingpage(){
    return (
        <div className='Landingpage'>
            <div className='glass-left'>
                <h1>PROYECTO</h1>
                <h1>INDIVI</h1>
            </div>
            <div className='transparent-right'>
                <h1 className='invisible'></h1>
                <h1>DUAL</h1>
                <h1>DOGS</h1>
                <div className='contenedor'>
                    <a href="/home"><button>home</button></a>
                </div> 
            </div>
        </div>
    )
}

export default Landingpage