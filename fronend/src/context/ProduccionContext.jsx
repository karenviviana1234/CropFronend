import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const ProduccionContext = createContext()

export const ProduccionProvider = ({ children }) => {

    const [producciones, setProducciones] = useState([])
    const [produccion, setProduccion] = useState([])
    const [idProduccion, setProduccionId] = useState([])

    const getProducciones = () => {
        try {
            axiosClient.get('/listarProduccion').then((response) => {
                console.log(response.data)
                setProducciones(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getProduccion = (id_produccion) => {
        try {
            axiosClient.get(`/BuscarProduccion${id_produccion}`).then((response) => {
                console.log(response.data)
                setProduccion(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <ProduccionContext.Provider
        value={{
            producciones,
            produccion,
            idProduccion,
            setProducciones,
            setProduccion,
            setProduccionId,
            getProducciones,
            getProduccion
        }}
    >
        {children}
    </ProduccionContext.Provider>
  )
}

export default ProduccionContext
