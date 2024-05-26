import React, { useRef, useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import CostosContext from '../../context/CostosContext';

const Formcostostos = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
    /* const [actividades, setActividades] = useState([]) */
    const [tipoRecursos, setTipoRecursos] = useState([])

    const [precio, setPrecio] = useState('')
    const [tipoRecursosFK, setTipoRecursosFK] = useState('')
    /* const [actividadesFK, setActividadesFK] = useState('') */
    const { idCosto } = useContext(CostosContext)

    /*  useEffect(() => {
         axiosClient.get('/listara').then((response) => {
           console.log(response.data)
           const actividadFilter = response.data.filter(actividad => actividad.estado == 'activo')
           setActividades(actividadFilter)
         })
       }, []) */

    useEffect(() => {
        axiosClient.get('/listarRecurso').then((response) => {
            console.log(response.data)
            const tipoRecursoFilter = response.data.filter(tipoRecurso => tipoRecurso.estado == 'existente')
            setTipoRecursos(tipoRecursoFilter)
        })
    }, [])

    useEffect(() => {
        if (mode == 'update' && idCosto) {
            setPrecio(idCosto.precio)
            setTipoRecursosFK(idCosto.fk_id_tipo_recursos)
            /* actividadesFK(idCosto.) */

        }
    }, [mode, idCosto])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                precio: precio,
                fk_id_tipo_recursos: tipoRecursosFK
            }
            handleSubmit(formData, e)
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    }


    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div className='ml-5 align-items-center '>
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
                        />
                    </div>
                <div className='py-2'>
                    <Select
                        label='tipo de cultivo'
                        name="idCosto"
                        className='w-80'
                        value={tipoRecursosFK}
                        onChange={(e) => setTipoRecursosFK(e.target.value)}
                    >
                        {tipoRecursos.map(tipoRecurso => (
                            <SelectItem key={tipoRecurso.id_tipo_recursos} value={tipoRecurso.id_tipo_recursos} textValue={tipoRecurso.id_tipo_recursos}>
                                {tipoRecurso.nombre_recursos}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                {<ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button type='submit' color="primary">
                        {actionLabel}
                    </Button>

                </ModalFooter>}
            </div>
        </form >
        </>
    );
};

export default Formcostostos;
