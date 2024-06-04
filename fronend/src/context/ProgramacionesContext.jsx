import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const ProgramacionesContext = createContext()

export const ProgramacionesProvider = ({ children }) => {

    const [programaciones, setprogramaciones] = useState([])
    const [programacion, setProgramacion] = useState([])
    const [idProgramacion, setProgramacionId] = useState([])

    const getprogramaciones = () => {
        try {
            axiosClient.get('/listarProgramacion').then((response) => {
                console.log(response.data)
                setprogramaciones(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getProgramacion = (id_programacion) => {
        try {
            axiosClient.get(`/buscarProgramacion/${id_programacion}`).then((response) => {
                console.log(response.data)
                setProgramacion(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <ProgramacionesContext.Provider
        value={{
            programaciones,
            programacion,
            idProgramacion,
            setprogramaciones,
            setProgramacion,
            setProgramacionId,
            getprogramaciones,
            getProgramacion
        }}
    >
        {children}
    </ProgramacionesContext.Provider>
  )
}

export default ProgramacionesContext
