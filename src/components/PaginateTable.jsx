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
    <div class="paginate-table">
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
        <button onClick={()=>table.setPageIndex(0)}>first</button>
        <button>prev</button>
        <button>next</button>
        <button>last</button>
      </div>
    </div>

  )
}
export default PaginateTable