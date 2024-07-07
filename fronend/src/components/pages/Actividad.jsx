import React, { useContext, useEffect, useState } from 'react'
import ActividadModal from '../templates/ActividadModal.jsx'
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import ActividadesContext from '../../context/ActividadContext.jsx';
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

export function Actividades() {
    const statusColorMap = {
        activo: "success",
        inactivo: "danger",
        proceso: "warning", // Cambiado a otro color (p. ej., warning)
        terminado: "info", // Cambiado a otro color (p. ej., info)
        todos: "primary",

    };

    function Ejemplo() {
        const [filterValue, setFilterValue] = React.useState("");
        const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
        const [statusFilter, setStatusFilter] = React.useState(new Set(["todos"]));
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [sortDescriptor, setSortDescriptor] = React.useState({
            column: "fecha",
            direction: "ascending",
        });
        const [page, setPage] = React.useState(1);

        const statusOptions = [
            { name: "Todos", uid: "todos" },
            { name: "Activo", uid: "inactivo" },
            { name: "Proceso", uid: "proceso" },
            { name: "Terminado", uid: "terminado" },
            { name: "Inactivo", uid: "activo" },
        ];

        const hasSearchFilter = Boolean(filterValue);

        const filteredItems = React.useMemo(() => {
            let filteredActividad = actividades;

            if (hasSearchFilter) {
                filteredActividad = filteredActividad.filter(
                    (actividad) =>
                        String(actividad.id_actividad)
                            .toLowerCase()
                            .includes(filterValue.toLowerCase()) ||
                        String(actividad.nombre_actividad)
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter.size !== statusOptions.length) {
                if (statusFilter.has("todos")) {
                    // Mostrar todas las actividades si "Todos" está seleccionado
                    return filteredActividad;
                } else {
                    // Filtrar por estado si se selecciona un estado específico
                    filteredActividad = filteredActividad.filter((actividad) =>
                        statusFilter.has(actividad.estado)
                    );
                }
            }

            return filteredActividad;
        }, [actividades, filterValue, statusFilter, statusOptions]);


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

        const renderCell = React.useCallback((actividad, columnKey) => {
            const cellValue = actividad[columnKey];

            const handleUpdateClick = (id) => {
                localStorage.setItem("idUser", id);
                clickEditar(id);
            };

            switch (columnKey) {
                case "estado":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap[actividad.estado]}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue}
                        </Chip>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center justify-end gap-2">
                            <Dropdown>
                                <div className="flex items-center gap-2">
                                    <ButtonActualizar
                                        onClick={() => handleToggle('update', setActividadId(actividad))} />
                                    <ButtonDesactivar
                                        onClick={() => peticionDesactivar(actividad.id_actividad)}
                                        estado={actividad.estado}
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
            setStatusFilter(new Set(selectedKeys));
        };

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
                                        selectedKeys={[...statusFilter]}
                                        selectionMode="multiple"
                                        onSelectionChange={onStatusFilter}
                                    >
                                        {statusOptions.map((status) => (
                                            <DropdownItem key={status.uid} className="capitalize">
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
                            <span className="text-default-400 text-small">
                                Total {actividades.length} actividad
                            </span>
                            <label className="flex items-center text-default-400 text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-default-400 text-small"
                                    onChange={onRowsPerPageChange}
                                >
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </>
            );
        }, [filterValue, onRowsPerPageChange, onSearchChange, onClear, hasSearchFilter]);

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
                    selectedKeys={selectedKeys}
                    /* selectionMode="multiple" */
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
                    <TableBody
                        emptyContent={"No hay actividad registrados"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id_actividad}>
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            </div>
        );
    }

    /* Espacio 1 */
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [mensaje, setMensaje] = useState('')
    const [actividades, setActividades] = useState([]);
    const { idActividad, setActividadId } = useContext(ActividadesContext)
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };


    useEffect(() => {
        peticionGet()
    }, []);

    // Trae los datos a la tabla actividad
    const peticionGet = async () => {
        try {
            await axiosClient.get('/listara').then((response) => {
                console.log(response.data)
                setActividades(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };


    // columnas de la tabla actividades
    const data = [
        {
            uid: 'id_actividad',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'nombre_actividad',
            name: 'actividad',
            sortable: true
        },
        {
            uid: 'tiempo',
            name: 'tiempo',
            sortable: true
        },
        {
            uid: 'observaciones',
            name: 'observaciones',
            sortable: true
        },
        {
            uid: 'valor_actividad',
            name: 'valor_actividad',
            sortable: true
        },
        {
            uid: 'nombre_variedad',
            name: 'variedad',
            sortable: true
        },
        {
            uid: 'nombre_recursos',
            name: 'herramientas',
            sortable: true
        },
        {
            uid: 'observacion',
            name: 'observacion',
            sortable: true
        },
        {
            uid: 'estado',
            name: 'estado',
            sortable: true
        },
        {
            uid: 'actions',
            name: 'Acciones',
            sortable: true
        }
    ];
    const peticionDesactivar = (id_actividad) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus demás tablas!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#006000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axiosClient.put(`/Desactivara/actividad/${id_actividad}`, null).then((response) => {
                        console.log(response.data);
                        const mensaje = response.data.message;
                        if (response.status === 200) {
                            const index = mensaje.indexOf('cambiado a');
                            if (index !== -1) {
                                const nuevoEstado = mensaje.substring(index + 10); // 10 es la longitud de "cambiado a "
    
                                Swal.fire({
                                    position: "center", // Posición centrada
                                    icon: "success",
                                    title: `Estado de la actividad cambiado a ${nuevoEstado}`,
                                    showConfirmButton: false,
                                    timer: 1400
                                });
                                peticionGet();
                            } else {
                                alert('Error: El mensaje recibido no tiene el formato esperado');
                            }
                        } else {
                            alert('Error');
                        }
                    }).catch((error) => {
                        if (error.response && error.response.data && error.response.data.message) {
                            const errorMessage = error.response.data.message;
                            if (errorMessage.includes("La actividad no puede cambiar de estado porque la variedad asociada está inactiva")) {
                                Swal.fire({
                                    position: "center",
                                    icon: "error",
                                    title: "Error",
                                    text: "La actividad no puede cambiar de estado porque la variedad asociada está inactiva",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            } else {
                                Swal.fire({
                                    position: "center",
                                    icon: "error",
                                    title: "Error",
                                    text: "Error al cambiar el estado de la actividad",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Error",
                                text: "Error del servidor. Por favor, inténtelo de nuevo más tarde.",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    });
                } catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error",
                        text: "Error del servidor. Por favor, inténtelo de nuevo más tarde.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                Swal.fire({
                    title: "Cancelado",
                    text: "La operación ha sido cancelada",
                    icon: "info"
                });
            }
        });
    };
    
    // registrar y actualizar actividad
    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault()
        try {
            if (mode === 'create') {


                await axiosClient.post('/Registrara', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Actividad registrada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    }
                })
            } else if (mode === 'update') {
                await axiosClient.put(`/Actualizara/actividad/${idActividad.id_actividad}`, formData).then((response) => {
                    console.log(response);

                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó la actividad con éxito",
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
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
            <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
            <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <ActividadModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar actividades' : 'Actualizar actividades'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                />
                <Ejemplo
                    data={data}
                    actividades={actividades}
                />
            </div>
            </div>
        </>
    )
}
