import React, { useContext, useEffect, useState } from 'react'
import LotesModal from '../templates/TipoRModal.jsx';
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import TipoRecursosContext from '../../context/TipoRContext.jsx';
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
import TipoRModal from '../templates/TipoRModal.jsx';

export function TipoRecursos() {

    const statusColorMap = {
        existente: "success",
        gastada_o: "danger",
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
            { name: "Gastada_o", uid: "gastada_o" },
            { name: "Existente", uid: "existente" },
        ];


        const hasSearchFilter = Boolean(filterValue);

        const filteredItems = React.useMemo(() => {
            let filteredtipo_recursos = tipoRecursos;

            if (hasSearchFilter) {
                filteredtipo_recursos = filteredtipo_recursos.filter(tipo_recursos =>
                    String(tipo_recursos.nombre_recursos).toLowerCase().includes(filterValue.toLowerCase()) ||
                    String(tipo_recursos.unidades_medida).toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                filteredtipo_recursos = filteredtipo_recursos.filter(tipo_recursos =>
                    Array.from(statusFilter).includes(tipo_recursos.estado)
                );
            }

            return filteredtipo_recursos;
        }, [tipoRecursos, filterValue, statusFilter]);

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



    
        const renderCell = React.useCallback((tipo_recursos, columnKey) => {
            const cellValue = tipo_recursos[columnKey];


            switch (columnKey) {
                case "estado":
                    return (
                        <Chip className="capitalize" color={statusColorMap[tipo_recursos.estado]} size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center justify-end gap-2">
                            <Dropdown>
                                <div className="flex items-center gap-2">
                                    <ButtonActualizar onClick={() => handleToggle('update', setTipoRecursoId(tipo_recursos))} />
                                    <ButtonDesactivar
                                        onClick={() => peticionDesactivar(tipo_recursos.id_tipo_recursos)}
                                        estado={tipo_recursos.estado}
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
                            <span className="text-default-400 text-small">Total {tipoRecursos.length} Resultados</span>
                            <label className="flex items-center text-default-400 text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-default-400 text-small"
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
                        <Button isDisabled={pages === 1} size="md" variant="ghost" className="text-slate-50" onPress={onPreviousPage}>
                            Anterior
                        </Button>
                        <Button isDisabled={pages === 1} size="md" className="text-slate-50 mr-50" variant="ghost" onPress={onNextPage}>
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
                    //selectionMode="multiple"
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
                            <TableRow key={item.id_tipo_recursos}>
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
    const [tipoRecursos, setTipoRecursos] = useState([]);
    const { idTipoRecurso, setTipoRecursoId } = useContext(TipoRecursosContext)
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };


    useEffect(() => {
        peticionGet()
    }, []);

    // Trae los datos a la tabla tipo recurso
    const peticionGet = async () => {
        try {
            await axiosClient.get('/listarRecurso').then((response) => {
                console.log(response.data)
                setTipoRecursos(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };
    const data = [
        {
            uid: 'id_tipo_recursos',
            name: 'Id',  // El titulo de los id
            sortable: true
        },
        {
            uid: 'nombre_recursos',
            name: 'Nombre recursos',
            sortable: true
        },
        {
            uid: 'cantidad_medida',
            name: 'Cantidad',
            sortable: true
        },
        {
            uid: 'unidades_medida',
            name: 'Unidades',
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

    // desactivar tipo recurso
    const peticionDesactivar = async (id_tipo_recursos) => {

        // console.log("ID del lotes a desactivar:", id);
        try {
            axiosClient.put(`/desactivarRecurso/${id_tipo_recursos}`, null).then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    const nuevoEstado = response.data.message;
                    /* fetchData() */
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¡Esto podra afectar a tus tipo de recurso!",
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
                await axiosClient.post('/RegistroRecurso', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Tipo de recurso registrado con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error en el registro')
                    }
                })
            } else if (mode === 'update') {

                await axiosClient.put(`/actualizarRecurso/${idTipoRecurso.id_tipo_recursos}`, formData).then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito el tipo de recurso",
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
                <TipoRModal
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
                    tipoRecursos={tipoRecursos}
                />
            </div>
            </div>
        </>
    )
}

export default TipoRecursos;