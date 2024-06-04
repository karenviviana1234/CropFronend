import React from 'react'
import FormCostos from '../moleculas/FormCostos.jsx'
import { ModalAcciones } from '../organismos/Modal.jsx'

function CostosModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
  return (
    <>
      <ModalAcciones open={open} title={title} onClose={onClose} >
        <FormCostos initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>

    </>
  )
}

export default CostosModal