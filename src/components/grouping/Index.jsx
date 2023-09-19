import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import peopleData from '../../DATA.json';

const columnHelper = createColumnHelper();

const columns =[
  // columnHelper.accessor('id',{
  //   cell: info => info.getValue(),
  //   header: () => <>People ID</>,
  // }),
  columnHelper.accessor('first_name',{
    cell: info => info.getValue(),
    header: () => <>First Name</>,
  }),
  columnHelper.accessor('last_name',{
    cell: info => info.getValue(),
    header: () => <>Last Name</>,
  }),
  columnHelper.accessor('email',{
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('gender',{
    cell: info => info.getValue(),
  })
]

const GroupingTable = () =>{
  const [data,setData] = useState([...peopleData]);
  const [grouping, setGrouping] = useState([]);
  
  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div class="Grouping-table">
      <h2>Grouping table</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup=>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header=>(
                <th key={header.id}>
                  <div>
                    {header.column.id === 'gender' ? 
                      (
                      <button
                        {...{
                          onClick: header.column.getToggleGroupingHandler(),
                          style: {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {header.column.getIsGrouped()
                          ? `ug(${header.column.getGroupedIndex()}) `
                          : `g `}
                      </button>
                    ) : null }

                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row=>{
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td>
                      {cell.getIsGrouped() ? (
                        <>
                          <button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? 'pointer'
                                  : 'normal',
                              },
                            }}
                          >
                            {/* {row.getIsExpanded() ? 'coll' : 'exp'}{' '} */}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}

                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GroupingTable;