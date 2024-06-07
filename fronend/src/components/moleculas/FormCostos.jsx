import React, { useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input } from "@nextui-org/react";
import CostosContext from '../../context/CostosContext';

const Formcostostos = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
    const [tipoRecursos, setTipoRecursos] = useState([]);
    const [precio, setPrecio] = useState('');
    const [tipoRecursosFK, setTipoRecursosFK] = useState('');
    const { idCosto } = useContext(CostosContext);

    useEffect(() => {
        axiosClient.get('/listarRecurso').then((response) => {
            console.log(response.data);
            const tipoRecursoFilter = response.data.filter(tipoRecurso => tipoRecurso.estado === 'existente');
            setTipoRecursos(tipoRecursoFilter);
        });
    }, []);

    useEffect(() => {
        if (mode === 'update' && idCosto) {
            setPrecio(idCosto.precio || '');
            setTipoRecursosFK(idCosto.fk_id_tipo_recursos || '');
        }
    }, [mode, idCosto]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                precio: precio,
                fk_id_tipo_recursos: tipoRecursosFK
            };
            handleSubmit(formData, e);
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema: ' + error);
        }
    };
    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div className='ml-5 align-items-center'>
                    <div className='py-2'>
                        <Input
                            type="number"
                            label="Precio de la actividad"
                            className="w-80"
                            id='precio'
                            name="precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required={true}
                            pattern="^\d+$"
                            title="El precio debe ser un número entero."
                        />
                    </div>
                    <div className='py-2'>
                        <select
                            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            name="idCosto"
                            value={tipoRecursosFK}
                            onChange={(e) => setTipoRecursosFK(e.target.value)}
                            required={true}
                            title="El ID del tipo de recurso es obligatorio y debe ser un número entero."
                        >
                           <option value="" disabled hidden>Seleccionar tipo de recurso</option>
                            {tipoRecursos.map((tipoRecurso) => (
                                <option key={tipoRecurso.id_tipo_recursos} value={tipoRecurso.id_tipo_recursos}>
                                    {tipoRecurso.nombre_recursos}
                                </option>
                            ))}
                        </select>
                    </div>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        <Button type='submit' className=' text-white bg-[#006000] '>
                            {actionLabel}
                        </Button>
                    </ModalFooter>
                </div>
            </form>
        </>
    );
};

export default Formcostostos;