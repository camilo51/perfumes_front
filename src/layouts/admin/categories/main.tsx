"use client"

import Link from "next/link";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table"
import { Designer } from "@/app/layout";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Main() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories`);
                setCategories(data)
            } catch (error) {
                if (isAxiosError(error)) {
                    console.log(error.message);
                }
            }
        }
        getCategories()
    }, [])

    const CategoriesColumns = [
        {accessorKey: 'id', header: 'ID'},
        {accessorKey: 'name', header: 'Nombre de la categoria'},
        {
        id: 'actions',
        header: "Acciones",
        cell: ({row}: {row: any}) => (
            <div className="flex items-center gap-2 py-2">
                <Link className="p-2 bg-blue-500 rounded border-none hover:cursor-pointer hover:bg-blue-400 transition-colors duration-200 inline-block" href={`/admin/categories/edit/${row.original.id}`}><PencilIcon className="w-6 aspect-square" /></Link> 
                <button className="p-2 bg-red-500 rounded border-none hover:cursor-pointer hover:bg-red-400 transition-colors duration-200"><TrashIcon className="w-6 aspect-square" /></button>
            </div>
        )
    }
    ]

    const table = useReactTable({
        data: categories,
        columns: CategoriesColumns,
        getCoreRowModel: getCoreRowModel(),
    })
  return (
    <>
        <div className="flex items-center justify-between mb-5">
            <h2 className={`${Designer.className} text-xl`}>Categorias</h2>
            <Link href={"/admin/categories/create"} className="bg-tea-green py-2 px-5 rounded-lg">Nueva Categoria</Link>
        </div>
        <div>
            <table className="w-full border-spacing-y-2">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="text-start">
                                    {header.placeholderId 
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b border-gray-200">
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}