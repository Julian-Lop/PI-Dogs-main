import { OBTENER_DOGS, 
    OBTENER_TEMPERAMENTOS, 
    OBTENER_INFO_RAZA,
    FILTRAR_TEMPERAMENTO,
    FILTRAR_RAZA,
    ORDENAR_PESO,
    ORDENAR_ALFABETICO,
    CREAR_DOG} from "../actions"

const estadoInicial = {
    dogsfiltrados : [],
    todosLosdogs : [],
    temperamentos : [],
    detalleRaza: []
    
}

function rootReducer(state = estadoInicial, action){
    switch(action.type){
        case OBTENER_DOGS:
            return {
                ...state,
                todosLosdogs: action.payload,
            }
        case OBTENER_TEMPERAMENTOS:
            return {
                ...state,
                temperamentos: action.payload.sort((a,b) => {
                    if(a.Nombre > b.Nombre) return 1
                    else if(a.Nombre < b.Nombre) return -1
                    else return 0
                 })
            }
        case OBTENER_INFO_RAZA:
            return {
                ...state,
                detalleRaza: action.payload
            }
        case FILTRAR_TEMPERAMENTO:
            const tempfilter = state.todosLosdogs.filter(e => {
                if(typeof(e.Temperamento) === 'string'){
                    return e.Temperamento.includes(action.payload)
                }
                if(Array.isArray(e.Temperamento)){
                    let temp = e.Temperamento.map(e => e.Nombre)
                    return temp.includes(action.payload)
                }
            })
            return {
                ...state,
                dogsfiltrados: tempfilter
            }
        case FILTRAR_RAZA:
            return{}
        case ORDENAR_PESO:
            return{}
        case ORDENAR_ALFABETICO:
            return{}
        case CREAR_DOG:
            return{}              
        default:
            return state
    }
}

export default rootReducer