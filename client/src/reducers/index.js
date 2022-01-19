import { OBTENER_DOGS, OBTENER_TEMPERAMENTOS } from "../actions"

const estadoInicial = {
    todosLosdogs : [],
    temperamentos : []
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
        default:
            return state
    }
}

export default rootReducer