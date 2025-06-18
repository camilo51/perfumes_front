"use client"

import { Designer } from "@/app/layout";
import { useCategoryStore } from "@/src/store/useCategoryStore";
import { CategoriesType } from "@/src/utils/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormInterface {
    data: CategoriesType;
    isEdit?: boolean;
    id?: number;
}

export default function Form({data, isEdit, id} : FormInterface) {

    const router = useRouter();
    const {category, setCategory} = useCategoryStore()

    useEffect(() => {
        setCategory(data);
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (isEdit) {
                const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories/${id}`, category)
                toast.success(data.message);
            }else{
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories/create`, category)
                toast.success(data.message);
            }
            router.push('/admin/categories');
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
                <legend className={`${Designer.className} text-center mb-5`}>{isEdit ? "Editar categoria" : "Crear una nueva categoria"}</legend>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={category.name}
                        onChange={(e) => setCategory({...category, name: e.target.value})}
                        placeholder="Nombre de la categoria"
                    />
                </div>

            </fieldset>
            <button className="w-full p-2 bg-columbia-blue rounded-lg cursor-pointer uppercase font-bold">{isEdit ? "Editar Categoria" : "Crear Categoria"}</button>
        </form>
    </>
  )
}