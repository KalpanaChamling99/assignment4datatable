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

const ShowSelectedRowTable = ({columns}) => {
  const data = useMemo(() => personData, []); // Using useMemo to memoize data
  const [sorting,setSorting] = useState([]);
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
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="table">
      <h2>Show Selected Row</h2>
      <table border='1' cellSpacing='0' cellPadding='10'> 
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

      <div className='selected-row-section mt-3'>
        <button
          className="border rounded p-2 mb-2"
          onClick={ (e) => setSelectedRowData(table.getSelectedRowModel().flatRows) }
        >
          Show Selected Row
        </button>
          {selectedRowData.length > 0 ?
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Marital Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedRowData.map(item => (
                  <tr>
                    <td>{item.original['first_name']}  {item.original['last_name']}</td>
                    <td>{item.original['marital_status']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          :
            <div>Rows are not selected</div>
          }
        </div>

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
      </div>

    </div>
  );
}

export default ShowSelectedRowTable;