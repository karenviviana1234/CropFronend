import React, { createContext, useEffect, useState } from 'react'
import axiosClient from '../components/axiosClient'
import ModalMessage from '../components/NextUI/ModalMessage'


const PasswordContext = createContext()

export const PaswordProvider = ({ children }) => {

    const [modalMessage, setModalMessage] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState([]);

    const cambiarPassword = async (data) =>{
        try {
            axiosClient.put(`/auth/cambiar`).then((response)=>{
                setMensaje(response.data.message)
                setModalMessage(true)
            })
        } catch (error) {
            
        }
    }
 
  
  const tokenPassword = async (data) => {
      try {
        axiosClient.post(`/auth/recuperar`, data).then((response)=>{
          setMensaje(response.data.message)
          setModalMessage(true)
          })
      } catch (error) {
        setErrors([error.response?.data?.message || "Error al procesar la solicitud"]);
      }
  }
  
    useEffect(() => {
        if (errors.length > 0) {
          const timer = setTimeout(() => {
            setErrors([]);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [errors]);

  return (
    <PasswordContext.Provider
       value={{
            cambiarPassword,
            tokenPassword
        }}
    >
        {children}
        <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
    </PasswordContext.Provider>
  )
}

export default PasswordContext