"use client"

import { Designer } from "@/app/layout";
import { useBrandStore } from "@/src/store/useBrandStore";
import { BrandsType } from "@/src/utils/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormInterface {
    data: BrandsType;
    isEdit?: boolean;
    id?: number
}

export default function Form({data, isEdit, id}: FormInterface) {

    const router = useRouter(); 
    const { brand, setBrand } = useBrandStore();

    useEffect(() => {
        setBrand(data);
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (isEdit) {
                const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands/${id}`, brand)
                toast.success(data.message);
            }else{
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands/create`, brand)
                toast.success(data.message);
            }
            router.push('/admin/brands');
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data.message || "Error al crear la marca");
            }
        }

    }

  return (
    <>
        <button type="button" onClick={() => router.back()} className="hover:cursor-pointer"><ArrowLeftIcon className="w-7 aspect-square"/></button>
        <form className="w-5/12 shadow-lg mx-auto p-5 mt- rounded" onSubmit={handleSubmit}>
            <fieldset className="mb-5">
                <legend className={`${Designer.className} text-center mb-5`}>{isEdit ? "Editar Marca" : "Crear una nueva marca"}</legend>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={brand.name}
                        onChange={(e) => setBrand({...brand, name: e.target.value})}
                        placeholder="Nombre de la marca"
                    />
                </div>

            </fieldset>
            <button className="w-full p-2 bg-columbia-blue rounded-lg cursor-pointer uppercase font-bold">{isEdit ? "Editar Marca" : "Crear marca"}</button>
        </form>
    </>
  )
}