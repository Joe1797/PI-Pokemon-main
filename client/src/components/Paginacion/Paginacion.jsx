
import { useState } from 'react';
import styles from './Paginacion.module.css';

export default function Paginacion ({pagina,setPagina,maximo}){

    const [input,setInput]=useState(1);

    const nextPage =()=>{
        setInput(parseInt(input)+1);
        setPagina(parseInt(pagina)+1);
    }

    const previousPage =()=>{
        setInput(parseInt(input)-1);
        setPagina(parseInt(pagina)-1);
    }

    const handleChange =(e)=>{
        setInput(e.target.value)
    }

    const handleKeyDown=(e)=>{
        const {value} = e.target;
        const valuePar = parseInt(value);
        // codigo de enter
        if(e.keyCode === 13){
            setPagina(valuePar)
            if(valuePar<1 || valuePar>maximo || isNaN(valuePar)){
                setPagina(1);
                setInput(1);
            }else{
                setPagina(valuePar)
            }
        }
    };

    // console.log(maximo)

    return(
        <div className={styles.containerPaginacion}>
            <button onClick={previousPage} disabled={pagina === 1 || pagina < 1}>{"<"}</button>
            <input type="text" 
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="false"
                value={pagina}
                />
            {(maximo)?<p>de {maximo}</p>:<p> de -</p>}
            <button onClick={nextPage} disabled={pagina===maximo||pagina>maximo||isNaN(maximo)}>{">"}</button>
        </div>        
    )
}