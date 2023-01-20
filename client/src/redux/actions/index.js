import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME";
export const GET_POKEMONS_BY_ID = "GET_POKEMONS_BY_ID";
const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES"

export const ORIGIN_FILTER = "ORIGIN_FILTER"
export const NAME_ORDER = "NAME_ORDER"
export const ATTACK_ORDER = "ATTACK_ORDER"
export const TYPE_FILTER = "TYPE_FILTER"

export const originFilter = (origin)=>{
    return{
        type:ORIGIN_FILTER,
        payload:origin
    }
}
export const nameFilter = (order)=>{
    return{
        type:NAME_ORDER,
        payload:order
    }
}
export const attackFilter = (order)=>{
    return{
        type:ATTACK_ORDER,
        payload:order
    }
}
export const typeFilter = (type)=>{
    return{
        type:TYPE_FILTER,
        payload:type
    }
}


export const getPokemons =()=>{

    return (dispatch)=>{
        axios("http://localhost:3001/pokemons")
        .then((res)=>{
            dispatch({
                type:GET_POKEMONS,
                payload:res.data
            })
        })
    }
    // return async (dispatch) => {
    //     const res = await axios("http://localhost:3001/pokemons");
    //     dispatch({
    //         type:GET_POKEMONS,
    //         payload:res.data
    //     })
    // }
};

export const getTypes =()=>{
    return async (dispatch) => {
        const res = await axios("http://localhost:3001/types");
        dispatch({
            type:GET_TYPES,
            payload:res.data
        })
    }
};

export const getPokemonByName = (name) =>{
    return async (dispatch)=>{
        const res = await axios(`http://localhost:3001/pokemons?name=${name}`);
        dispatch({
            type:GET_POKEMONS_BY_NAME,
            payload:res.data
        })
    }
};


export const getPokemonById = (id) =>{
    return async (dispatch)=>{
        const res = await axios(`http://localhost:3001/pokemons/${id}`);
        dispatch({
            type:GET_POKEMONS_BY_ID,
            payload:res.data
        })
    }
};

export const createPokemon = (inputs) =>{
    return async (dispatch)=>{
        const res = await axios.post("http://localhost:3001/pokemons",inputs)
        dispatch({
            type:CREATE_POKEMON,
            payload:res.data
        })
    }
};


