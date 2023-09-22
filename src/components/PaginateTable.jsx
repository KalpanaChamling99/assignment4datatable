import React, { useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table'
import peopleData from '../DATA.json';

const columnHelper = createColumnHelper();

const columns =[
  columnHelper.accessor('id',{
    cell: info => info.getValue(),
    header: () => <>People ID</>
  }),
  columnHelper.accessor('first_name',{
    cell: info => info.getValue(),
    header: () => <>First Name</>
  }),
  columnHelper.accessor('last_name',{
    cell: info => info.getValue(),
    header: () => <>Last Name</>
  }),
  columnHelper.accessor('email',{
    cell: info => info.getValue()
  }),
  columnHelper.accessor('gender',{
    cell: info => info.getValue()
  })
]
// const columns = [
//   {
//     header: 'First Name',
//     accessorKey: 'first_name'
//   }
// ]

const PaginateTable = () =>{
  const [data,setData] = useState([...peopleData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  return (
    <div className="paginate-table">
      <h2>Table with pagination</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup=>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header=>(
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row=>(
            <tr key={row.id}>
              {row.getVisibleCells().map(cell=>(
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
      <div className='pagination mt-6 text-center'>
        <button 
          onClick={()=>table.setPageIndex(0)}
        >
          First
        </button>
        <button
          onClick={()=>table.previousPage()}
          disabled= {!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <button
          onClick={()=>table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          next
        </button>
        <button 
          onClick = {()=>table.setPageIndex(table.getPageCount() - 1)}
        >
          Last
        </button>
        <span>
          <span>Go To page:</span>
          <input 
            type="number"
            max = {table.getPageCount()}
            min = "1"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange = {(e)=>{
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </span>
        <span>
          <select 
            value = {table.getState().pagination.pageSize}
            onChange= {(e)=>{
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10,20,30,40,50].map(pageSize => (
              <option value={pageSize} key={pageSize}>
                Show {pageSize}
              </option>
            ))}
            Show
          </select>
        </span>
      </div>
    </div>

  )
}
export default PaginateTable