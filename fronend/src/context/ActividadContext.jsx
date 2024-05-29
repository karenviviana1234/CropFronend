import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const ActividadesContext = createContext()

export const ActividadesProvider = ({ children }) => {

    const [actividades, setActividades] = useState([])
    const [actividad, setActividad] = useState([])
    const [idActividad, setActividadId] = useState([])

    const getActividades = () => {
        try {
            axiosClient.get('/listara').then((response) => {
                console.log(response.data)
                setActividades(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getActividad = (id) => {
        try {
            axiosClient.get(`/Buscar/actividad/${id}`).then((response) => {
                console.log(response.data)
                setActividad(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <ActividadesContext.Provider
        value={{
            actividades,
            actividad,
            idActividad,
            setActividades,
            setActividad,
            setActividadId,
            getActividades,
            getActividad
        }}
    >
        {children}
    </ActividadesContext.Provider>
  )
}

export default ActividadesContext
