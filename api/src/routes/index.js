const e = require('express');
const { Router } = require('express');
// const fetch = require('node-fetch')
// const { Pokemon, Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typesRouter = require('./types');
const pokemonsRouter = require('./pokemons');
// const pokemons = [];

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',(req,res)=>{
    res.send("Servidor corriendo!")
});

router.use("/pokemons",pokemonsRouter);

router.use("/types",typesRouter);

// router.get('/pokemons',async (req,res)=>{
//     const {name} = req.query;
//     if(!name || name===undefined) return res.status(404).send("Especificar NAME valido")
//     const nameStd = name.trim().toLowerCase();
    
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameStd}`)

//     const data = await response.json()
    
//     if(data){
//         const {id,height,types,sprites,stats,weight} = data

//         let typesA = types.map(e=>e.type.name)
//         let statsNameBase = {};
        
//         stats.forEach(e=>{
//             if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
//             if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
//             if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
//             if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
//         })

//         let obj = {id,name:nameStd,height,weight,
//             hp : statsNameBase.hp,
//             attack : statsNameBase.attack,
//             defense : statsNameBase.defense,
//             speed: statsNameBase.speed,
//             types : typesA,
//             image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
//             origin:"api"}
            
//             return res.json(obj)
//         }else{
//             const pokemon = await Pokemon.findAll({
//                 where:{
//                     name:name
//                 }
//             })
//             res.json(pokemon)
//         }   
//     });
    
//     router.get('/pokemons/:id',async (req,res)=>{
//         const {id} = req.params;
        
//         if(!id || id===0) return res.status(404).send("Especificar ID valido")
        
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)    
//         const data = await response.json()
        
//         if(data){
//             const {name,height,types,sprites,stats,weight} = data
    
//             let typesA = types.map(e=>e.type.name)
//             let statsNameBase = {};
            
//             stats.forEach(e=>{
//                 if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
//                 if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
//                 if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
//                 if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
//             })
    
//             let obj = {id,name,height,weight,
//                 hp : statsNameBase.hp,
//                 attack : statsNameBase.attack,
//                 defense : statsNameBase.defense,
//                 speed: statsNameBase.speed,
//                 types : typesA,
//                 image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
//                 origin:"api"}
                
//                 return res.json(obj)
//             }else{
//                 const pokemon = await Pokemon.findByPk(id)
//                 res.json(pokemon)
//             }   
//         });
    
//     router.get('/pokemons',async (req,res)=>{
//         // const response = await fetch("https://pokeapi.co/api/v2/pokemon")
//         const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
//         const data = await response.json()
    
//         let arrayPromises = data.results.map(async e => {
//             const dataPrev = await fetch(e.url)
//             return dataPrev.json()
//         })
    
//         console.log(arrayPromises)
    
//         const pokemons = (await Promise.all(arrayPromises)).map(data=>{
//             const {id,name,height,types,sprites,stats,weight} = data;
//             // console.log(types);
//             let typesA = types.map(e=>e.type.name)
//             let statsNameBase = {};
            
//             stats.forEach(e=>{
//                 if(e.stat.name === "hp") statsNameBase[e.stat.name] = e.base_stat
//                 if(e.stat.name === "attack") statsNameBase[e.stat.name] = e.base_stat
//                 if(e.stat.name === "defense") statsNameBase[e.stat.name] = e.base_stat
//                 if(e.stat.name === "speed") statsNameBase[e.stat.name] = e.base_stat
//             })
    
//             return {
//                 id,name,
//                 hp : statsNameBase.hp,
//                 attack : statsNameBase.attack,
//                 defense : statsNameBase.defense,
//                 speed: statsNameBase.speed,
//                 height:height,
//                 weight : weight,
//                 image : (sprites.other.dream_world.front_default)?sprites.other.dream_world.front_default:sprites.front_default,
//                 origin:"api",
//                 types : typesA
//             }
//         })
    
//         const pokemonsDb = await Pokemon.findAll();
    
//         // const pokemonsAll = pokemons.concat(pokemonsDb);
//         const pokemonsAll = [...pokemonsDb, ...pokemons];
    
//         return res.json(pokemonsAll)
//     });

//     router.post("/pokemons",async(req,res)=>{
//         const {id,name,height,weight,hp,attack,defense,speed,types,image,origin} = req.body

//         console.log(types)
//         types.forEach(t=>console.log(t))
//         const newPokemon = await Pokemon.create(req.body)
//         // const pokemonCreate = await Pokemon.findByPk(id)
//         await newPokemon.addType(types)

//         const pokemonCreate = await Pokemon.findOne({
//             where: { name: name },
//             include: {
//                 model: Type,
//                 through: {
//                   attributes: []
//                 }
//           }
//         });

//         res.json(pokemonCreate)

//     })

    

    // router.get("/types",async(req,res)=>{

    //     const typesDb = await Type.findAll();
    //     // console.log(typeof(typesDb))
    //     // console.log(Array.isArray(typesDb))
        
    //     if(typesDb.length === 0) {
    //         const response = await fetch("https://pokeapi.co/api/v2/type");
    //         const data = await response.json()
    //         const arrayTypes = [];

    //         data.results.forEach(e=>{
    //             arrayTypes.push({name:e.name})
    //          })

    //         const newTypesDb = await Type.bulkCreate(arrayTypes)

    //         return res.json(newTypesDb)
    //     }else{
    //         return res.json(typesDb)
    //     }       
    // })

module.exports = router;
