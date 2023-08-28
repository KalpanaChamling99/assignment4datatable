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
    firstname: 'Tenish',
    lastname: 'Shrestha',
    address: 'Kirtipur',
    age: 37
  },
  {
    firstname: 'Rabina',
    lastname: 'Maharjan',
    address: 'Kirtipur 2',
    age: 30
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

function BasicTable() {
  const [data,setData] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  useEffect(()=>{
    setData(personData);
  },[])

  return (
    <div className="basic-table">
      <h2>Sortung Table</h2>
      <table border='1' cellSpacing='0' cellpadding='10'>
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
