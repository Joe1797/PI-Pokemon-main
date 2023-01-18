const { Router } = require('express');
const router = Router();
// const {Sequelize} = require('sequelize');
const fetch = require('node-fetch')
const {Type } = require('../db');

router.get("/",async(req,res)=>{

    try {
        const typesDb = await Type.findAll();
    //  console.log(typeof(typesDb))
    //  console.log(Array.isArray(typesDb))

        if(typesDb.length === 0) {
            const response = await fetch("https://pokeapi.co/api/v2/type");
            const data = await response.json()
            const arrayTypes = [];

            data.results.forEach(e=>{
                arrayTypes.push({name:e.name})
            })

            const newTypesDb = await Type.bulkCreate(arrayTypes)

            return res.json(newTypesDb);

        }else{
            return res.json(typesDb)
        }       

    } catch (error) {
        return res.status(404).send(error);
    }
});

module.exports = router;