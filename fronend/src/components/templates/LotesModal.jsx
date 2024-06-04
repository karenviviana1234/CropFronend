import React from 'react';
import FormLotes from '../moleculas/FormLotes.jsx';
import { ModalAcciones } from '../organismos/Modal.jsx';

function LotesModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <FormLotes initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
            </ModalAcciones>

        </>
    )
}
export default LotesModal
