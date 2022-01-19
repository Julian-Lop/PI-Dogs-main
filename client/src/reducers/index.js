import { OBTENER_DOGS } from "../actions"

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
        default:
            return state
    }
}

export default rootReducer