import React from 'react'
import FormEmpleado from '../moleculas/FormEmpleado.jsx'

function EmpleadoModal ({  handleSubmit }) {
  return (
      <>
              <FormEmpleado  handleSubmit={handleSubmit} />

      </>
  )
}

export default EmpleadoModal