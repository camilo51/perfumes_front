"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Designer } from "@/app/layout";
import { useDropzone } from "react-dropzone";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { AromasType, BrandsType, CategoriesType, PerfumesType } from "@/src/utils/types";
import Select from "react-select";
import { usePerfumeStore } from "@/src/store/usePerfumeStore";

interface FormInterface {
    categories: CategoriesType[];
    aromas: AromasType[];
    brands: BrandsType[];
    isEdit?: boolean;
    data: PerfumesType;
    id?: number;
}

export default function Form({categories, aromas, brands, data, isEdit, id}: FormInterface) {
    
    const router = useRouter();
    const { perfume, setPerfume } = usePerfumeStore();
    useEffect(() => {
        setPerfume(data);
    }, [])    

    const OptionsCategories = categories.map((category: CategoriesType) => ({
        value: category.id!,
        label: category.name
    }))
    const OptionsAromas = aromas.map((aroma: AromasType) => ({
        value: aroma.id!,
        label: aroma.name
    }))
    const OptionsBrands = brands.map((brand: BrandsType) => ({
        value: brand.id,
        label: brand.name
    }))

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpg', '.png']
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPerfume({ ...perfume, image: reader.result as string });
                };
                reader.readAsDataURL(file);
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (isEdit) {
                const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes/${id}`, perfume)
                toast.success(data.message);
            }else{
                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes/create`, perfume)
                toast.success(data.message);
            }
            router.push('/admin/perfumes');
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data.message || "Error al crear el perfume");
            }
        }

    }

    const changeCategory = (selected: any) => {
        const ids = selected ? selected.map((option: {value: number}) => option.value) : [];
        setPerfume({...perfume, categories: ids});
    }
    const changeAroma = (selected: any) => {
        const ids = selected ? selected.map((option: {value: number}) => option.value) : [];
        setPerfume({...perfume, aromas: ids});
    }
    const changeBrand = (selected: any) => {
        setPerfume({...perfume, brand: selected.value});
    } 

  return (
    <>
        <button type="button" onClick={() => router.back()} className="hover:cursor-pointer"><ArrowLeftIcon className="w-7 aspect-square"/></button>

        <form className="w-5/12 shadow-lg mx-auto p-5 mt- rounded" onSubmit={handleSubmit}>
            <fieldset className="mb-5">
                <legend className={`${Designer.className} text-center mb-5`}>
                    {isEdit ? "Editar perfume" : "Crear un nuevo perfume"}
                </legend>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={perfume.name}
                        onChange={(e) => setPerfume({...perfume, name: e.target.value})}
                        placeholder="Nombre del perfume"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="price" className="text-sm">Precio</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={perfume.price === 0 ? "" : perfume.price}
                        onChange={(e) => {
                            let value = e.target.value;
                            if (value === "") {
                                setPerfume({ ...perfume, price: 0 });
                            } else {
                                setPerfume({ ...perfume, price: parseInt(value, 10) });
                            }
                        }}
                        placeholder="Precio del perfume"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="description" className="text-sm">Descripción</label>
                    <textarea 
                        id="description" 
                        name="description"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={perfume.description}
                        onChange={(e) => setPerfume({...perfume, description: e.target.value})}
                        placeholder="Descripción del perfume"
                        rows={4}
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="image" className="text-sm">Imagen</label>
                    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 bg-white w-full aspect-3/1 p-2 rounded-lg flex items-center justify-center hover:cursor-pointer">
                        <input {...getInputProps()} />
                        {perfume.image ? (
                            <img
                            src={perfume.image}
                            alt={perfume.name}
                            className="max-w-5/12 object-contain rounded-md"
                            />
                        ) : isDragActive ? (
                            <p>Arrastra la imagen aquí</p>
                        ) : (
                            <p>Selecciona una imagen</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="stock" className="text-sm">Productos disponibles</label>
                    <input 
                        type="number" 
                        id="stock" 
                        name="stock"
                        className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                        value={perfume.stock === 0 ? "" : perfume.stock}
                        onChange={(e) => {
                            let value = e.target.value;
                            if (value === "") {
                                setPerfume({ ...perfume, stock: 0 });
                            } else {
                                setPerfume({ ...perfume, stock: parseInt(value, 10) });
                            }
                        }}
                        placeholder="Cantidad en productos disponible"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="categories" className="text-sm">Categorías</label>
                    <Select 
                        instanceId="catewgories-select"
                        isMulti
                        options={OptionsCategories}
                        value={OptionsCategories.filter(option => perfume.categories.includes(option.value))}
                        onChange={changeCategory}
                        placeholder="Seleccione las categorias del perfume"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="aromas" className="text-sm">Aromas</label>
                    <Select 
                        instanceId="aromas-select"
                        isMulti
                        options={OptionsAromas}
                        value={OptionsAromas.filter(option => perfume.aromas.includes(option.value))}
                        onChange={changeAroma}
                        placeholder="Seleccione los aromas del perfume"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="brand" className="text-sm">Marca</label>
                    <Select 
                        instanceId="brands-select"
                        options={OptionsBrands}
                        value={OptionsBrands.find(option => option.value === perfume.brand)}
                        onChange={changeBrand}
                        placeholder="Seleccione la marca del perfume"
                    />
                </div>
            </fieldset>
            <button className="w-full p-2 bg-columbia-blue rounded-lg cursor-pointer uppercase font-bold">{isEdit ? "Editar Perfume" : "Crear Perfume"}</button>
        </form>
    </>
  )
}