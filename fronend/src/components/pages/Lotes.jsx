import React, { useContext, useEffect, useState } from 'react'
import LotesModal from '../templates/LotesModal.jsx';
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import LotesContext from '../../context/LotesContext.jsx';
import Header from '../organismos/Header/Header.jsx';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./../NextUI/PlusIcon.jsx";
import { SearchIcon } from "./../NextUI/SearchIcon.jsx";
import { ChevronDownIcon } from "./../NextUI/ChevronDownIcon.jsx";
import ButtonDesactivar from "../atomos/ButtonDesactivar.jsx"
import ButtonActualizar from "../atomos/ButtonActualizar.jsx"

export function Lotes() {

    const statusColorMap = {
        activo: "success",
        inactivo: "danger",
        todos: "primary",
    };

    function Ejemplo() {

        const [filterValue, setFilterValue] = React.useState("");
        const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
        const [statusFilter, setStatusFilter] = React.useState("all");
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [sortDescriptor, setSortDescriptor] = React.useState({
            column: "fecha",
            direction: "ascending",
        });
        const [page, setPage] = React.useState(1);
        const statusOptions = [
            { name: "Todos", uid: "todos" },
            { name: "Activo", uid: "inactivo" },
            { name: "Inactivo", uid: "activo" },
        ];

        const hasSearchFilter = Boolean(filterValue);
        const filteredItems = React.useMemo(() => {
            let filteredlotes = lotes;

            if (hasSearchFilter) {
                filteredlotes = filteredlotes.filter(lote =>
                    String(lote.id_lote).toLowerCase().includes(filterValue.toLowerCase()) ||
                    lote.nombre.toLowerCase().includes(filterValue.toLowerCase()) /* ||
                    String(lote.fk_tipo_analisis).toLowerCase().includes(filterValue.toLowerCase()) */
                );
            }

            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                filteredlotes = filteredlotes.filter(lote =>
                    Array.from(statusFilter).includes(lote.estado)
                );
            }
            return filteredlotes;
        }, [lotes, filterValue, statusFilter]);

        const pages = Math.ceil(filteredItems.length / rowsPerPage);

        const items = React.useMemo(() => {
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;

            return filteredItems.slice(start, end);
        }, [page, filteredItems, rowsPerPage]);

        const sortedItems = React.useMemo(() => {
            return [...items].sort((a, b) => {
                const first = a[sortDescriptor.column];
                const second = b[sortDescriptor.column];
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
        }, [sortDescriptor, items]);

        const renderCell = React.useCallback((lote, columnKey) => {
            const cellValue = lote[columnKey];

            const handleUpdateClick = (id_lote, lote) => {
                localStorage.setItem('idUser', id_lote);
                clickEditar(id_lote, lote);
                console.log('ID del lote seleccionado:', id_lote);
                console.log('Datos del lote seleccionado:', lote);
            };

            switch (columnKey) {
                case "estado":
                    return (
                        <Chip className="capitalize" color={statusColorMap[lote.estado]} size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "actions": /*  */
                    return (
                        <div className="relative flex justify-start  items-center gap-2">
                            <Dropdown>
                                <div className="flex items-center gap-2">
                                    <ButtonActualizar onClick={() => handleToggle('update', setLoteId(lote))} />
                                    <ButtonDesactivar
                                        onClick={() => peticionDesactivar(lote.id_lote)}
                                        estado={lote.estado}
                                    />
                                </div>
                            </Dropdown>
                        </div>
                    );

                default:
                    return cellValue;
            }
        }, []);

        const onNextPage = React.useCallback(() => {
            if (page < pages) {
                setPage(page + 1);
            }
        }, [page, pages]);

        const onPreviousPage = React.useCallback(() => {
            if (page > 1) {
                setPage(page - 1);
            }
        }, [page]);

        const onRowsPerPageChange = React.useCallback((e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        }, []);

        const onSearchChange = React.useCallback((value) => {
            if (value) {
                setFilterValue(value);
                setPage(1);
            } else {
                setFilterValue("");
            }
        }, []);

        const onClear = React.useCallback(() => {
            setFilterValue("");
            setPage(1);
        }, []);

        const onStatusFilter = (selectedKeys) => {
            setStatusFilter(selectedKeys)
        }

        const topContent = React.useMemo(() => {
            return (
                <>
                    <div className="flex flex-col  mt-3" >
                        <div className="flex justify-between gap-3 items-end ">
                            <Input
                                isClearable
                                className="w-full sm:max-w-[44%] bg-[#f4f4f5] rounded"
                                placeholder="Buscar..."
                                startContent={<SearchIcon />}
                                value={filterValue}
                                onClear={() => onClear()}
                                onValueChange={onSearchChange}
                            />
                            <div className="flex gap-3">

                                <Dropdown>
                                    <DropdownTrigger className="hidden sm:flex mr-2  text-black bg-[#f4f4f5]">
                                        <Button endContent={<ChevronDownIcon className="text-small text-slate-700" />} variant="flat">
                                            Estado
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label="Menu de acciones"
                                        aria-labelledby="Acciones"
                                        closeOnSelect={false}
                                        selectedKeys={statusFilter}
                                        selectionMode="multiple"
                                        onSelectionChange={onStatusFilter}
                                    >
                                        {statusOptions.map((status) => (
                                            <DropdownItem key={status.uid} className="capitalize w-55">
                                                {status.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <Button className="z-1 mr-40 text-white bg-[#006000] " style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-default-400 text-small">Total {lotes.length} Resultados</span>
                            <label className="flex items-center text-default-400 text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-default-400 text-small"
                                    onChange={onRowsPerPageChange}
                                >
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </>

            );
        }, [
            filterValue,
            onRowsPerPageChange,
            onSearchChange,
            onClear,
            hasSearchFilter,
        ]);

        const bottomContent = React.useMemo(() => {
            return (
                <div className="py-2 px-2 flex justify-between items-center m-3">
                  <Pagination
                    showControls
                    initialPage={1}
                    color="success"
                    page={page}
                    total={pages}
                    onChange={setPage}
                  />
                  <div className="hidden sm:flex w-[40%] justify-end gap-2 ">
                    <Button isDisabled={pages === 1} size="md" variant="ghost" className="text-slate-50" onPress={onPreviousPage}>
                      Anterior
                    </Button>
                    <Button isDisabled={pages === 1} size="md" className="text-slate-50 mr-58" variant="ghost" onPress={onNextPage}>
                      Siguiente
                    </Button>
                  </div>
                </div>
              );
        }, [items.length, page, pages, hasSearchFilter]);

        return (
            <div className="flex items-center justify-center">
              <Table
                aria-label="Tabla"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                  wrapper: "max-h-[100%] max-w-[100%]",
                }}
                className="flex"
                selectedKeys={selectedKeys}
                // selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
              >
                <TableHeader columns={data}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                      allowsSorting={column.sortable}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody emptyContent={"No hay resultados registrados"} items={sortedItems}>
                  {(item) => (
                    <TableRow key={item.id_lote}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
      
          );
    }

    /* Espacio 1 */
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [mensaje, setMensaje] = useState('')
    const [lotes, setLotes] = useState([]);
    const { idLote, setLoteId } = useContext(LotesContext)


    useEffect(() => {
        peticionGet()
    }, []);

    // Trae los datos a la tabla lote
    const peticionGet = async () => {
        try {
            await axiosClient.get('/listarlote').then((response) => {
                console.log(response.data)
                setLotes(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };

    // columnas de la tabla lotes
    const data = [
        {
            uid: 'id_lote',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'nombre',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'longitud',
            name: 'Longitud',
            sortable: true
        },
        {
            uid: 'latitud',
            name: 'Latitud',
            sortable: true
        },
        {
            uid: 'nombre_finca',
            name: 'fk Id Finca',
            sortable: true
        },
        {
            uid: 'estado',
            name: 'Estado',
            sortable: true
        },
        {
            uid: 'actions',
            name: "Acciones",
            sortable: true
        }
    ];

    // desactivar lote
    const peticionDesactivar = async (id_lote) => {

        // console.log("ID del lotes a desactivar:", id_lote);
        try {
            axiosClient.put(`/desactivarlote/${id_lote}`, null).then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    const nuevoEstado = response.data.message;
                    /* fetchData() */
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¡Esto podra afectar a tus lotes!",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, estoy seguro!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "¡Actualizado!",
                                text: `${nuevoEstado}`,
                                icon: "success"
                            });
                            peticionGet()
                        }
                    });
                } else {
                    alert('Error')
                }
            });
        } catch (error) {
            alert('Error del servidor ' + error)
        }
    }

    // registrar y actualizar lote
    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault()

        try {

            if (mode === 'create') {
                await axiosClient.post('/Registrarlote', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Lote registrado con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error en el registro')
                    }
                })
            } else if (mode === 'update') {

                await axiosClient.put(`/Actualizarlote/${idLote.id_lote}`, formData).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito el lote",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)

        } catch (error) {
            console.log('Error en el servidor ', error)
            alert('Error en el servidor')
        }
    }

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
    return (

        <>
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
            <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
            <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <LotesModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar lotes' : 'Actualizar lotes'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                />
                <Ejemplo
                    data={data}
                    lotes={lotes}
                />
            </div>
            </div>
        </>
    )
}

/*
El código es un componente de React que gestiona una tabla de "Lotes". Aquí hay un desglose de sus partes más importantes y su funcionamiento:

Importaciones:

Se importan varias bibliotecas y componentes necesarios, como React, Swal para alertas, axios para las solicitudes HTTP, y varios componentes de diseño de NextUI y componentes personalizados como LotesModal, ButtonDesactivar y ButtonActualizar.
Constantes y funciones principales:

statusColorMap: Mapa de colores para los estados de los lotes.
Ejemplo: Componente principal que gestiona la tabla de lotes con filtrado, paginación, y ordenamiento.
Estados del Componente:

filterValue: Valor de búsqueda.
selectedKeys: Conjunto de filas seleccionadas.
statusFilter: Filtro de estado.
rowsPerPage: Número de filas por página.
sortDescriptor: Descriptor de ordenamiento.
page: Página actual.
Efectos y Solicitudes:

useEffect se usa para cargar los lotes al montar el componente.
peticionGet: Función asíncrona que obtiene los datos de los lotes del servidor.
Filtrado y Paginación:

filteredItems: Filtra los lotes según el valor de búsqueda y el filtro de estado.
items: Calcula los elementos que deben mostrarse en la página actual.
sortedItems: Ordena los elementos de la página actual según el descriptor de ordenamiento.
Renderizado de la Tabla:

renderCell: Función que define cómo renderizar cada celda de la tabla.
onNextPage, onPreviousPage: Funciones para la navegación entre páginas.
topContent, bottomContent: Contenido superior e inferior de la tabla, que incluye el campo de búsqueda y la paginación.
Modal y Acciones:

modalOpen, modalAcciones: Estados para controlar la visibilidad de los modales.
mode: Modo actual del modal (crear o actualizar).
initialData: Datos iniciales para el formulario del modal.
handleSubmit: Maneja la creación y actualización de lotes.
handleToggle: Abre el modal en el modo especificado.
Petición
Ahora, indicaste que tienes una petición. Por favor, indícame qué necesitas exactamente: ¿un cambio en el código, agregar una nueva funcionalidad, corregir un error, optimizar algo específico, o cualquier otra cosa que necesites? */