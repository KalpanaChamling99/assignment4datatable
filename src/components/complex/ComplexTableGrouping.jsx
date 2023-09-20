import React, { useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender
} from '@tanstack/react-table';
import peopleData  from '../../DATA.json';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.group({
    header: 'User info',
    columns: [
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
    ]
  }),
  columnHelper.group({
    header: "Info",
    columns:[ 
      columnHelper.accessor('age',{
        cell: info => info.getValue(),
        header: () => <>Age</>
      }),
      columnHelper.accessor('nationality',{
        cell: info => info.getValue(),
        header: () => <>Nationality</>
      }),
      columnHelper.group({
        header:'status',
        columns:[
          columnHelper.accessor('gender',{
            cell: info => info.getValue()
          }),
          columnHelper.accessor('marital_status',{
            cell: info => info.getValue(),
            header: () => <>Maritial Status</>
          }),
        ]
      })
    ],
  }),
];


const ComplexTableGrouping = () => {
  const [data,setData] = useState([...peopleData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  return(
    <div className="complex-table">
      <h2>Complex Table</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map( headerGroups => (
            <tr key={headerGroups.id}>
              { headerGroups.headers.map( header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null 
                    : 
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  }
                </th>
              ))}

            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row =>(
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
    </div>
  )
}
export default ComplexTableGrouping;