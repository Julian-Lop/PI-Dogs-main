require('dotenv').config();
const axios = require('axios')
const  {APIKEY } = process.env
const {Razas,Temperamentos} = require('../db.js')

const allDogs = async () => {
    let dogsDB = await Razas.findAll({attributes:['ID','Nombre','Altura','Peso','Vida'], 
    include: {
        model: Temperamentos,
        attributes: ['Nombre'],
        throught: {
            attributes: []
        }
    }})
    let dogsApi = 
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
    .then(response =>{
        return response.data.map((dog) => {
            return {
                    ID: dog.id,
                    Nombre : dog.name,
                    PesoMin : dog.weight.metric.split(' - ')[0],
                    PesoMax : dog.weight.metric.split(' - ')[1],
                    AlturaMin : dog.height.metric.split(' - ')[0],
                    AlturaMax : dog.height.metric.split(' - ')[1],
                    Temperamento : dog.temperament,
                    Vida : dog.life_span.split(' ')[0],
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
                if(dog.Nombre.includes(name)){
                    return queryDogs.push({
                        ID : dog.ID,
                        Nombre : dog.Nombre,
                        PesoMin : dog.PesoMin,
                        PesoMax : dog.PesoMax,
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
                                    PesoMin : dog.PesoMin,
                                    PesoMax : dog.PesoMax,
                                    Temperamento : dog.Temperamento,
                                    AlturaMin : dog.AlturaMin,
                                    AlturaMax : dog.AlturaMax,
                                    Vida : dog.Vida,
                                    image : dog.image
                                    })
            }   
        })
        if(queryDogs.length){
            res.status(200).json(queryDogs)    
        }else{
            res.status(400).send('No hay raza de perro con id'+idRaza)
        }
            
    }
}

exports.sendDog = async (req,res)=>{
    try {
        const {id,nombre,alturamin,alturamax,pesomin,pesomax,vida,temperamentos} = req.body
        const RazaCreada = await Razas.create({
                ID: id,
                Nombre: nombre,
                AlturaMin : alturamin,
                AlturaMax : alturamax,
                PesoMin : pesomin,
                PesoMax : pesomax,
                Vida: vida
        })
        if(temperamentos.length > 1){
            temperamentos.map(async temp => {
                const TemperamentoCreado = await Temperamentos.findAll({
                    where:{
                        Nombre: temp
                    }}
                )
                RazaCreada.addTemperamentos(TemperamentoCreado)
            })
        }else{
            const TemperamentoCreado = await Temperamentos.findAll({
                where:{
                    Nombre: temperamentos
                }}
            )
            RazaCreada.addTemperamentos(TemperamentoCreado)
        }
            

        res.status(201).json(TemperamentoCreado)
    } catch (error) {
        res.status(400).json({status:400, message: error.message})
    }
}

