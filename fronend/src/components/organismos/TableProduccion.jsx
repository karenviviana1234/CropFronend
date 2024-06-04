import React from "react";
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

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  todos: "primary",
};

export default function Ejemplo({ clickEditar, clickDesactivar, clickRegistrar, data, producciones }) {

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
    let filteredproducciones = producciones;

    if (hasSearchFilter) {
      filteredproducciones = filteredproducciones.filter(produccion =>
        String(produccion.id_produccion).toLowerCase().includes(filterValue.toLowerCase()) ||
        produccion.cantidad_produccion.toLowerCase().includes(filterValue.toLowerCase()) ||
        produccion.precio.toLowerCase().includes(filterValue.toLowerCase()) ||
        String(produccion.fk_id_programacion).toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredproducciones = filteredproducciones.filter(produccion =>
        Array.from(statusFilter).includes(produccion.estado)
      );
    }

    return filteredproducciones;
  }, [producciones, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((produccion, columnKey) => {
    const cellValue = produccion[columnKey];


    const handleUpdateClick = (id_produccion, produccion) => {
      localStorage.setItem('idUser', id_produccion);
      clickEditar(id_produccion, produccion);
      console.log('ID del produccion seleccionado:', id_produccion);
      console.log('Datos del produccion seleccionado:', produccion);
    };



    switch (columnKey) {
      case "estado":
        return (
          <Chip className="capitalize" color={statusColorMap[produccion.estado]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions": /*  */
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <div className="flex items-center gap-2">
                <ButtonActualizar onClick={() => handleUpdateClick(produccion.id_produccion, produccion)} />
                <ButtonDesactivar
                  onClick={() => clickDesactivar(produccion.id_produccion)}
                  estado={produccion.estado}
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
              <Button className="z-1 mr-40 text-white bg-[#006000] " style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={clickRegistrar}>
                Registrar
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center z-10 mr-40  mt-2">
            <span className="text-white text-small">Total {producciones.length} Resultados</span>
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
      <div className="py-2 px-2 flex justify-between items-center m-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2 ">
          <Button isDisabled={pages === 1} size="md" variant="flat" className="text-black bg-[#f4f4f5]" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="md" className="text-black bg-[#f4f4f5]" variant="flat" onPress={onNextPage}>
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
          wrapper: "max-h-[90%] max-w-[90%]",
        }}
        className="flex"
        // selectedKeys={selectedKeys}
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