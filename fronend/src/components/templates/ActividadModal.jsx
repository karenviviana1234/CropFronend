import React from 'react'
import {FormActividad} from '../moleculas/FormActividad.jsx';
import { ModalAcciones } from '../organismos/Modal.jsx';

function ActividadModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){

    return (
      <>
      <ModalAcciones open={open} title={title} onClose={onClose} > 
        <FormActividad initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      </>
    )
} 

export default ActividadModal
//confirmacion yaa