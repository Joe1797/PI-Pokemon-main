import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MainPage.module.css';
import * as actions from '../../redux/actions'
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import Paginacion from '../Paginacion/Paginacion';

export default function MainPage () {

    const [nameSearch,setNameSearch] = useState("");

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.getPokemons());
        dispatch(actions.getTypes())
    },[dispatch])

    const pokemons = useSelector((state)=>{return state.pokemons})

    // console.log(pokemons)

    const onChange = (e)=>{
        setNameSearch(e.target.value)
    }
    
    
    const searchByName =(name)=>{
        // if(name===""){
            //     dispatch(actions.getPokemons())
            // }
        dispatch(actions.getPokemonByName(name));
        setTimeout(()=>setNameSearch(""),1000);
        
    }
        
    const foundPokemon = useSelector((state)=>{return state.pokemonSeach})
        
    // console.log(foundPokemon)

    const typesArr = useSelector((state)=>{return state.types})
    // console.log(typesArr)
    const handleClick = (e)=>{
        const {name,value}=e.target;
        if(value==="all") return dispatch(actions.getPokemons())
        console.log(name,value);
        switch(name){
            case "originOrd":
                return dispatch(actions.originFilter(value));
            case "nameOrd":
                return dispatch(actions.nameFilter(value));
            case "attackOrd":
                return dispatch(actions.attackFilter(value));
            case "typeOrd":
                return dispatch(actions.typeFilter(value));
            default:
                return console.log("Cargando")
        }
    }

    // PAGINADO - ESTADOS

    const [pagina,setPagina] = useState(1);
    const [porPagina] = useState(12);

    const maximo = Math.ceil(pokemons.length / porPagina);
    // console.log(maximo)


    return(
        <>
            <header className={styles.containerHeader}>
                <div className={styles.containerLogo}>
                    <img src='https://toppng.com/public/uploads/thumbnail/pokeball-11530983148eo0t7ty4ls.png' alt='Logo'></img>
                    <h3>PokeWeb</h3>
                </div>
                <div>
                    <Link to="/pokemons/create"><button className={styles.btnCrear}>Create your Pokemon!</button></Link>
                </div>
            </header>
            <div className={styles.containerSearch}>
                <input type="search" placeholder='         Search by Name' onChange={onChange} value={nameSearch} />
                <button onClick={()=>searchByName(nameSearch)} disabled={nameSearch===""}> Search </button>
                <button onClick={()=> {setNameSearch(""); searchByName("")}}> All </button>
            </div>
            <div className={styles.containerFilters}>
                <div>
                    <label>By Origin</label>
                    <select name="originOrd" onClick={handleClick}>
                        <option value="all">-</option>
                        <option value="db">DataBase</option>
                        <option value="api">Api</option>
                    </select>
                </div>
                <div>
                    <label>By Name</label>
                    <select name="nameOrd" onClick={handleClick}>
                        <option value="all">-</option>
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
                </div>
                <div>
                    <label>By Attack</label>
                    <select name="attackOrd" onClick={handleClick}>
                        <option value="all">-</option>
                        <option value="Ascendente">Ascendente</option>
                        <option value="Descendente">Descendente</option>
                    </select>
                </div>
                <div>
                    <label>By Type</label>
                    <select name="typeOrd" onClick={handleClick}>
                        <option value="all">-</option>
                        {typesArr.map(e=>{
                            return(
                                <option key={e.id} value={e.name}>{e.name}</option>
                            )
                        })}
                    </select>
                </div>
                
            </div>
            <div>
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
            </div>
            {/* <h1>{nameSearch}</h1> */}
            {(pokemons.length===0)?<p className={styles.msjNoRes}>No results to display, modify the request</p>:null}
            <div className={styles.containerCards}>
            {(foundPokemon.name!==undefined) ? <Card
                        id={foundPokemon.id}
                        name={foundPokemon.name}
                        image={foundPokemon.image}
                        types={foundPokemon.types}
                        origin={foundPokemon.origin} /> : pokemons.slice((pagina-1)*porPagina,(pagina-1)*porPagina+porPagina).map((e,i)=>{
                return (
                    <Card
                        key={i}
                        id={e.id}
                        name={e.name}
                        image={e.image}
                        types={e.types}
                        origin={e.origin}
                    ></Card>
                )
            })}
            </div>
        </>
    )
}