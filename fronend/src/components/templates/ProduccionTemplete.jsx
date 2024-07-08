import React from 'react';
import FormProduccion from '../moleculas/FormProduccion.jsx';
import { ModalAcciones } from '../organismos/Modal.jsx';

//se renderiza el formulario de la produccion
function ProduccionModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <FormProduccion initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
            </ModalAcciones>

        </>
    )
}
export default ProduccionModal
