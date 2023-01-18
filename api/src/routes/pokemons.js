const { Router } = require('express');
const router = Router();
// const {Sequelize} = require('sequelize');
const fetch = require('node-fetch')
const {Pokemon,Type} = require('../db');



router.get('/',async (req,res,next)=>{
    // try {
        const {name} = req.query;
        console.log(name)
        if(name){

            const nameStd = name.trim().toLowerCase();
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameStd}`)
            console.log(response.status)
            if(response.status===200){
                const data = await response.json()
                const {id,height,types,sprites,stats,weight} = data
    
                let typesA = types.map(e=>e.type.name)
                let statsNameBase = {};
                
                stats.forEach(e=>{
                    if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
                    if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
                    if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
                    if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
                })
    
                let obj = {id,name:data.name,height,weight,
                    hp : statsNameBase.hp,
                    attack : statsNameBase.attack,
                    defense : statsNameBase.defense,
                    speed: statsNameBase.speed,
                    types : typesA,
                    image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
                    origin:"api"}
                    
                    return res.json(obj)
            }else{
                const pokemon = await Pokemon.findAll({
                    where: { name: name },
                    include: {
                        model: Type,
                        through: {
                            attributes: []
                        }
                    }
                });
                res.json(pokemon)
            }   
        }else{
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40");
            const data = await response.json();
    
            let arrayPromises = data.results.map(async e => {
                const dataPrev = await fetch(e.url)
                return dataPrev.json()
            });
    
            // console.log(arrayPromises)
            const pokemons = (await Promise.all(arrayPromises)).map(data=>{
            const {id,name,height,types,sprites,stats,weight} = data;
            // console.log(types);
            let typesA = types.map(e=>e.type.name)
            let statsNameBase = {};
            
            stats.forEach(e=>{
                if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
                if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
                if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
                if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
            })
                return {
                    id,name,
                    hp : statsNameBase.hp,
                    attack : statsNameBase.attack,
                    defense : statsNameBase.defense,
                    speed: statsNameBase.speed,
                    height:height,
                    weight : weight,
                    image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
                    origin:"api",
                    types : typesA
                }
            })
            const pokemonsDb = await Pokemon.findAll({
                include: {
                    model: Type,
                    through: {
                        attributes: []
                    }
                }
            });
            // const pokemonsAll = pokemons.concat(pokemonsDb);
            const pokemonsAll = [...pokemonsDb, ...pokemons];
            return res.json(pokemonsAll)
        }

    // } catch (error) {
    //     res.status(404).send(error)
    // }    
});

// router.get('/',async (req,res,next)=>{
//     // const {name} = req.query;
//     // if(name) next();
//     // const response = await fetch("https://pokeapi.co/api/v2/pokemon")
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
//     const data = await response.json()
    
//     let arrayPromises = data.results.map(async e => {
//         const dataPrev = await fetch(e.url)
//         return dataPrev.json()
//     })
    
//     console.log(arrayPromises)
    
//     const pokemons = (await Promise.all(arrayPromises)).map(data=>{
//         const {id,name,height,types,sprites,stats,weight} = data;
//         // console.log(types);
//         let typesA = types.map(e=>e.type.name)
//         let statsNameBase = {};
            
//         stats.forEach(e=>{
//             if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
//             if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
//             if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
//             if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
//         })
    
//         return {
//             id,name,
//             hp : statsNameBase.hp,
//             attack : statsNameBase.attack,
//             defense : statsNameBase.defense,
//             speed: statsNameBase.speed,
//             height:height,
//             weight : weight,
//             image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
//             origin:"api",
//             types : typesA
//         }
//     })
    
//     const pokemonsDb = await Pokemon.findAll();
    
//     // const pokemonsAll = pokemons.concat(pokemonsDb);
//     const pokemonsAll = [...pokemonsDb, ...pokemons];
    
//     return res.json(pokemonsAll)
// });

    
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
        
    if(!id || id===0) return res.status(404).send("Especificar ID valido")
        
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        
    if(response.status === 200){
        const data = await response.json()
        const {name,height,types,sprites,stats,weight} = data
    
        let typesA = types.map(e=>e.type.name)
        let statsNameBase = {};
            
        stats.forEach(e=>{
            if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
            if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
            if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
            if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
        })
    
        let obj = {id,name,height,weight,
            hp : statsNameBase.hp,
            attack : statsNameBase.attack,
            defense : statsNameBase.defense,
            speed: statsNameBase.speed,
            image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
            origin:"api",
            types : typesA
        }
                
            return res.json(obj)
    }else{
        const pokemon = await Pokemon.findByPk(id,{
            include: {
                model: Type,
                through: {
                    attributes: []
                }
            }
        })
        return res.json(pokemon)
    }   
});
    


router.post("/",async(req,res)=>{
    try {
        const {id,name,height,weight,hp,attack,defense,speed,types,image,origin} = req.body

        console.log(types)
        types.forEach(t=>console.log(t))
        const newPokemon = await Pokemon.create(req.body)
        // const pokemonCreate = await Pokemon.findByPk(id)
        await newPokemon.addType(types)
    
        const pokemonCreate = await Pokemon.findOne({
            where: { name: name },
            include: {
                model: Type,
                through: {
                    attributes: []
                }
            }
        });
        return res.json(pokemonCreate)
    } catch (error) {
        return res.status(404).send(error)
    }

   
})

module.exports=router;