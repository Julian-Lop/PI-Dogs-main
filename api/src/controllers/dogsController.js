require('dotenv').config();
const axios = require('axios')
const  {APIKEY } = process.env
const {Razas,Temperamentos} = require('../db.js')

const allDogs = async () => {
    let dogsDB = await Razas.findAll({
    attributes:['ID','Nombre','AlturaMin','AlturaMax','PesoMin','PesoMax','Vida'], 
    include: {
        model: Temperamentos,
        attributes: ['Nombre'],
        through: {
            attributes : []
        }
    }})
    let dogsDBtemp = await dogsDB.map(dog => {
        return {
            ID: dog.ID,
            Nombre: dog.Nombre,
            AlturaMin: dog.AlturaMin,
            AlturaMax: dog.AlturaMax,
            PesoMin: dog.PesoMin,
            PesoMax: dog.PesoMax,
            Vida: dog.Vida,
            Temperamento: dog.Temperamentos.map(e => {return e.Nombre}).toString()
        }
    })
    let dogsApi = 
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
    .then(response =>{
        return response.data.map((dog) => {
            return {
                    ID: dog.id,
                    Nombre : dog.name,
                    PesoMin : Number(dog.weight.metric.split(' - ')[0]),
                    PesoMax : Number(dog.weight.metric.split(' - ')[1]),
                    AlturaMin : Number(dog.height.metric.split(' - ')[0]),
                    AlturaMax : Number(dog.height.metric.split(' - ')[1]),
                    Temperamento : dog.temperament,
                    Vida : Number(dog.life_span.split(' ')[0]),
                    image : dog.image.url
                    }
        })
    })

    let dogsApiAwait = await dogsApi
    let dogsAll = dogsApiAwait.concat(dogsDBtemp)
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
            if(dog.ID.toString() === idRaza.toString()){
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
        const {nombre,alturamin,alturamax,pesomin,pesomax,vida,temperamentos} = req.body
        const RazaCreada = await Razas.create({
                Nombre: nombre,
                AlturaMin : alturamin,
                AlturaMax : alturamax,
                PesoMin : pesomin,
                PesoMax : pesomax,
                Vida: vida
        })
        if(Array.isArray(temperamentos)){
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

