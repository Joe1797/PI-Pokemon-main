import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Create.module.css';
import * as actions from '../../redux/actions';
import validate from './validation';
import { Link, useNavigate } from 'react-router-dom';



export default function CreatePokemon () {

    const [inputs,setInputs]=useState({
        "name":"",
        "height":1,
        "weight":1,
        "hp" : 1,
        "attack" : 1,
        "defense" : 1,
        "speed": 1,
        "types" : [],
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNEbGNKrTUmBQM-a6Db4_7HnDLFh6_UzcSDhx6Mjl9--p9Y5TISbk_bWQ5DoROutPcWAk&usqp=CAU",
        "origin":"db"    
    })

    const [errors,setErrors]=useState({
        "name":"",
        "height":"",
        "weight":"",
        "hp" : "",
        "attack" : "",
        "defense" : "",
        "speed": "",
        "types" : "",
        "image" : ""
    })

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.getTypes())
    },[dispatch]);

    const types = useSelector((state)=>{return state.types})

    console.log(types)

    const handleInputs = (e)=>{
        const {name,value} = e.target;
        console.log(name,value)
        
        if(name==="types") {
            setInputs({
                ...inputs,
                types: [...inputs.types,parseInt(value)]   
            })
        }else{
            if(name==="name") {
                setInputs({
                    ...inputs,
                    "name":value.toLowerCase()
                })
            } else {
                setInputs({
                    ...inputs,
                    [name]:value
                })
            }
        }
        // console.log(inputs)
        setErrors(validate({
            ...inputs
        }))
        console.log(inputs)
    }

    const navigate = useNavigate();

    return (
        <div className={styles.containerForm}>
        <h1 className={styles.titulo}>Ingresa los datos de tu nuevo Pokemon</h1>
        <form onSubmit={()=>{dispatch(actions.createPokemon(inputs)); navigate("/pokemons")}}>
            <div className={styles.containerCamp}>
                {(errors.name)?<p>{errors.name}</p>:null}
                <label>*Name:</label>
                <input type="text"
                    placeholder='pokexxx' 
                    name='name'
                    onChange={handleInputs}
                />
            </div>
            <div className={styles.containerCamp}> 
                {(errors.hp)?<p>{errors.hp}</p>:null}
                <label>HP:</label>
                <input type="number"
                    placeholder='1'
                    min={1}  
                    name='hp'
                    max={100}
                    onChange={handleInputs}
                />
            </div>
            <div className={styles.containerCamp}>
                {(errors.attack)?<p>{errors.attack}</p>:null}
                <label>Attack:</label>
                <input type="number" 
                    placeholder='1' 
                    min={1} 
                    max={100}
                    name='attack'
                    onChange={handleInputs}
                />
            </div>
            <div className={styles.containerCamp}>
                {(errors.defense)?<p>{errors.defense}</p>:null}
                <label>Defense:</label>
                <input type="number"
                    placeholder='1'  
                    min={1} 
                    max={100}
                    name="defense"
                    onChange={handleInputs}
                />
                
            </div>
            <div className={styles.containerCamp}>
                {(errors.speed)?<p>{errors.speed}</p>:null}
                <label>Speed:</label>
                <input type="number"
                    placeholder='1'
                    min={1}  
                    max={100}
                    name='speed'
                    onChange={handleInputs}
                />
            </div>
            <div className={styles.containerCamp}>
                {(errors.height)?<p>{errors.height}</p>:null}
                <label>Height:</label>
                <input type="number"
                    placeholder='1'  
                    min={1} 
                    max={100}
                    name='height'
                    onChange={handleInputs}
                />
            </div>
            <div className={styles.containerCamp}>
                {(errors.weight)?<p>{errors.weight}</p>:null}
                <label>Weight:</label>
                <input type="number"
                    placeholder='1'  
                    min={1} 
                    max={1000}
                    name='weight'
                    onChange={handleInputs}
                />
            </div>
            <div className={styles.containerCamp}>
                {(errors.image)?<p>{errors.image}</p>:null}
                <label>Image URL:</label>
                <input type="text"
                    placeholder='https://image.com'  
                    name='image'
                    onChange={handleInputs}                
                />
            </div>
            <div className={styles.containerCamp}>
                {(errors.types)?<p>{errors.types}</p>:null}
                <label>*Types:</label>
            </div>
            <div className={styles.containerTypes}>
                {types.map(e=>{
                    return(
                        <div className={styles.containerInpTyp} key={e.id}>
                            <input type="checkbox" name="types" id={e.id} value={e.id} 
                                onChange={handleInputs}
                            />
                            <label htmlFor={e.id}>{e.name}</label>
                        </div>
                    )
                })}
            </div>
            <div className={styles.containerBtns}>
                <button type="submit" disabled={inputs.name==="" || errors.name ||errors.types}>Create</button>
            </div>
        </form>
            <Link to="/pokemons"><button className={styles.btnHome} type='button'>Home</button></Link>
        </div>
    )
}