import React from 'react'
import { ModalAcciones } from '../organismos/Modal.jsx'
import FormFinca from '../moleculas/FormFinca.jsx'

function FincaModal ({open, onClose, handleSubmit, actionLabel, title, initialData, mode }){
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose}>
        <FormFinca handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} initialdata={initialData} mode={mode}/>
      </ModalAcciones>
    </>
  )
}

export default FincaModal
//confirmacion yaa