import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from '../../redux/actions';
import styles from './Detail.module.css';
import { Link } from "react-router-dom";


export default function Detail (){

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.getPokemonById(id))
    },[id,dispatch]);

    const pokemonDetail = useSelector((state)=>{return state.pokemonDetail});

    const {name,hp,attack,defense,height,image,origin,speed,weight} = pokemonDetail;

    const nameUpper = name?.toUpperCase();
    const typesArray = [];
    
    if(origin==="api"){
        pokemonDetail.types?.forEach(t => {
            typesArray.push(t)
        });
    } else {
        pokemonDetail.types?.forEach(t => {
            typesArray.push(t.name)
        });
    };

    console.log(pokemonDetail);

    return(
        <div className={styles.containerCard}>  
            <h1>{nameUpper}</h1>
            <h3>Types</h3>
            <div>
                {typesArray.map((e,i)=>{
                        return(
                            <span key={i}>{e.toUpperCase()}</span>
                        )
                    })}
            </div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div className={styles.containerStats}>
                <div className={styles.stats}>
                    <h5>ID:</h5>
                    <span>{id}</span>
                </div>
                <div className={styles.stats}>
                    <h5>Attack:</h5>
                    <span>{attack}</span>
                </div>
                <div className={styles.stats}>
                    <h5>Defense:</h5>
                    <span>{defense}</span>
                </div>
                <div className={styles.stats}>
                    <h5>HP:</h5>
                    <span>{hp}</span>
                </div>
                <div className={styles.stats}>
                    <h5>Height:</h5>
                    <span>{height}</span>
                </div>
                <div className={styles.stats}>
                    <h5>Weight:</h5>
                    <span>{weight}</span>
                </div>
                <div className={styles.stats}>
                    <h5>Speed:</h5>
                    <span>{speed}</span>
                </div>
            </div>
            <Link to="/pokemons">
                <button className={styles.btnIr}>Home</button>
            </Link>
        </div>
    )
}