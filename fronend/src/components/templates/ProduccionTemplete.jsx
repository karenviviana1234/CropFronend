import React from 'react'
import FormProduccion from '../moleculas/FormProduccion.jsx';
import AccionesModal from '../organismos/ModalAcciones';

function ModalProdu ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){

    return (
      <>
      <AccionesModal open={open} title={title} onClose={onClose} > 
        <FormProduccion initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </AccionesModal>
      </>
    )
} 

export default ModalProdu