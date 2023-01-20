import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import facebook from '../../images/RedesSociales/social_facebook_box_blue_256_30649.png';
import instagram from '../../images/RedesSociales/1491580658-yumminkysocialmedia06_83104.png';
import linkedlin from '../../images/RedesSociales/linkedlin.png'
import react from '../../images/Tecnologias/react_original_logo_icon_146374.png'
import redux from '../../images/Tecnologias/redux_original_logo_icon_146365.png'
import sequalize from '../../images/Tecnologias/sequealize.png'
import express from '../../images/Tecnologias/api_icon_129131.png'

export default function LandingPage(){


    return(
        <>
            <div className={styles.container}>
                <div className={styles.container1}></div>
                <div className={styles.container2}>
                    <div>
                        <h1 className={styles.h1Land}>Welcome to my PokeWeb!</h1>
                        <span>By Joel Gonzales</span>
                    </div>
                    <div>
                        <h2>I am fullstack developer</h2>
                        <h2>The technologies used on this website are:</h2>
                        <ul className={styles.lista}>
                            <li className={styles.listaOpt}><img src={express} alt="Express" /><span>Express</span></li>
                            <li className={styles.listaOpt}><img src={sequalize} alt="Sequealize" /><span>Sequealize</span></li>
                            <li className={styles.listaOpt}><img src={react} alt="React" /><span>React</span></li>
                            <li className={styles.listaOpt}><img src={redux} alt="Redux" /><span>Redux</span></li>
                        </ul>
                        <Link to='/pokemons'><button className={styles.buttonIng}>Let´s go</button></Link>
                    </div>
                    <div>
                        <span></span>
                    </div>
                </div>
                    <footer>
                        <ul className={styles.lista}>
                                <li><a href="https://www.linkedin.com/in/joel-fabrizio-gonzales-diaz-6ab9ba123/" target="_blank" rel="noopener noreferrer"><img src={linkedlin} alt="Linkedlin" /></a></li>
                                <li><a href="https://www.facebook.com/joel.gonzales.16940/" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" /></a></li>
                                <li><a href="https://www.instagram.com/joel_fabrizio_17/" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a></li>
                        </ul>
                        <span>Copyrigth 2023</span>
                    </footer>
            </div>
        </>
    )
}