import React, { useContext, useEffect, useState } from 'react'
import UsuarioModal from '../templates/UsuarioModal.jsx';
import './CssTablas.css'
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import UsuarioContext from '../../context/UsuariosContext.jsx';


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
import Header from '../organismos/Header/Header.jsx';

export function Usuarios() {

    const statusColorMap = {
        activo: "success",
        inactivo: "danger",
        todos: "primary",
    };

    function EjemploUsuario() {

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
            let filteredusuarios = usuarios;

            if (hasSearchFilter) {
                filteredusuarios = filteredusuarios.filter(usuario =>
                    String(usuario.identificacion).toLowerCase().includes(filterValue.toLowerCase()) ||
                    usuario.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
                    usuario.apellido.toLowerCase().includes(filterValue.toLowerCase()) ||
                    usuario.correo.toLowerCase().includes(filterValue.toLowerCase()) ||
                    usuario.password.toLowerCase().includes(filterValue.toLowerCase()) ||
                    usuario.rol.toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                filteredusuarios = filteredusuarios.filter(usuario =>
                    Array.from(statusFilter).includes(usuario.estado)
                );
            }
            return filteredusuarios;
        }, [usuarios, filterValue, statusFilter]);

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

        const renderCell = React.useCallback((usuario, columnKey) => {
            const cellValue = usuario[columnKey];

            const handleUpdateClick = (identificacion, usuario) => {
                localStorage.setItem('idUser', identificacion);
                clickEditar(identificacion, usuario);
                console.log('ID del usuario seleccionado:', identificacion);
                console.log('Datos del usuario seleccionado:', usuario);
            };

            switch (columnKey) {
                case "estado":
                    return (
                        <Chip className="capitalize" color={statusColorMap[usuario.estado]} size="sm" variant="flat">
                            {cellValue}
                        </Chip>
                    );
                case "actions": /*  */
                    return (
                        <div className="relative flex justify-start  items-center gap-2">
                            <Dropdown>
                                <div className="flex items-center gap-2">
                                    <ButtonActualizar onClick={() => handleToggle('update', setUsuarioId(usuario))} />
                                    <ButtonDesactivar
                                        onClick={() => peticionDesactivar(usuario.identificacion)}
                                        estado={usuario.estado}
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
                                <Button className="z-1 mr-30 text-white bg-[#006000] " style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center z-10 mr-40  mt-2">
                            <span className="text-white text-small">Total {usuarios.length} Resultados</span>
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
                            <TableRow key={item.identificacion}>
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
    const [usuarios, setusuarios] = useState([]);
    const { idUsuario, setUsuarioId } = useContext(UsuarioContext)
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    useEffect(() => {
        peticionGet()
    }, []);

    const peticionGet = async () => {
        try {
            await axiosClient.get('/usuario/listarUsuarios').then((response) => {
                console.log(response.data)
                setusuarios(response.data)
            })
        } catch (error) {
            console.log('Error en el servidor ' + error)
        }
    };

    const data = [
        {
            uid: 'identificacion',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'nombre',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'apellido',
            name: 'Apellido',
            sortable: true
        },
        {
            uid: 'correo',
            name: 'Correo',
            sortable: true
        },
        {
            uid: 'rol',
            name: 'Rol',
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

    const peticionDesactivar = async (identificacion) => {

        // console.log("ID del usuarios a desactivar:", identificacion);
        try {
            axiosClient.put(`/usuario/desactivarUsuario/${identificacion}`, null).then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    const nuevoEstado = response.data.message;
                    /* fetchData() */
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¡Esto podra afectar a tus usuarios!",
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

    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault()

        try {

            if (mode === 'create') {
                /*  if (!formData.nombre || !formData.longitud || !formData.latitud || !formData.fk_id_finca) {
                     alert('Por favor complete todos los campos requeridos');
                     return;
                 } */
                await axiosClient.post('/usuario/registrarEmple', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Usuario registrado con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error en el registro')
                    }
                })
            } else if (mode === 'update') {

                await axiosClient.put(`/usuario/actualizarUsuario/${idUsuario.identificacion}`, formData).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito el usuario",
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
                    <UsuarioModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title={mode === 'create' ? 'Registrar usuario' : 'Actualizar usuario'}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                        initialData={initialData}
                        handleSubmit={handleSubmit}
                        mode={mode}
                    />
                    <EjemploUsuario
                        data={data}
                        usuarios={usuarios}
                    />
                </div>
            </div>
        </>
    )
}
