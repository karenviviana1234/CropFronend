import React from 'react';
import FormUsuarios from '../moleculas/FormUsuario.jsx';
import { ModalAcciones } from '../organismos/Modal.jsx';

function UsuarioModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <FormUsuarios initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
            </ModalAcciones>

        </>
    )
}
export default UsuarioModal
