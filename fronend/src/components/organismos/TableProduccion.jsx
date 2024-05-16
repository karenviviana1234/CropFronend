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
  Dropdown,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./../NextUI/PlusIcon.jsx";
import { SearchIcon } from "./../NextUI/SearchIcon.jsx";
import ButtonActualizar from "../atomos/ButtonActualizar.jsx";


export default function EjemploProduccion({
  clickEditar,
  clickRegistrar,
  data,
  produccion,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "fecha",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);


  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProduccion = produccion;

    if (hasSearchFilter) {
      filteredProduccion = filteredProduccion.filter(
        (produccion) =>
          String(produccion.id_produccion).toLowerCase().includes(filterValue.toLowerCase()) ||
          String(produccion.cantidad_produccion).toLowerCase().includes(filterValue.toLowerCase())
              );
    }

  
    return filteredProduccion;
  }, [produccion, filterValue]);

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

    const handleUpdateClick = (id) => {
      localStorage.setItem("idUser", id);
      clickEditar(id);
    };

    switch (columnKey) {

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <div className="flex items-center gap-2">
                <ButtonActualizar
                  onClick={() => handleUpdateClick(produccion.id_produccion)}
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

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Buscar..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3 ">
        
              <Button className="z-1 mr-40 text-white bg-[#006000] " style={{position:'relative'}} endContent={<PlusIcon />} onClick={clickRegistrar}>
                Registrar
              </Button>
            </div>
          </div>
          <div  className="flex justify-between items-center z-10 mr-40  mt-2">
            <span className="text-white text-small">
              Total {produccion.length} Produccion
            </span>
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
  }, [filterValue, onRowsPerPageChange, onSearchChange, onClear, hasSearchFilter]);

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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="flex items-center justify-center p-5">
      <Table
        aria-label="Tabla"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[90%] max-w-[90%] ",
        }}
        className="flex"
        // selectedKeys={selectedKeys}
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
          emptyContent={"No hay produccion registrados"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id_produccion}>
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
