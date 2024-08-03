import React, { useContext, useEffect, useState } from 'react'
import ProgramacionModal from '../templates/ProgramacionModal.jsx'
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import ProgramacionesContext from './../../context/ProgramacionesContext';
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
import { VerticalDotsIcon } from "./../NextUI/VerticalDotsIcon.jsx";
import { SearchIcon } from "./../NextUI/SearchIcon.jsx";
import { ChevronDownIcon } from "./../NextUI/ChevronDownIcon.jsx";
import ButtonDesactivar from "../atomos/ButtonDesactivar.jsx";
import ButtonActualizar from "../atomos/ButtonActualizar.jsx";

export function Programaciones() {
    const statusColorMap = {
        activo: "success",
        inactivo: "danger",
        proceso: "warning",
        terminado: "secondary",
        todos: "primary",
    };
    function Ejemplo({ programaciones }) {
        const [filterValue, setFilterValue] = useState("");
        const [statusFilter, setStatusFilter] = useState("todos");
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [sortDescriptor, setSortDescriptor] = useState({
            column: "fecha",
            direction: "ascending",
        });
        const [page, setPage] = useState(1);

        const statusOptions = [
            { name: "Todos", uid: "todos" },
            { name: "Activo", uid: "activo" },
            { name: "Inactivo", uid: "inactivo" },
            { name: "En proceso", uid: "proceso" },
            { name: "Terminado", uid: "terminado" },
        ];

        const hasSearchFilter = Boolean(filterValue);

        const filteredItems = React.useMemo(() => {
            let filteredProgramaciones = programaciones;

            if (hasSearchFilter) {
                filteredProgramaciones = filteredProgramaciones.filter(
                    (programacion) =>
                        String(programacion.id_programacion)
                            .toLowerCase()
                            .includes(filterValue.toLowerCase()) ||
                        programacion.usuario.toLowerCase().includes(filterValue.toLowerCase()) ||
                        String(programacion.nombre_actividad)
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "todos") {
                filteredProgramaciones = filteredProgramaciones.filter(
                    (programacion) => programacion.estado === statusFilter
                );
            }

            return filteredProgramaciones;
        }, [programaciones, filterValue, statusFilter]);

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

        const renderCell = React.useCallback((programacion, columnKey) => {
            const cellValue = programacion[columnKey];

            switch (columnKey) {
                case "estado":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap[programacion.estado]}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue}
                        </Chip>
                    );
                case "actions":
                    if (programacion.nombre !== "terminado" && programacion.estado !== "terminado") {
                        return (
                            <div className="relative flex justify-end items-center gap-2">
                                <Dropdown>
                                    <div className="flex items-center gap-2">
                                        <ButtonActualizar
                                            onClick={() => handleToggle('update', setProgramacionId(programacion))} />
                                        <ButtonDesactivar
                                            onClick={() => peticionDesactivar(programacion.id_programacion)}
                                            estado={programacion.estado}
                                        />
                                    </div>
                                </Dropdown>
                            </div>
                        );
                    } else {
                        return null; 
                    }
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

        const onStatusFilter = React.useCallback((key) => {
            const selectedStatus = Array.from(key).pop();
            setStatusFilter(selectedStatus);
        }, []);

        const onClear = React.useCallback(() => {
            setFilterValue("");
            setPage(1);
        }, []);

        const topContent = React.useMemo(() => {
            return (
                <>
                    <div className="flex flex-col mt-3">
                        <div className="flex justify-between gap-3 items-end">
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
                                    <DropdownTrigger className="hidden sm:flex mr-2 text-black bg-[#f4f4f5]">
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
                                <Button className="z-1 text-white bg-[#006000]" style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center z-10 mr-40 mt-2">
                            <span className="text-white text-small">Total {programaciones.length} Resultados</span>
                            <label className="flex items-center text-white text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-white text-small"
                                    onChange={onRowsPerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
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
                    <div className="hidden sm:flex w-[40%] justify-end gap-2">
                        <Button
                            isDisabled={pages === 1}
                            size="md"
                            variant="ghost"
                            className="text-slate-50"
                            onPress={onPreviousPage}
                        >
                            Anterior
                        </Button>
                        <Button
                            isDisabled={pages === 1}
                            size="md"
                            className="text-slate-50 mr-58"
                            variant="ghost"
                            onPress={onNextPage}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            );
        }, [items.length, page, pages, hasSearchFilter]);

        return (
            <div className="flex items-center justify-center p-4 w-full">
                <div className="w-auto overflow-x-auto">
                    <Table
                        aria-label="Tabla"
                        isHeaderSticky
                        bottomContent={bottomContent}
                        bottomContentPlacement="outside"
                        classNames={{
                            wrapper: "max-h-[100%] max-w-[100%]",
                        }}
                        className="flex"
                        sortDescriptor={sortDescriptor}
                        topContent={topContent}
                        topContentPlacement="outside"
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
                        <TableBody emptyContent={"No hay asignaciones registradas"} items={sortedItems}>
                            {(item) => (
                                <TableRow key={item.id_programacion}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [mensaje, setMensaje] = useState('')
    const [programaciones, setProgramaciones] = useState([]);
    const { idProgramacion, setProgramacionId } = useContext(ProgramacionesContext)

    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    useEffect(() => {
        peticionGet()
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '';
        }
        return date.toISOString().split('T')[0];
    };

    const peticionGet = async () => {
        try {
            const response = await axiosClient.get('/listarProgramacion');
            const formattedData = response.data.map((item) => ({
                ...item,
                fecha_inicio: formatDate(item.fecha_inicio),
                fecha_fin: formatDate(item.fecha_fin),
            }));
            setProgramaciones(formattedData);
        } catch (error) {
            alert('Error en el servidor')
        }
    };

    useEffect(() => {
        peticionGet();
    }, []);

    const data = [
        {
            uid: 'id_programacion',
            name: 'Id',
            sortable: true,
        },
        {
            uid: 'fecha_inicio',
            name: 'Fecha Inicio',
            sortable: true,
            render: (row) => row.fecha_inicio, 
        },
        {
            uid: 'fecha_fin',
            name: 'Fecha Fin',
            sortable: true,
            render: (row) => row.fecha_fin, 
        },
        {
            uid: 'usuario',
            name: 'Usuario',
            sortable: true
        },
        {
            uid: 'nombre_actividad',
            name: 'Actividad',
            sortable: true
        },
        {
            uid: 'nombre_variedad',
            name: 'Variedad',
            sortable: true
        },
        {
            uid: 'lote',
            name: 'Lote',
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


    const peticionDesactivar = async (id_programacion) => {
        try {
            const response = await axiosClient.put(`/estadoProgramacion/${id_programacion}`, null);
            if (response.status === 200) {
                const nuevoEstado = response.data.message;

                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Esto podrá afectar a tus programaciones!",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#006000",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, estoy seguro!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: `${nuevoEstado}`,
                            icon: "success"
                        });
                        peticionGet();
                    } else {
                        Swal.fire({
                            title: "Cancelado",
                            text: "La operación ha sido cancelada",
                            icon: "info"
                        });
                    }
                });
            } else {
                throw new Error('Error, el mensaje recibido no tiene el formato esperado');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                if (errorMessage === "No se puede cambiar el estado de la programación porque el lote asociado está inactivo") {
                    mostrarAlertaError(errorMessage);
                } else if (errorMessage === "No se puede cambiar el estado de la programación porque la actividad asociada está inactiva") {
                    mostrarAlertaError(errorMessage);
                } else if (errorMessage === "No se puede cambiar el estado de la programación porque el usuario asociado está inactivo") {
                    mostrarAlertaError(errorMessage);
                } else {
                    mostrarAlertaError("Error al cambiar el estado de la programación");
                }
            } else {
                mostrarAlertaError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }
        }
    };

    const mostrarAlertaError = (mensaje) => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            text: mensaje,
            showConfirmButton: false,
            timer: 2000
        });
    };

    const handleSubmit = async (formData, e) => {
        e.preventDefault()
        try {
            if (mode === 'create') {
                await axiosClient.post('/registrarProgramacion', formData).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Asignacion registrada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    }
                })
            } else if (mode === 'update') {
                await axiosClient.put(`/actualizarProgramacion/${idProgramacion.id_programacion}`, formData).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó la asignación con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet();
                    } else {
                        throw new Error('Error al actualizar')
                    }
                })
            }
            setModalOpen(false);
        } catch (error) {
            console.log('Error en la solicitud: ', error.message);
            alert('Se produjo un error: ' + error.message);
        }
    }

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
    return (

        <>

            <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
                <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
                <div className='w-full max-w-[90%] ml-28 items-center p-10'>
                    <AccionesModal
                        isOpen={modalAcciones}
                        onClose={() => setModalAcciones(false)}
                        label={mensaje}
                    />
                    <ProgramacionModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title={mode === 'create' ? 'Registrar Asignaciones' : 'Actualizar Asignaciones'}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                        initialData={initialData}
                        handleSubmit={handleSubmit}
                        mode={mode}
                    />
                    <Ejemplo
                        data={data}
                        programaciones={programaciones}
                    />
                </div>
            </div>
        </>
    )
}
