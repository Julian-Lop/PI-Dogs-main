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
    tempfiltrados : [],
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
            const tempfilter = state.todosLosdogs.filter((e)=> {
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
            const razafilter = 
            state.todosLosdogs.map((e) => {
                if(typeof(e.Temperamento) === 'string'){
                    return e.Temperamento
                }
            }).toString().split(', ').toString().split(',')
            let eliminarRepetedios = []
            razafilter.map(e => {
                if(eliminarRepetedios.indexOf(e) == -1){
                    eliminarRepetedios.push(e)
                }
            })
            let razafilterobj = state.temperamentos.filter(e => {
                if(eliminarRepetedios.includes(e.Nombre))return e
            })

            return{
                ...state,
                tempfiltrados: razafilterobj
            }
        case ORDENAR_PESO:
            let dogsPeso = !state.dogsfiltrados.length ? state.todosLosdogs : state.dogsfiltrados
            if(action.payload === 'asc'){
                dogsPeso.sort((a,b) => {
                    if(a.PesoMax && b.PesoMax){
                        if(a.PesoMax > b.PesoMax) return 1
                        else if(a.PesoMax < b.PesoMax) return -1
                        else return 0
                    }else if(!a.PesoMax || !b.PesoMax){
                        let pesoA = !a.PesoMax || !a.PesoMin ? a.PesoMax+a.PesoMin : a.PesoMax && a.PesoMin ? a.PesoMax : 100
                        let pesoB = !b.PesoMax || !b.PesoMin ? b.PesoMax+b.PesoMin : b.PesoMax && b.PesoMin ? b.PesoMax : 100 
                        if(pesoA > pesoB) return 1
                        else if(pesoA < pesoB) return -1
                        else return 0
                    }
                })
            }else if(action.payload === 'des'){
                dogsPeso.sort((a,b) => {
                    if(a.PesoMax && b.PesoMax){
                        if(a.PesoMax > b.PesoMax) return -1
                        else if(a.PesoMax < b.PesoMax) return 1
                        else return 0
                    }else if(!a.PesoMax || !b.PesoMax){
                        let pesoA = !a.PesoMax || !a.PesoMin ? a.PesoMax+a.PesoMin : a.PesoMax && a.PesoMin ? a.PesoMax : 100
                        let pesoB = !b.PesoMax || !b.PesoMin ? b.PesoMax+b.PesoMin : b.PesoMax && b.PesoMin ? b.PesoMax : 100 
                        if(pesoA > pesoB) return -1
                        else if(pesoA < pesoB) return 1
                        else return 0
                    }
                })
            }
            return{
                ...state,
                dogsfiltrados : dogsPeso
            }
        case ORDENAR_ALFABETICO:
            let dogsNombre = !state.dogsfiltrados.length ? state.todosLosdogs : state.dogsfiltrados
            if(action.payload === 'az'){
                dogsNombre.sort((a,b) => {
                    if(a.Nombre > b.Nombre) return 1
                    else if (a.Nombre < b.Nombre) return -1
                    else return 0
                })
            }else if(action.payload === 'za'){
                dogsNombre.sort((a,b) => {
                    if(a.Nombre > b.Nombre) return -1
                    else if(a.Nombre < b.Nombre) return 1
                    else return 0
                })
            }
            return{
                ...state,
                dogsfiltrados: dogsNombre
            }
        case CREAR_DOG:
            return{
                ...state
            }              
        default:
            return state
    }
}

export default rootReducer