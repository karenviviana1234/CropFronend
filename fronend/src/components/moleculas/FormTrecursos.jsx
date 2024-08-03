import React, { useRef, useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import TipoRecursosContext from './../../context/TipoRContext'

const FormTrecursos = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

  const [nombreRecursos, setNombreRecursos] = useState('');
  const [cantidadMedida, setCantidadMedida] = useState('');;
  const [unidadesMedida, setUnidadesMedida] = useState('');;
  const [extras, setExtras] = useState('');;
  const { idTipoRecurso } = useContext(TipoRecursosContext)


  useEffect(() => {
    if (mode == 'update' && idTipoRecurso) {
      setNombreRecursos(idTipoRecurso.nombre_recursos)
      setCantidadMedida(idTipoRecurso.cantidad_medida)
      setUnidadesMedida(idTipoRecurso.unidades_medida)
      setExtras(idTipoRecurso.extras)
    }
  }, [mode, idTipoRecurso])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre_recursos: nombreRecursos,
        cantidad_medida: parseInt(cantidadMedida),
        unidades_medida: unidadesMedida,
        extras: extras
      }
      handleSubmit(formData, e)
    } catch (error) {
      alert('Hay un error en el sistema ' + error);
    }
  }

  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className='ml-5 align-items-center'>
          <div className='py-2'>
            <Input
              className="w-80"
              type="text"
              label='Nombre Recurso'
              id='nombre_recursos'
              name="nombre_recursos"
              value={nombreRecursos}
              onChange={(e) => setNombreRecursos(e.target.value)}
              required={true}
              pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,30}$"
              title="Ingrese un nombre válido"
            />

          </div>
          <div className='py-2'>
            <Input
              className="w-80"
              type="number"
              label='Cantidad Medida'
              id='cantidad_medida'
              name="cantidad_medida"
              value={cantidadMedida}
              onChange={(e) => setCantidadMedida(e.target.value)}
              required={true}
              pattern="\d+(\.\d+)?"
              title="Ingrese un número válido"
            />
          </div>
          <div className='py-2'>
            <select
              className='p-2 rounded-lg w-80 h-12 border '
              id='unidades_medida'
              name='unidades_medida'
              value={unidadesMedida}
              onChange={(e) => setUnidadesMedida(e.target.value)}
              required
            >
              <option value=''>Selecciona una opción</option>
              <option value='ml'>Mililitro</option>
              <option value='litro'>Litro</option>
              <option value='g'>Gramos</option>
              <option value='kg'>Kilogramo</option>
              <option value='unidad'>Unidad</option>
            </select>
          </div>
          <div className='py-2'>
            <Input
              className="w-80"
              type="text"
              label='Extras'
              id='extras'
              name="extras"
              value={extras}
              onChange={(e) => setExtras(e.target.value)}
              required={true}
            />
          </div>
          <ModalFooter>
            <Button color='danger' variant='flat' onClick={onClose}>
              Cerrar
            </Button>
            <Button type='submit' className='text-white bg-[#006000]'>
              {actionLabel}
            </Button>
          </ModalFooter>
        </div>
      </form>
    </>
  );
};

export default FormTrecursos;