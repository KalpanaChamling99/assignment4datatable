import React, { useMemo, useState } from 'react'; // Correct the import statements
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import personData from '../../DATA.json';
import Select from 'react-select';

const DataTableIndividualFilter = ({columns}) => {
  const data = useMemo(() => personData, []); // Using useMemo to memoize data
  const [sorting,setSorting] = useState([]);
  const [filtering,setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state:{
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  });

  return (
    <div className="basic-table">
      <h2>Individual Filter with sorting</h2>
      <div>
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table border='1' cellSpacing='0' cellPadding='10'> {/* Correct the attribute names */}
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <>
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                  >
                    {header.isPlaceholder ? null :(
                      <>
                        <div onClick={header.column.getToggleSortingHandler()}>
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
                        {header.column.getCanFilter() ? (
                          <div className="w-100">
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            </>
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
      <div className='mt-3 d-none'>
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

const options = [
  { value: 'single', label: 'single' },
  { value: 'divorce', label: 'divorce' },
  { value: 'married', label: 'married' },
]

function Filter({column,table}) {
  const columnFilterValue = column.getFilterValue();
  console.log('filter value',columnFilterValue)
  return  (
    <div>
      {column.id === 'marital_status' ?
        <Select
            options={options}
            isClearable={true}
            onChange={(selectedOption) => {
              column.setFilterValue(selectedOption ? selectedOption.value : undefined);
            }}
            value={
              options.find((option) => option.value === columnFilterValue) || null
            }
            placeholder={`Select...`}
          />
        :
        column.id === "date" ?
        <input
          type="date"
          value={columnFilterValue}
          onChange={e => column.setFilterValue(e.target.value)}
          placeholder={`date filter...`}
        />
        :
        <input
          type="text"
          value={columnFilterValue}
          onChange={e => column.setFilterValue(e.target.value)}
          placeholder={`Search...`}
        />
        }
    </div>
  )
}
export default DataTableIndividualFilter;
// https://codesandbox.io/s/sleepy-poitras-6brjuc?fontsize=14&hidenavigation=1&theme=dark