import React from 'react'
import FormVariedades from '../moleculas/FormVariedad.jsx'
import { ModalAcciones } from '../organismos/Modal.jsx'

function VariedadesModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose} >
        <FormVariedades initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>

    </>
  )
}

export default VariedadesModal