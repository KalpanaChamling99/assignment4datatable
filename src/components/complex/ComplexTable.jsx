import React, { useState } from 'react';
import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import peopleData from '../../DATA.json';

const columnHelper = createColumnHelper();

const columns =[
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
  columnHelper.accessor('gender',{
    cell: info => info.getValue()
  })
]

const ComplexTable = () =>{
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
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  })
  return (
    <div class="paginate-table">
      <h2>complex table</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup=>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header=>(
                <th key={header.id}>
                  <div>
                    {header.column.getCanGroup() ? (
                      // If the header can be grouped, let's add a toggle
                      <button
                        {...{
                          onClick: header.column.getToggleGroupingHandler(),
                          style: {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {header.column.getIsGrouped()
                          ? `🛑(${header.column.getGroupedIndex()}) `
                          : `👊 `}
                      </button>
                    ) : null}{' '}
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
                    <td
                      {...{
                        key: cell.id,
                        style: {
                          background: cell.getIsGrouped()
                            ? '#0aff0082'
                            : cell.getIsAggregated()
                            ? '#ffa50078'
                            : cell.getIsPlaceholder()
                            ? '#ff000042'
                            : 'white',
                        },
                      }}
                    >
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
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
                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{' '}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
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
      <div className='pagination mt-6 text-center d-none'>
        <button 
          onClick={()=>table.setPageIndex(0)}
        >
          First
        </button>
        <button
          onClick={()=>table.previousPage()}
          disabled= {!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <button
          onClick={()=>table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          next
        </button>
        <button 
          onClick = {()=>table.setPageIndex(table.getPageCount() - 1)}
        >
          Last
        </button>
        <span>
          <span>Go To page:</span>
          <input 
            type="number"
            max = {table.getPageCount()}
            min = "1"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange = {(e)=>{
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </span>
        <span>
          <select 
            value = {table.getState().pagination.pageSize}
            onChange= {(e)=>{
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10,20,30,40,50].map(pageSize => (
              <option value={pageSize} key={pageSize}>
                Show {pageSize}
              </option>
            ))}
            Show
          </select>
        </span>
      </div>
    </div>

  )
}

export default ComplexTable;