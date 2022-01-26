import '../css/styles.css'
import Carddog from './Carddog'

function Paginado({arraydogs}){
    return (
        <div className='Paginado' >
            {arraydogs ? arraydogs.map(elemento => (
                    <div>
                        <div className='glass-div2'></div>
                        <div className='glass-div'></div>
                        <Carddog id={elemento.ID} raza={elemento.Nombre} 
                        pesomin={elemento.PesoMin} pesomax={elemento.PesoMax} 
                        temperamento={elemento.Temperamento} image={elemento.image}/>
                    </div>
            )) : <p>No hay perros</p>}
        </div>
    )
}

export default Paginado