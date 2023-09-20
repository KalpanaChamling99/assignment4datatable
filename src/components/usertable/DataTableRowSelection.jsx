import React, { useMemo, useState } from 'react'; // Correct the import statements
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import personData from '../../DATA.json';
const columns = [
 
  // {
 //   header: 'Name',
 //   accessorFn: row => `${row.first_name} ${row.last_name}`
 // // },
 // {
 //   header: 'First Name',
 //   accessorKey: 'first_name',
 // },
 // {
 //   header: 'Last Name', 
 //   accessorKey: 'last_name',
 // },
 {
   header: 'Name',
   columns:[
     {
       header: 'First',
       accessorKey: 'first_name',
     },
     {
       header: 'Last', 
       accessorKey: 'last_name',
     },
   ]
 },
 {
   header: 'Email',
   accessorKey: 'email',
 },
 {
   header: 'Status',
   accessorKey: 'marital_status',
 },
];
const DataTableRowSelection = () => {
  const data = useMemo(() => personData, []); // Using useMemo to memoize data
  const [sorting,setSorting] = useState([]);
  const [filtering,setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state:{
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  });
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
        <button key={i} onClick={() => table.setPageIndex(i)}>
            {i + 1}
        </button>
    );
  }

  return (
    <div className="basic-table">
      <h2>Row Selection</h2>
      <div>
        <input 
          type="text" 
          value={filtering} 
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table border='1' cellSpacing='0' cellPadding='10'> {/* Correct the attribute names */}
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null :(
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className='pl-1 d-none'>
                        {
                          {asc: 'a',desc:'d'}[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-3'>
        <button onClick={()=> table.setPageIndex(0)}>first</button>
        <button 
          disabled={!table.getCanPreviousPage()}
          onClick={()=>table.previousPage()}
        >
          prev
        </button>

        <button 
          onClick={()=>table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          next
        </button>
        <button onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>last</button>
         {/* <div>{paginationButtons.map((pageCount) => pageCount)}</div> */}
      </div>
    </div>
  );
}

export default DataTableRowSelection;