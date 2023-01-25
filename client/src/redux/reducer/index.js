import { GET_POKEMONS,GET_POKEMONS_BY_ID,GET_POKEMONS_BY_NAME, GET_TYPES, NAME_ORDER,ATTACK_ORDER,TYPE_FILTER,ORIGIN_FILTER,All_POKEMONS } from "../actions";

const initialState = {
    pokemons:[],
    pokemonDetail:{},
    pokemonSeach:{},
    types:[],
    allPokemons:[]
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons:action.payload,
                allPokemons:action.payload
            };
        case All_POKEMONS:
            return {
                ...state
            };
        case GET_POKEMONS_BY_ID:
            return {
                ...state,
                pokemonDetail:action.payload
            };
        case GET_POKEMONS_BY_NAME:
            let data = {};
            if(Array.isArray(action.payload)&& action.payload.length===1){
                data={
                    id:action.payload[0].id,
                    name:action.payload[0].name,
                    height:action.payload[0].height,
                    weight:action.payload[0].weight,
                    hp : action.payload[0].hp,
                    attack : action.payload[0].attack,
                    defense : action.payload[0].defense,
                    speed: action.payload[0].speed,
                    types :action.payload[0].types,
                    image : action.payload[0].image,
                    origin:action.payload[0].origin
                }
            }else{
                data=action.payload;
            }
            return {
                ...state,
                pokemonSeach:data,
                pokemons:data
            };
        case GET_TYPES:
            return {
                ...state,
                types:action.payload
            }
        case ORIGIN_FILTER:
            const copyPokeForOri = [...state.allPokemons]
            const filterOri = copyPokeForOri.filter((e)=>e.origin===action.payload)
            return{
                ...state,
                pokemons:filterOri,
                allPokemons:filterOri
            };
        case TYPE_FILTER:
            const copyPokeForType = [...state.allPokemons]
            const filterType = copyPokeForType.filter((e)=>{
                if(e.origin==="api") {
                    return e.types.includes(action.payload)
                } else{ //Para resolver advertencia de React
                    return false
                }
                // else {
                //     for (const prop in e.types) {
                //         if(e.types[prop]===action.payload) return true;
                //     }
                // }
                }
            );

            copyPokeForType.forEach(e=>{
                if(e.origin==="db"){
                    e.types.forEach(t=>{
                        if(t.name===action.payload) filterType.push(e)
                    })
                }
            })

            return{
                ...state,
                pokemons:filterType,
                allPokemons:filterType
            };
        case ATTACK_ORDER:
            let copyPokeForAtta = [...state.allPokemons];

            if(action.payload==="Ascendente"){
                copyPokeForAtta.sort((a,b)=>{return a.attack-b.attack})
            }
            if(action.payload==="Descendente"){
                copyPokeForAtta.sort((a,b)=>{return b.attack-a.attack})
            }
            return{
                ...state,
                pokemons:copyPokeForAtta,
                allPokemons:copyPokeForAtta
            };
        case NAME_ORDER:
            let copyPokeForName = [...state.allPokemons];

            if(action.payload==="Ascendente"){
                copyPokeForName.sort((a,b)=>{if(a.name < b.name) return -1})
            }
            if(action.payload==="Descendente"){
                copyPokeForName.sort((a,b)=>{if(a.name > b.name) return -1})
            }
            return{
                ...state,
                pokemons:copyPokeForName,
                allPokemons:copyPokeForName
            };
        // case FILTER_COMBINED:

        // // obj={
        // //     ORIGIN_FILTER : filter 
        // //     TYPE_FILTER: filter
        // //     ATTACK_ORDER: sort
        // //     NAME_ORDER: sort 
        // // }

            // let copyPokemons = [...state.allPokemons]
            // let filterPokemons = []
            // let metodos = Object.keys(filterCombiner)

            // metodos.forEach((e)=>{
                
            // })

            // return{
            //     ...state,
            //     pokemons:
            // }
            
        default:
            return state;
    }
}




export default rootReducer;