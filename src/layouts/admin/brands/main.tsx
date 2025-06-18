"use client"

import { Designer } from "@/app/layout";
import { useBrandsStore } from "@/src/store/useBrandsStore";
import { BrandsType } from "@/src/utils/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

interface MainInterface{
  data: BrandsType[];
}

export default function Main({data}: MainInterface) {

  const { brands, setBrands } = useBrandsStore();

  useEffect(() => {
    setBrands(data);
  }, [])

  const deleteBrand = async (id: number) => {
    try {
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands/${id}`) 
        toast.success(data.message);
        setBrands(brands.filter(brand => brand.id !== id));
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.message);
            
        }
    }
  }

  const brandsColumns = [
    {accessorKey: 'id', header: 'ID'},
    {accessorKey: 'name', header: 'Nombre de la marca'},
    {
        id: 'actions',
        header: "Acciones",
        cell: ({row}: {row: any}) => (
            <div className="flex items-center gap-2 py-2">
                <Link className="p-2 bg-blue-500 rounded border-none hover:cursor-pointer hover:bg-blue-400 transition-colors duration-200 inline-block" href={`/admin/brands/edit/${row.original.id}`}><PencilIcon className="w-6 aspect-square" /></Link> 
                <button className="p-2 bg-red-500 rounded border-none hover:cursor-pointer hover:bg-red-400 transition-colors duration-200" onClick={() => deleteBrand(row.original.id)} ><TrashIcon className="w-6 aspect-square" /></button>
            </div>
        )
    }
  ]
  const table = useReactTable({
      data: brands,
      columns: brandsColumns,
      getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
        <div className="flex items-center justify-between mb-5">
            <h2 className={`${Designer.className} text-xl`}>Marcas</h2>
            <Link href={"/admin/brands/create"} className="bg-tea-green py-2 px-5 rounded-lg">Nueva Marca</Link>
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