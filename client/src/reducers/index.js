import { OBTENER_DOGS, OBTENER_TEMPERAMENTOS, OBTENER_INFO_RAZA } from "../actions"

const estadoInicial = {
    todosLosdogs : [],
    temperamentos : [],
    detalleRaza: []
}

function rootReducer(state = estadoInicial, action){
    switch(action.type){
        case OBTENER_DOGS:
            return {
                ...state,
                todosLosdogs: action.payload
            }
        case  OBTENER_TEMPERAMENTOS:
            return {
                ...state,
                temperamentos: action.payload
            }
        case OBTENER_INFO_RAZA:
            return {
                ...state,
                detalleRaza: action.payload
            }     
        default:
            return state
    }
}

export default rootReducer