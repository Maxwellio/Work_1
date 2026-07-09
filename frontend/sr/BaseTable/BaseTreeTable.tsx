import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, getExpandedRowModel, getPaginationRowModel, TableOptions, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import '../../../../../tailwind.css';
import { useFetchData } from "../BaseTable/hooks/useFetchTreeData";

interface BaseTreeTableProps<TData> extends Partial<TableOptions<TData>>{
    url: string;
    columns: ColumnDef<TData>[];
    setSelectedId?: any;
    setIsLeaf?:any;
    defColumnVisibility?: VisibilityState;
}

export const BaseTreeTable = <TData,>({url, columns, setSelectedId, setIsLeaf, defColumnVisibility, ...props}: BaseTreeTableProps<TData>) =>{
    const {data, loading, setData, fetchChildren} = useFetchData<TData>(url, 1000242);
    const [expanded, setExpanded] = useState({});
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defColumnVisibility || {})
    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
            columnVisibility,
         },
        getCoreRowModel: getCoreRowModel(),
        //@ts-ignore
        getRowCanExpand: row => row.original.hasChildren,
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        //@ts-ignore
        getSubRows: row => row.children,
        onExpandedChange: (updater) => {  
            //@ts-ignore
            const newExpanded = updater(expanded);
            Object.keys(newExpanded)
                .filter(id => newExpanded[id] && !expanded[id])
                .forEach(rowId => {
                    const row = table.getRow(rowId);
                    //@ts-ignore                    
                    if (row.getCanExpand() && !row.original.children) {
                        //@ts-ignore
                        fetchChildren(row.original.id);
                }});
            setExpanded(newExpanded);
        },
        manualPagination: true,
        ...props,
    });

    const handleRowClick = (rowId) => {
        setSelectedRowId(selectedRowId === rowId ? null : rowId);
        //@ts-expect-errors
        setSelectedId(selectedRowId === rowId ? null : table.getRow(rowId).original.id);
        //@ts-expect-error
        setIsLeaf(selectedRowId === rowId ? null : !table.getRow(rowId).original.hasChildren);
    };
    
    return(
        <div className="min-w-full min-h-full overflow-auto">
        <table className="min-w-full bg-white rounded-lg table-auto">
            <thead className="bg-gray-100 text-white">
                {table.getHeaderGroups().map(headerGroup => (
                        <tr key = {headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key = {header.id}
                                className="max-h-10 px-4 py-2 text-left text sm front-medium text-gray-700 border ">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>    
                            ))}
                        </tr>
                ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row =>(
                    <tr key = {row.id} 
                        className={`hover:bg-gray-50 transition-colors duration-150
                                    ${selectedRowId === row.id
                                    ? 'bg-blue-50 hover:bg-blue-100 border-1-4 border-1-blue-500'
                                    : 'bg-white'}
                                  `}
                        onClick={() => handleRowClick(row.id)}
                    >
                        {row.getVisibleCells().map(cell => (
                            <td key = {cell.id} className="px-4 py-2 border text-sm text-gray-500 overflow-hedden overflow-ellipsis whitespase-nowrap">
                                <div className="max-h-10 overflow-y-auto">{flexRender(cell.column.columnDef.cell, cell.getContext())} </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};
