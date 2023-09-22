import React, { useMemo, useState , useEffect, useRef} from 'react'; 
import RowSelectionTable from './RowSelectionTable';
import ShowSelectedRowTable from './ShowSelectedRowTable';
import DeleteSelectedRowTable from './DeleteSelectedRowTable';
const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
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
   header: 'Email',
   accessorKey: 'email',
 },
 {
   header: 'Status',
   accessorKey: 'marital_status',
 },
];
function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = useRef();

  useEffect(() => {
    ref.current.indeterminate = !rest.checked && indeterminate
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      {...rest}
    />
  )
}


const SelectionTable = () =>{
  return(
    <div className='row-selection-table'>
      <RowSelectionTable columns={columns} />
      <ShowSelectedRowTable columns={columns}/>
      <DeleteSelectedRowTable columns={columns} />
    </div>
  )
}
export default SelectionTable;