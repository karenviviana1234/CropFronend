import React from 'react'
import FormCultivos from '../moleculas/FormCultivos.jsx'
import { ModalAcciones } from '../organismos/Modal.jsx'

function CultivosModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
  return (
      <>
          <ModalAcciones open={open} title={title} onClose={onClose} >
              <FormCultivos initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
          </ModalAcciones>

      </>
  )
}

export default CultivosModal