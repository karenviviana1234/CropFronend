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

    function Ejemplo() { /*  */

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
            { name: "Activo", uid: "activo" },
            { name: "Inactivo", uid: "inactivo" },
            { name: "En proceso", uid: "proceso" },
            { name: "Terminado", uid: "terminado" },
        ];

        const hasSearchFilter = Boolean(filterValue);

        const filteredItems = React.useMemo(() => {
            let filteredprogramaciones = programaciones;

            if (hasSearchFilter) {
                filteredprogramaciones = filteredprogramaciones.filter(programacion =>
                    String(programacion.id_programacion).toLowerCase().includes(filterValue.toLowerCase()) ||
                    programacion.usuario.toLowerCase().includes(filterValue.toLowerCase()) ||
                    String(programacion.nombre_actividad).toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                filteredprogramaciones = filteredprogramaciones.filter(programacion =>
                    Array.from(statusFilter).includes(programacion.estado)
                );
            } /* else if (statusFilter === "activo") {
      filteredprogramaciones = filteredprogramaciones.filter(programacion =>
        programacion.estado === "activo"
      );
    } else if (statusFilter === "inactivo") {
      filteredprogramaciones = filteredprogramaciones.filter(programacion =>
        programacion.estado === "inactivo"
      );
    } else if (statusFilter === "proceso") {
      filteredprogramaciones = filteredprogramaciones.filter(programacion =>
        programacion.estado === "proceso"
      );
    } else if (statusFilter === "terminado") {
      filteredprogramaciones = filteredprogramaciones.filter(programacion =>
        programacion.estado === "terminado"
      );
    } */

            return filteredprogramaciones;
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



            const handleUpdateClick = (id_programacion, programacion) => {
                localStorage.setItem('idUser', id_programacion);
                clickEditar(id_programacion, programacion);
                console.log('ID del programacion seleccionado:', id_programacion);
                console.log('Datos del programacion seleccionado:', programacion);
            };
            switch (columnKey) {
                case "estado":
                    return (
                        <Chip className="capitalize" color={statusColorMap[programacion.estado]} size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "actions": /*  */
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
                                        <Button endContent={<ChevronDownIcon className="cursor-pointer text-small text-slate-700" />} variant="flat">
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
                                <Button className="z-1 mr-30 text-white bg-[#006000] cursor-pointer" style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center z-10 mr-40  mt-2">
                            <span className="text-white text-small">Total {programaciones.length} Resultados</span>
                            <label className="flex items-center text-white mr-30 text-small">
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
                    <div className="hidden sm:flex w-[40%] justify-end gap-2 ">
                        <Button isDisabled={pages === 1} size="md" variant="ghost" className="cursor-pointer text-slate-50" onPress={onPreviousPage}>
                            Anterior
                        </Button>
                        <Button isDisabled={pages === 1} size="md" className="cursor-pointer text-slate-50 mr-58" variant="ghost" onPress={onNextPage}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            );
        }, [items.length, page, pages, hasSearchFilter]);

        return (
            <div className="flex items-center justify-center p-5">
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
                            <TableRow key={item.id_programacion}>
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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

    // Trae los datos a la tabla actividad
    const peticionGet = async () => {
        try {
            await axiosClient.get('/listarProgramacion').then((response) => {
                console.log(response.data)
                setProgramaciones(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };
    const data = [
        {
            uid: 'id_programacion',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'fecha_inicio',
            name: 'Fecha Inicio',
            sortable: true
        },
        {
            uid: 'fecha_fin',
            name: 'Fecha Fin',
            sortable: true
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


    const peticionDesactivar = (id_programacion) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus demas tablas!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#006000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axiosClient.put(`/estadoProgramacion/${id_programacion}`, null).then((response) => {
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
                                peticionGet()
                            } else {
                                alert('Error: El mensaje recibido no tiene el formato esperado');
                            }
                        } else {
                            alert('Error');
                        }
                    });
                } catch (error) {
                    alert('Error del servidor ' + error);
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


                await axiosClient.post('/registrarProgramacion', formData).then((response) => {
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
                await axiosClient.put(`/actualizarProgramacion/${idProgramacion.id_programacion}`, formData).then((response) => {
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
                    title={mode === 'create' ? 'Registrar programaciones' : 'Actualizar programaciones'}
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



/* 


import React, { useEffect, useState } from 'react'
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import ProgramacionModal from '../templates/ProgramacionModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organismos/TableProgramacion.jsx';
import Swal from 'sweetalert2';

export function Programacion() {
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [programacion, setProgramacion] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listarProgramacion'
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setProgramacion(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'id_programacion',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'fecha_inicio',
            name: 'Fecha Inicio',
            sortable: true
        },
        {
            uid: 'fecha_fin',
            name: 'Fecha Fin',
            sortable: true
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


    const handleDesactivar = (id_programacion) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus programaciones!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:3000/estadoProgramacion/${id_programacion}`, null, { headers: { token: token } })
                        .then((response) => {
                            if (response.status === 200) {
                                const nuevoEstado = response.data.message;
                                fetchData();
                                Swal.fire({
                                    title: "¡Actualizado!",
                                    text: `${nuevoEstado}`,
                                    icon: "success"
                                });
                            } else {
                                alert('Error al actualizar');
                            }
                        });
                } catch (error) {
                    alert('Error con el servidor');
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

    const id = localStorage.getItem('idUser')

    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm);
        e.preventDefault()

        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/registrarProgramacion'

                await axios.post(postURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        fetchData()
                        Swal.fire({
                            position: "center", 
                            icon: "success",
                            title: "Programación registrada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/actualizarProgramacion/${id}`
                axios.put(updateURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response);

                    if (response.status == 200) {
                        fetchData()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)
        } catch (error) {
            console.log('Error en el servidor ' + error)
            alert('Error, intente de nuevo')
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

                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <ProgramacionModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar lote' : 'Actualizar lote'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                    setModalOpen={setModalOpen}
                />
                <Ejemplo
                    clickDesactivar={handleDesactivar}
                    clickEditar={() => handleToggle('update', id)}
                    clickRegistrar={() => handleToggle('create')}
                    data={data}
                    programaciones={programacion} 
                />
            </div>
        </>
    )
} */