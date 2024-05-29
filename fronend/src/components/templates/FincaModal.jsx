import React from 'react'
import { ModalAcciones } from '../organismos/Modal.jsx'
import FormFinca from '../moleculas/FormFinca.jsx'

function FincaModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
  return (
      <>
          <ModalAcciones open={open} title={title} onClose={onClose} >
              <FormFinca initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
          </ModalAcciones>

      </>
  )
}

export default FincaModal
//confirmacion yaa