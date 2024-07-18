import React, { useContext, useEffect, useState } from 'react'
import VariedadesModal from '../templates/VariedadesModal.jsx'
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import VariedadesContext from '../../context/VariedadContext.jsx';
import Header from '../organismos/Header/Header.jsx';
import TabsGreen from '../moleculas/Tabs.jsx';
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

export function Variedades() {

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
            let filteredvariedades = variedades;

            if (hasSearchFilter) {
                filteredvariedades = filteredvariedades.filter(variedad =>
                    String(variedad.id_variedad).toLowerCase().includes(filterValue.toLowerCase()) ||
                    variedad.nombre_variedad.toLowerCase().includes(filterValue.toLowerCase()) ||
                    variedad.tipo_cultivo.toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                filteredvariedades = filteredvariedades.filter(variedad =>
                    Array.from(statusFilter).includes(variedad.estado)
                );
            }

            return filteredvariedades;
        }, [variedades, filterValue, statusFilter]);

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

        const renderCell = React.useCallback((variedad, columnKey) => {
            const cellValue = variedad[columnKey];


            const handleUpdateClick = (id_variedad, variedad) => {
                localStorage.setItem('idUser', id_lote);
                clickEditar(id_lote, variedad);
                console.log('ID de la variedadseleccionada:', id_variedad);
                console.log('Datos de la variedad seleccionada:', variedad);
            };


            switch (columnKey) {
                case "estado":
                    return (
                        <Chip className="capitalize" color={statusColorMap[variedad.estado]} size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "actions": /*  */
                    return (
                        <div className="relative flex justify-start  items-center gap-2">
                            <Dropdown>
                                <div className="flex items-center gap-2">
                                    <ButtonActualizar onClick={() => handleToggle('update', setVariedadId(variedad))} />
                                    <ButtonDesactivar
                                        onClick={() => peticionDesactivar(variedad.id_variedad)}
                                        estado={variedad.estado}
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
                                <Button className="z-1 text-white bg-[#006000] " style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-default-400 text-small">Total {variedades.length} Resultados</span>
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
                        <div className='flex justify-normal'>
                        <TabsGreen label="Finca" href="/Finca" />
                            <TabsGreen label="Lote" href="/Lote" />
                            <TabsGreen label="Cultivos" href="/Cultivos" />
                            <TabsGreen label="Variedad" href="/Variedad" />
                            <TabsGreen label="Recursos" href="/Recursos" />
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
            <div className="flex items-center justify-center p-4 w-full">
                <div className="w-6/12 sm:w-full  lg:w-11/12 xl:w-8/12 overflow-x-auto">
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
                    <TableBody emptyContent={"No hay variedades registradas"} items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.id_variedad}>
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
    const [variedades, setVariedades] = useState([]);
    const { idVariedad, setVariedadId } = useContext(VariedadesContext)
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    useEffect(() => {
        peticionGet()
    }, []);

    // Trae los datos a la tabla lote
    const peticionGet = async () => {
        try {
            await axiosClient.get('/listarVariedades').then((response) => {
                console.log(response.data)
                setVariedades(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };

    // columnas de la tabla variedades
    const data = [
        {
            uid: 'id_variedad',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'nombre_variedad',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'tipo_cultivo',
            name: 'Tipo Cultivo',
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
    // desactivar variedad
    const peticionDesactivar = async (id_variedad) => {
        try {
            const response = await axiosClient.put(`/desactivarvariedad/${id_variedad}`, null);
            console.log(response.data);
            if (response.status === 200) {
                const nuevoEstado = response.data.message;
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Esto podrá afectar a tus variedades!",
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
                        // Si el usuario cancela, mostrar el mensaje de cancelación
                        Swal.fire({
                            title: "Cancelado",
                            text: "La operación ha sido cancelada",
                            icon: "info"
                        });
                    }
                });
            } else {
                alert('Error, el mensaje recibido no tiene el formato esperado');
            }
        } catch (error) {
            alert('Error del servidor ' + error);
        }
    };


    // registrar y actualizar variedad
    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault()

        try {

            if (mode === 'create') {
                await axiosClient.post('/registrarVariedad', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Variedad registrada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error en el registro')
                    }
                })
            } else if (mode === 'update') {

                await axiosClient.put(`/actualizarVariedad/${idVariedad.id_variedad}`, formData).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito la variedad",
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
                    <VariedadesModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title={mode === 'create' ? 'Registrar variedades' : 'Actualizar variedades'}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                        initialData={initialData}
                        handleSubmit={handleSubmit}
                        mode={mode}
                    />
                    <Ejemplo
                        data={data}
                        variedades={variedades}
                    />
                </div>
            </div>
        </>
    )
}
/* import React, { useEffect, useState } from 'react'
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import VariedadesModal from '../templates/VariedadesModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organismos/TableVariedad.jsx';
import Swal from 'sweetalert2';

export function Variedades() {
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    
    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [variedades, setVariedades] = useState([])
    const [idVariedad, setIdVariedad] = useState(null); 

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listarVariedades'
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setVariedades(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'id_variedad',
            name: 'Id', 
            sortable: true
        },
        {
            uid: 'nombre_variedad',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'tipo_cultivo',
            name: 'Tipo Cultivo',
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

    const handleDesactivar = (id_variedad) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus variedades!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:3000/desactivarvariedad/${id_variedad}`, null, { headers: { token: token } })
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


    const handleSubmit = async (datosForm, e) => {
        e.preventDefault();

        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/registrarVariedad'

                await axios.post(postURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        fetchData()
                        Swal.fire({
                            position: "center", 
                            icon: "success",
                            title: "Variedad registrado con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
            else if (mode === 'update') {
                const updateURL = `http://localhost:3000/actualizarVariedad/${idVariedad}`;
                axios.put(updateURL, datosForm, { headers: { token: token } }).then((response) => {
                    if (response.status === 200) {
                        fetchData();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito la variedad",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        alert('Error al actualizar');
                    }
                });
            }
            setModalOpen(false);
        } catch (error) {
            console.log('Error en el servidor ' + error);
            alert('Error, intente de nuevo');
        }
    };


    const handleToggle = (mode, initialData, id_variedad) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
        setIdVariedad(id_variedad);
    };

    return (
        <>
            <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
                <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />

                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <VariedadesModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar variedad' : 'Actualizar variedad'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                    setModalOpen={setModalOpen}
                />
                <Ejemplo
                    clickDesactivar={handleDesactivar}
                    clickEditar={(id_variedad) => handleToggle('update', null, id_variedad)}
                    clickRegistrar={() => handleToggle('create', null, null)}
                    data={data}
                    variedades={variedades}
                />
            </div>
        </>
    )
} */