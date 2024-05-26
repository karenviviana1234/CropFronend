import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const LotesContext = createContext()

export const LotesProvider = ({ children }) => {

    const [lotes, setLotes] = useState([])
    const [lote, setLote] = useState([])
    const [idLote, setLoteId] = useState([])

    const getLotes = () => {
        try {
            axiosClient.get('/listarlote').then((response) => {
                console.log(response.data)
                setLotes(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getLote = (id_lote) => {
        try {
            axiosClient.get(`/Buscarlote${id_lote}`).then((response) => {
                console.log(response.data)
                setLote(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <LotesContext.Provider
        value={{
            lotes,
            lote,
            idLote,
            setLotes,
            setLote,
            setLoteId,
            getLotes,
            getLote
        }}
    >
        {children}
    </LotesContext.Provider>
  )
}

export default LotesContext
