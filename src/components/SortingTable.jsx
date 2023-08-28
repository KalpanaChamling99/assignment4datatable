import React,{ useState,useEffect} from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable
} from '@tanstack/react-table';
import personData from './../DATA.json';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('first_name',{
    cell: cellInfo => cellInfo.getValue()
  }),
  columnHelper.accessor('last_name',{
    cell: cellInfo => cellInfo.getValue()
  }),
  columnHelper.accessor('email',{
    cell: cellInfo => cellInfo.getValue()
  }),
  columnHelper.accessor('gender',{
    cell: cellInfo => cellInfo.getValue()
  })
] 

function SortingTable() {
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
      <h2>Sorting Table</h2>
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

export default SortingTable;
