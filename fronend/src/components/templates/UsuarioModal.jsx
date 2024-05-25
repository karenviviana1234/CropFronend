import React from 'react';
import FormUsuario from '../moleculas/FormUsuarios.jsx';
import { ModalAcciones } from '../organismos/Modal.jsx';

function UsuarioModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <FormUsuario initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
            </ModalAcciones>

        </>
    )
}
export default UsuarioModal
