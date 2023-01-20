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

module.exports = router;
