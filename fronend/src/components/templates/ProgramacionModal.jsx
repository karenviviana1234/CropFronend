import React from 'react'
import FormProgramacion from '../moleculas/FormProgramacion.jsx'  /* '../molecules/FormLotes.jsx' */
import { ModalAcciones } from '../organismos/Modal.jsx'

function ProgramacionModal ({open, onClose, handleSubmit, actionLabel, title, initialData, mode }){
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose}>
        <FormProgramacion handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} initialdata={initialData} mode={mode}/>
      </ModalAcciones>
    </>
  )
}

export default ProgramacionModal