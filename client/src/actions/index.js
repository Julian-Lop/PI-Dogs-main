export const OBTENER_DOGS = 'OBTENER_dOGS'
export const FALLA_BUSQUEDA = 'FALLA_BUSQUEDA'

export function getAllDogs(dogname){
    return async function(dispatch){
        try {
            if(dogname){
                return fetch(`http://localhost:3001/dogs?name=${dogname}`)
                .then(response => response.json())
                .then(json => {
                    dispatch({type: OBTENER_DOGS, payload: json})
                }).catch(err => {
                    dispatch({type: OBTENER_DOGS, payload: err})
                })
            }else{
                let json = await fetch(`http://localhost:3001/dogs`)
                .then(response => response.json())
                return dispatch({type: OBTENER_DOGS, payload: json})
            }
        } catch (error) {
            let falla = fetch(`http://localhost:3001/dogs?name=${dogname}`)
            .then(response => response.json())
            return dispatch({type: FALLA_BUSQUEDA, payload: falla})
        }
    }
}
