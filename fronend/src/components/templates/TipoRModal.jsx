import React from 'react'
import FormTrecursos from '../moleculas/FormTrecursos.jsx'
import { ModalAcciones } from '../organismos/Modal.jsx'

function TipoRModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
  return (
      <>
          <ModalAcciones open={open} title={title} onClose={onClose} >
              <FormTrecursos initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
          </ModalAcciones>

      </>
  )
}
export default TipoRModal
//confirmacion yaa