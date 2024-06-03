import React from 'react'; // Correct the import statements
import DataTable from './DataTable';
import DataTableIndividualFilter from './DataTableIndividualFilter';
import DataTableSorting from './DataTableSorting';

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
    header: 'Date',
    accessorKey: 'date',
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

const UserTable = () => {
  return (
    <>
    <DataTable columns={columns}/>
    <DataTableIndividualFilter columns={columns}/>
    <DataTableSorting columns={columns}/>
   </>
  );
}

export default UserTable;
