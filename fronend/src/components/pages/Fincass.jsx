import React, { useState, useEffect, useContext } from 'react';
/* import { Header } from '../molecules/Header.jsx'; */
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import FincasModal from '../templates/FincaModal.jsx';
import axiosClient from '../axiosClient.js';
import './CssTablas.css'
import FincasContext from '../../context/FincaContext.jsx';
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
import DescargarPDF from '../organismos/DescargarPDF.jsx';
export function Fincas() {

  const statusColorMap = {
    activo: "success",
    inactivo: "danger",
  };

  function Ejemplo() {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "fecha",
      direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const statusOptions = [
      { name: "Todos", uid: "todos" },
      { name: "Activo", uid: "activo" },
      { name: "Inactivo", uid: "inactivo" },
  ];

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
      let filteredfinca = fincas;

      if (hasSearchFilter) {
        filteredfinca = filteredfinca.filter(finca =>
          String(finca.id_finca).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(finca.nombre_finca).toLowerCase().includes(filterValue.toLowerCase())
        );
      }

      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredfinca = filteredfinca.filter(finca =>
          Array.from(statusFilter).includes(finca.estado)
        );
      }

      return filteredfinca;
    }, [fincas, filterValue, statusFilter]);

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

    const renderCell = React.useCallback((finca, columnKey) => {
      const cellValue = finca[columnKey];


      const handleUpdateClick = (id) => {

        localStorage.setItem('idUser', id)
        clickEditar(id)
      };

      switch (columnKey) {
        case "estado":
          return (
            <Chip className="capitalize" color={statusColorMap[finca.estado]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-start gap-2">
              <Dropdown>
                <div className="flex items-center gap-2">
                  <ButtonActualizar
                    onClick={() => handleToggle('update', setFincaId(finca))} />
                  <ButtonDesactivar
                    onClick={() => peticionDesactivar(finca.id_finca)}
                    estado={finca.estado}
                  />
                  <DescargarPDF/>
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
<<<<<<< HEAD
                <Button className="z-1 text-white bg-[#006000] " style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
=======
                <Button className="z-1 mr-40 text-white bg-[#006000] " style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
>>>>>>> devdfg
                  Registrar
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-default-400 text-small">Total {fincas.length} Resultados</span>
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
      <div className="flex items-center justify-center p-4 w-full">
                <div className="w-6/12 sm:w-full  lg:w-11/12 xl:w-9/12 overflow-x-auto">
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
              <TableRow key={item.id_finca}>
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
  const [modalAcciones, setModalAcciones] = useState(false)
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [mensaje, setMensaje] = useState('')
  const [fincas, setFincas] = useState([]);
  const { idFinca, setFincaId } = useContext(FincasContext)
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

  useEffect(() => {

    peticionGet();

  }, []);

  //PETICION GET PARA TRAER LOS DATOS DE LAS FINCAS REGISTRADAS

  const peticionGet = async () => {
    try {
      await axiosClient.get('/finca/listarFinca').then((response) => {
        console.log(response.data)
        setFincas(response.data)
      })

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };


  //COLUMNAS DEL DATA_TABLE

  const data = [
    {
        uid: 'id_finca',
        name: 'Id',  // El titulo de los id
        sortable: true
    },
    {
        uid: 'nombre_finca',
        name: 'Nombre finca',
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

  //PETICION PARA DESACTIVAR FINCAS    
  const peticionDesactivar = async (id_finca) => {

    // console.log("ID del lotes a desactivar:", id_lote);
    try {
      axiosClient.put(`/finca/desactivarFinca/${id_finca}`, null).then((response) => {
        console.log(response.data)
        if (response.status == 200) {
          const nuevoEstado = response.data.message;
          /* fetchData() */
          Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podra afectar a tus fincas!",
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

  //PETICION PARA ACTIVAR FINCAS
  const handleSubmit = async (formData, e) => {
    console.log('Datos enviados:', formData);
    e.preventDefault()


    try {

      if (mode === 'create') {
        await axiosClient.post('/finca/RegistroFinca', formData).then((response) => {
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

        await axiosClient.put(`/finca/actualizarFinca/${idFinca.id_finca}`, formData).then((response) => {
          console.log(response);
          if (response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se actualizó con éxito la finca",
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
<<<<<<< HEAD
            <div className='w-full max-w-[90%] ml-32 items-center p-10'>
=======
>>>>>>> devdfg

            <AccionesModal
                isOpen={modalAcciones}
                onClose={() => setModalAcciones(false)}
                label={mensaje}
            />
            <FincasModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={mode === 'create' ? 'Registrar Finca' : 'Actualizar Finca'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
            />
            <Ejemplo
                data={data}
                fincas={fincas}
            />
        </div>
        </div>
    </>
)
}