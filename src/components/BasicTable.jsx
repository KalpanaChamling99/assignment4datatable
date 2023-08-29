import React,{ useState,useEffect} from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable
} from '@tanstack/react-table';

// type Person = {
//   firstname: string,
//   lastname: string,
//   address: string,
//   age: number
// };

// const personData: Person[] = [
const personData = [  
  {
    firstname: 'Kalpana',
    lastname: 'Rai',
    address: 'Pathari',
    age: 27
  },
  {
    firstname: 'Denisha',
    lastname: 'Shrestha',
    address: 'Kirtipur',
    age: 28
  },
  {
    firstname: 'Rabina',
    lastname: 'Maharjan',
    address: 'Kirtipur 2',
    age: 29
  }
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('firstname',{
    cell: cellInfo => cellInfo.getValue()
  }),
  columnHelper.accessor('lastname',{
    cell: cellInfo => cellInfo.getValue()
  }),
  columnHelper.accessor('address',{
    cell: cellInfo => cellInfo.getValue()
  }),
  columnHelper.accessor('age',{
    cell: cellInfo => cellInfo.getValue()
  })
] 

function BasicTable({classes}) {
  const [data,setData] = useState([...personData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="basic-table">
      <h2>Basic Table</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup=>(
            <tr>
              {headerGroup.headers.map(header => (
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
          {table.getRowModel().rows.map(row => (
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
  );
}

export default BasicTable;
