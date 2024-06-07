import React, { useContext, useEffect, useState } from 'react'
import costossModal from '../templates/CostosModal.jsx';
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import costosContext from '../../context/CostosContext.jsx';
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
import ButtonDesactivar from "../atomos/ButtonDesactivar.jsx"
import ButtonActualizar from "../atomos/ButtonActualizar.jsx"
import CostosModal from '../templates/CostosModal.jsx';

export function Costos() {

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
            let filteredcostos = costos;

            if (hasSearchFilter) {
                filteredcostos = filteredcostos.filter(costo =>
                    String(costo.id_costos).toLowerCase().includes(filterValue.toLowerCase()) ||
                    String(costo.nombre_recursos).toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                filteredcostos = filteredcostos.filter(costo =>
                    Array.from(statusFilter).includes(costo.estado)
                );
            }

            return filteredcostos;
        }, [costos, filterValue, statusFilter]);

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

        const renderCell = React.useCallback((costos, columnKey) => {
            const cellValue = costos[columnKey];


            const handleUpdateClick = (id_costos, costo) => {
                localStorage.setItem('idUser', id_costos);
                clickEditar(id_costos, costos);
                console.log('ID del costo seleccionado:', id_costos);
                console.log('Datos del costo seleccionado:', costo);
            };

            switch (columnKey) {
                case "estado":
                    return (
                        <Chip className="capitalize" color={statusColorMap[costos.estado]} size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "actions": /*  */
                    return (
                        <div className="relative flex justify-end items-center gap-2">
                            <Dropdown>
                                <div className="flex items-center gap-2">
                                    <ButtonActualizar onClick={() => handleToggle('update', setCostoId(costos))} />
                                    <ButtonDesactivar
                                        onClick={() => peticionDesactivar(costos.id_costos)}
                                        estado={costos.estado}
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
                                        <Button endContent={<ChevronDownIcon className="text-small text-black cursor-pointer" />} variant="shadow">
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
                        <div className="flex items-center justify-between">
                            <span className="text-white text-small">Total {costos.length} Resultados</span>
                            <label className="flex items-center text-white mr-30 text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-white text-small"
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
                        <Button isDisabled={pages === 1} size="md" variant="shadow" className="cursor-pointer text-black" onPress={onPreviousPage}>
                            Anterior
                        </Button>
                        <Button isDisabled={pages === 1} size="md" className="cursor-pointer text-black mr-58" variant="shadow" onPress={onNextPage}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            );
        }, [items.length, page, pages, hasSearchFilter]);

        return (
            <div className="flex items-center justify-center p-4 w-full">

            <div className="w-6/12 sm:w-full  lg:w-11/12 xl:w-9/12">
                <Table
                    aria-label="Tabla"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[100%] max-w-[100%]",
                    }}
                    className="flex mt-24"
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
                            <TableRow key={item.id_costos}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
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
    const [costos, setCostos] = useState([]);
    const { idCosto, setCostoId } = useContext(costosContext)

    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };
    useEffect(() => {
        peticionGet()
    }, []);

    // Trae los datos a la tabla Costo
    const peticionGet = async () => {
        try {
            await axiosClient.get('/listarCostos').then((response) => {
                console.log(response.data)
                setCostos(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };

    // columnas de la tabla Costos
    const data = [
        {
            uid: 'id_costos',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'precio',
            name: 'Precio',
            sortable: true
        },
        {
            uid: 'nombre_recursos',
            name: 'Nombre Recursos',
            sortable: true
        },
        {
            uid: 'cantidad_medida',
            name: 'Cantidad Medida',
            sortable: true
        },
        {
            uid: 'unidades_medida',
            name: 'Unidades Medida',
            sortable: true
        },
        {
            uid: 'extras',
            name: 'Extras',
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
    // desactivar Costo
    const peticionDesactivar = async (id_costos) => {

        // console.log("ID del Costos a desactivar:", id_Costo);
        try {
            axiosClient.put(`/desactivarCostos/${id_costos}`, null).then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    const nuevoEstado = response.data.message;
                    /* fetchData() */
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¡Esto podra afectar a tus costos!",
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

    // registrar y actualizar costos
    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault()

        try {

            if (mode === 'create') {
                await axiosClient.post('/registrarCostos', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Costo registrado con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error en el registro')
                    }
                })
            } else if (mode === 'update') {

                await axiosClient.put(`/actualizarCostos/${idCosto.id_costos}`, formData).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito el Costo",
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
                <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
                    <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
                    <div className='w-full max-w-[90%] ml-28 items-center p-10'>

                    <AccionesModal
                        isOpen={modalAcciones}
                        onClose={() => setModalAcciones(false)}
                        label={mensaje}
                    />
                    <CostosModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title={mode === 'create' ? 'Registrar Costos' : 'Actualizar Costos'}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                        initialData={initialData}
                        handleSubmit={handleSubmit}
                        mode={mode}
                    />
                    <Ejemplo
                        data={data}
                        Costos={Costos}
                    />
                </div>
            </div>
        </>
    )
}
/* import React, { useEffect, useState } from 'react'
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import CostosModal from '../templates/CostosModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organismos/TableCostos.jsx';
import Swal from 'sweetalert2';

export function Costos() {
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };
    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [costos, setCostos] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listarCostos'
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setCostos(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'id_costos',
            name: 'Id',  
            sortable: true
        },
        {
            uid: 'precio',
            name: 'Precio',
            sortable: true
        },
        {
            uid: 'nombre_recursos',
            name: 'Nombre Recursos',
            sortable: true
        },
        {
            uid: 'cantidad_medida',
            name: 'Cantidad Medida',
            sortable: true
        },
        {
            uid: 'unidades_medida',
            name: 'Unidades Medida',
            sortable: true
        },
        {
            uid: 'extras',
            name: 'Extras',
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

    const handleDesactivar = (id_costos) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus costos!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:3000/desactivarCostos/${id_costos}`, null, { headers: { token: token } })
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
                const postURL = 'http://localhost:3000/registrarCostos'

                await axios.post(postURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        setMensaje('costo registrado con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
                        fetchData()
                    }
                })
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/actualizarCostos/${id_costos}`
                axios.put(updateURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response);

                    if (response.status == 200) {
                        setMensaje('Se actualizó el costo con éxito')
                        setModalAcciones(true)
                        setModalOpen(false)
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
                <CostosModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar Costo' : 'Actualizar Costo'}
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
                    costos={costos}
                />
            </div>
        </>
    )
} */