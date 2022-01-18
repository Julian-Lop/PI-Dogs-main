require('dotenv').config();
const axios = require('axios')
const  {APIKEY } = process.env
const {Razas,Temperamentos} = require('../db.js')

const allDogs = async () => {
    let dogsDB = await Razas.findAll({attributes:['ID','Nombre','Altura','Peso','Vida']})
    let dogsApi = 
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
    .then(response =>{
        return response.data.map((dog) => {
            return {
                    ID: dog.id,
                    Nombre : dog.name,
                    Peso: dog.weight.metric,
                    Altura : dog.height.metric,
                    Temperamento : dog.temperament,
                    Vida : dog.life_span,
                    image : dog.image.url
                    }
        })
    })
    let dogsApiAwait = await dogsApi
    let dogsAll = dogsApiAwait.concat(dogsDB)
    return dogsAll
}

exports.verDogs = async (req,res)=> {
    const {name} = req.query
    if(name === undefined){
        
            // axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
            // .then(response =>{
            //     let dogDatas = response.data.map((dog) => {
            //         return {weight : dog.weight.metric,
            //                 name : dog.name,
            //                 temperament : dog.temperament,
            //                 image : dog.image.url
            //                 }
            //     })
            const returnDogs = await allDogs() 
            return res.status(200).json(returnDogs)
    }else{
            const returnDogs = await allDogs()
            let queryDogs = []
            returnDogs.map(dog =>{
                if(dog.name.includes(name)){
                    return queryDogs.push({
                        Nombre : dog.Nombre,
                        Peso : dog.Peso,
                        Temperamento : dog.Temperamento,
                        image : dog.image
                    })
                }   
            })
            res.status(200).json(queryDogs)
    } 
            
}

exports.verDogdRaza = async (req,res)=>{
    const {idRaza} = req.params
    if(idRaza !== undefined){
        const returnDogs = await allDogs()
        let queryDogs = []
        returnDogs.map(dog =>{
            if(dog.ID === Number(idRaza)){
                return queryDogs.push({
                                    Nombre : dog.Nombre,
                                    Peso : dog.Peso,
                                    Temperamento : dog.Temperamento,
                                    Altura : dog.Altura,
                                    Vida : dog.Vida,
                                    image : dog.image
                                    })
            }   
        })
        res.status(200).json(queryDogs)        
    }
}

exports.sendDog = async (req,res)=>{
    try {
        const {id,nombre,altura,peso,vida,temperamentos} = req.body
        const RazaCreada = await Razas.create({
                ID: id,
                Nombre: nombre,
                Altura: altura,
                Peso: peso,
                Vida: vida
        })
        temperamentos.map(temp => {
            const TemperamentoCreado = await Temperamentos.findAll({
                where:{
                    Nombre: temperamentos
                }}
            )
            
            RazaCreada.addTemperamentos(TemperamentoCreado)
        })    

        res.status(201).json(TemperamentoCreado)
    } catch (error) {
        res.status(400).json({status:400, message: error.message})
    }
}

