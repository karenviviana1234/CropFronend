import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const FincasContext = createContext()

export const FincasProvider = ({ children }) => {

    const [fincas, setFincas] = useState([])
    const [finca, setFinca] = useState([])
    const [idFinca, setFincaId] = useState([])

    const getFincas = () => {
        try {
            axiosClient.get('/listarFinca').then((response) => {
                console.log(response.data)
                setFincas(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getFinca = (id) => {
        try {
            axiosClient.get(`/buscarFinca${id}`).then((response) => {
                console.log(response.data)
                setFinca(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <FincasContext.Provider
        value={{
            fincas,
            finca,
            idFinca,
            setFincas,
            setFinca,
            setFincaId,
            getFincas,
            getFinca
        }}
    >
        {children}
    </FincasContext.Provider>
  )
}

export default FincasContext
