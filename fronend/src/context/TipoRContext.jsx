import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const TipoRecursosContext = createContext()

export const TipoRecursosProvider = ({ children }) => {

    const [tipoRecursos, setTipoRecursos] = useState([])
    const [tipoRecurso, setTipoRecurso] = useState([])
    const [idTipoRecurso, setTipoRecursoId] = useState([])

    const getTipoRecursos = () => {
        try {
            axiosClient.get('/listarTipoRecurso').then((response) => {
                console.log(response.data)
                setTipoRecursos(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getTipoRecurso = (id) => {
        try {
            axiosClient.get(`/BuscarTipoRecurso${id}`).then((response) => {
                console.log(response.data)
                setTipoRecurso(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <TipoRecursosContext.Provider
        value={{
            tipoRecursos,
            tipoRecurso,
            idTipoRecurso,
            setTipoRecursos,
            setTipoRecurso,
            setTipoRecursoId,
            getTipoRecursos,
            getTipoRecurso
        }}
    >
        {children}
    </TipoRecursosContext.Provider>
  )
}

export default TipoRecursosContext
