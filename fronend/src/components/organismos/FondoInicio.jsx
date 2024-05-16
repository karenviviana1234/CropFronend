import React from 'react';
import { Link } from 'react-router-dom';
import v from '../../styles/variables';
import './FondoInicio.css'

const FondoInicio = () => {
    return (
        <div className='contenerdor'>
            <nav className='iniciossss'>
                <img src={v.imageLogo} alt="Logo" className='logo' />
                <ul className='ulua'>
                    <li className='liasss'>
                        <Link to='/registro'>
                            <button 
                            className="text-white border-3 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            > Registrarse</button>

                        </Link>
                    </li>
                    <li className='liasss'>
                        <Link to='/iniciosesion'>
                            <button 
                            className="button mr-5 inline-block px-5 py-2.5  text-white font-semibold border-2 border-transparent rounded transition-transform hover:border-white hover:bg-transparent hover:text-white transform translate-x-10 text-center ">
                            Iniciar Sesion</button>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="texto">
                <h1>Bienvenido a Crop Link</h1>
                <p>¡Bienvenido a Crop Link tu aliado en el mundo de la agricultura digital. Explora nuestras características y mejora tu rendimiento agrícola</p>
            </div>
        </div>
    );
}

export default FondoInicio;
