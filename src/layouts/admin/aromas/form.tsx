"use client"

import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Designer } from "@/app/layout";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { AromasType } from "@/src/utils/types";
import { useAromaStore } from "@/src/store/useAromaStore";

interface FormInterface {
    data: AromasType;
    isEdit?: boolean;
    id?: number
}

export default function Form({data, isEdit, id}: FormInterface) {

    const router = useRouter();
    const { aroma, setAroma } = useAromaStore();
    
    useEffect(() => {
        setAroma(data)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (isEdit) {
                const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas/${id}`, aroma)
                toast.success(data.message);
            }else{
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas/create`, aroma)
                toast.success(data.message);
            }
            router.push('/admin/aromas');
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data.message || "Error al crear la categorias");
            }
        }

    }

  return (
    <>
        <button type="button" onClick={() => router.back()} className="hover:cursor-pointer"><ArrowLeftIcon className="w-7 aspect-square"/></button>
        <form className="w-5/12 shadow-lg mx-auto p-5 mt- rounded" onSubmit={handleSubmit}>
            <fieldset className="mb-5">
                <legend className={`${Designer.className} text-center mb-5`}>{isEdit ? "Editar Aroma" : "Crear un nuevo aroma"}</legend>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={aroma.name}
                        onChange={(e) => setAroma({...aroma, name: e.target.value})}
                        placeholder="Nombre del aroma"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm">Precio</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={aroma.price === 0 ? "" : aroma.price}
                        onChange={(e) => {
                            let value = e.target.value;
                            if (value === "") {
                                setAroma({ ...aroma, price: 0 });
                            } else {
                                setAroma({ ...aroma, price: parseInt(value, 10) });
                            }
                        }}
                        placeholder="Precio del perfume"
                    />
                </div>
            </fieldset>
            <button className="w-full p-2 bg-columbia-blue rounded-lg cursor-pointer uppercase font-bold">{isEdit ? "Editar Aroma" : "Crear Aroma"}</button>
        </form>
    </>
  )
}