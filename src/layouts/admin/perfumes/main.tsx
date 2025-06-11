"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table"
import { Designer } from "@/app/layout";
import { PerfumesType } from "@/src/utils/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Main() {

    const [perfumes, setPerfumes] = useState<PerfumesType[]>([]);

    useEffect(() => {
        const getPerfumes = async () => {
            try {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes`);
                setPerfumes(data);
            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.message)
                }
            }
        }
        getPerfumes();
    }, []);

    const PerfumesColumns = [
    {
        accessorKey: 'image', 
        header: 'Imagen',
        cell: ({row}: {row: any}) => (
            <div className="rounded overflow-hidden">
                <img 
                    src={row.original.image}
                    alt={row.original.name}
                    className="max-w-40 p-2"
                /> 
            </div>
        )
    },
    {accessorKey: 'name', header: 'Nombre del perfume'},
    {accessorKey: 'price', header: 'Precio($)'},
    {accessorKey: 'stock', header: 'Cantidad'},
    {
        id: 'actions',
        header: "Acciones",
        cell: ({row}: {row: any}) => (
            <div className="flex items-center gap-2">
                <Link className="p-2 bg-blue-500 rounded border-none hover:cursor-pointer hover:bg-blue-400 transition-colors duration-200 inline-block" href={`/admin/perfumes/edit/${row.original.id}`}><PencilIcon className="w-6 aspect-square" /></Link> 
                <button className="p-2 bg-red-500 rounded border-none hover:cursor-pointer hover:bg-red-400 transition-colors duration-200"><TrashIcon className="w-6 aspect-square" /></button>
            </div>
        )
    }
]

    const table = useReactTable({
        data: perfumes,
        columns: PerfumesColumns,
        getCoreRowModel: getCoreRowModel(),
    })

  return (
    <>
        <div className="flex items-center justify-between mb-5">
            <h2 className={`${Designer.className} text-xl`}>Perfumes</h2>
            <Link href={"/admin/perfumes/create"} className="bg-tea-green py-2 px-5 rounded-lg">Nuevo Perfume</Link>
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