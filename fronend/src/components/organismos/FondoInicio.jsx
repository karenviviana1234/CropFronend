import React from 'react';
import { Link } from 'react-router-dom';
import v from '../../styles/variables';
import './FondoInicio.css'

const FondoInicio = () => {
    return (
        <div className='caja'>
            <nav className='ini'>
                <img src={v.imageLogo} alt="Logo" className='logo w-40 h-40 mt-4' />
                <ul className='ulu'>
                    <li className='lian'>
                        <Link to='/registro'>
                            <button 
                            className="text-white border-3 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            > Registrarse</button>

                        </Link>
                    </li>
                    <li className='lian'>
                        <Link to='/iniciosesion'>
                            <button 
                            className="botones inline-block px-5 py-2.5  text-white font-semibold border-2 border-transparent rounded transition-transform hover:border-white hover:bg-transparent hover:text-white transform translate-x-10 text-center ">
                            Iniciar Sesion</button>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="textos">
                <h1>Bienvenido a Crop Link</h1>
                <p>¡Bienvenido a Crop Link tu aliado en el mundo de la agricultura digital. Explora nuestras características y mejora tu rendimiento agrícola</p>
            </div>
        </div>
    );
}

export default FondoInicio;
