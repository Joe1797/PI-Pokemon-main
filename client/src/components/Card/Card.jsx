import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card (props){
    const {id,name,image,types,origin} = props;
    // console.log(id)
    const typesArray = [];
    if(origin==="api"){
        types.forEach(t => {
            typesArray.push(t)
        });
    } else {
        types.forEach(t => {
            typesArray.push(t.name)
        });
    }
    // console.log(typesArray)

    return (
        <Link style= { {textDecoration: 'none'}}  to={`/pokemons/detail/${id}`}>
            <div className={styles.containerCard}>
                <h2>{name.toUpperCase()}</h2>
                <img src={image} alt={name} />
                <div className={styles.containerTypes}>
                    {typesArray.map((e,i)=>{
                        return(
                            <span key={i}>{e}</span>
                        )
                    })}
                </div>
            </div>
        </Link>
    )

}