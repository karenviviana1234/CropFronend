import React, { useState } from 'react'
import Header from '../organismos/Header/Header';


function hola() {
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    return (
        <div className={`contenidos ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
            <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
            <div>
                <h1>
                    Hola
                </h1>
            </div>
        </div>
    )
}

export default hola;   