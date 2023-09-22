import React, { useMemo, useState , useEffect, useRef} from 'react'; 
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import personData from '../../DATA.json';

const RowSelectionTable = ({columns}) => {
  const data = useMemo(() => personData, []); // Using useMemo to memoize data
  const [sorting,setSorting] = useState([]);
  const [filtering,setFiltering] = useState('');
  const [selectedRowData,setSelectedRowData] = useState({});

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
    onGlobalFilterChange: setFiltering,
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
    <div className="table">
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

export default RowSelectionTable;