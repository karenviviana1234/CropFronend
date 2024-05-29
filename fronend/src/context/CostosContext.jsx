import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const CostosContext = createContext()

export const CostosProvider = ({ children }) => {

    const [costos, setCostos] = useState([])
    const [costo, setCosto] = useState([])
    const [idCosto, setCostoId] = useState([])

    const getCostos = () => {
        try {
            axiosClient.get('/listarCostos').then((response) => {
                console.log(response.data)
                setCostos(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getCosto = (id_costos) => {
        try {
            axiosClient.get(`/buscarCostos${id_costos}`).then((response) => {
                console.log(response.data)
                setCosto(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <CostosContext.Provider
        value={{
            costos,
            costo,
            idCosto,
            setCostos,
            setCosto,
            setCostoId,
            getCostos,
            getCosto
        }}
    >
        {children}
    </CostosContext.Provider>
  )
}

export default CostosContext
