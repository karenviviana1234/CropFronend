//confirmacion yaa
import React from "react";
import '../pages/CssTablas.css'
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

const statusColorMap = {
  activo: "success",
  inactivo: "danger",
  todos: "primary",
};

export default function Ejemplo({ clickEditar, clickDesactivar, clickRegistrar, data, finca }) {

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
    {name: "Activo", uid: "inactivo"},
    {name: "Inactivo", uid: "activo"},
  ];


  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredfinca = finca;

    if (hasSearchFilter) {
      filteredfinca = filteredfinca.filter(finca =>
        String(finca.id_finca).toLowerCase().includes(filterValue.toLowerCase()) ||
        String (finca.nombre_finca).toLowerCase().includes(filterValue.toLowerCase()) 
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredfinca = filteredfinca.filter(finca =>
        Array.from(statusFilter).includes(finca.estado)
      );
    }

    return filteredfinca;
  }, [finca, filterValue, statusFilter]);

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
           <div className="relative flex items-center justify-end gap-2">
              <Dropdown>
                <div className="flex items-center gap-2">
                  <ButtonActualizar onClick={() => handleUpdateClick(finca.id_finca)} />
                  <ButtonDesactivar
                    onClick={() => clickDesactivar(finca.id_finca)}
                    estado={finca.estado}
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
            <Button className="z-1 mr-70 text-white bg-[#006000] " style={{position:'relative'}} endContent={<PlusIcon />} onClick={clickRegistrar}>
              Registrar
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">Total {finca.length} Resultados</span>
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
    wrapper: "max-h-[100%] max-w-[100%]" ,
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
    
  );
} 

