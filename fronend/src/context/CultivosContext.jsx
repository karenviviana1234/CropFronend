import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const CultivosContext = createContext()

export const CultivosProvider = ({ children }) => {

    const [cultivos, setCultivos] = useState([])
    const [cultivo, setCultivo] = useState([])
    const [idCultivo, setCultivoId] = useState([])

    const getCultivos = () => {
        try {
            axiosClient.get('/listarCultivos').then((response) => {
                console.log(response.data)
                setCultivos(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getCultivo = (id_cultivo) => {
        try {
            axiosClient.get(`/buscarCultivos${id_cultivo}`).then((response) => {
                console.log(response.data)
                setCultivo(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <CultivosContext.Provider
        value={{
            cultivos,
            cultivo,
            idCultivo,
            setCultivos,
            setCultivo,
            setCultivoId,
            getCultivos,
            getCultivo
        }}
    >
        {children}
    </CultivosContext.Provider>
  )
}

export default CultivosContext
