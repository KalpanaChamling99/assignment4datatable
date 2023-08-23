import React,{ useState} from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable
} from '@tanstack/react-table';
import './App.css';

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
  }
];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('firstname',{
    cell: data => data.getValue()
  }),
  columnHelper.accessor('lastname',{
    cell: data => data.getValue()
  }),
  columnHelper.accessor('address',{
    cell: data => data.getValue()
  }),
  columnHelper.accessor('age',{
    cell: data => data.getValue()
  })
] 

function App() {
  const [data,setData] = useState([...personData]);

  const table = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel
  }
  return (
    <div className="basic-table">
      <h1>Basic Table</h1>
      <table>
        <thead>
          
        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>
  );
}

export default App;
