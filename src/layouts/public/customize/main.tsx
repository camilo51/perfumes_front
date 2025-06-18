"use client"

import Select, { MultiValue, SingleValue } from "react-select"
import { Designer } from "@/app/layout";
import { AromasType, BrandsType, CategoriesType, PerfumesType } from "@/src/utils/types";
import { useState } from "react";

interface MainInterface {
    data: PerfumesType[];
    categories: CategoriesType[];
    aromas: AromasType[];
    brands: BrandsType[];
}

export default function Main({data, categories, aromas, brands}: MainInterface) {
    
    const [perfume, setPerfume] = useState<{ 
        name: string,
        categories: number[]; 
        aromas: number[];
    }>({ 
        name: "",
        categories: [], 
        aromas: [],}
    );
    const [total, setTotal] = useState(0);
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

    const changeCategory = (selected: MultiValue<{ value: number; label: string }>) => {
        const values = selected.map((opt) => opt.value);
        setPerfume((prev) => ({ ...prev, categories: values }));
    };
    const changeAroma = (selected: MultiValue<{ value: number; label: string }>) => {
        const values = selected.map((opt) => opt.value);
        setPerfume((prev) => ({ ...prev, aromas: values }));
    };
    const changeBrand = (selected: SingleValue<{ value: number | undefined; label: string }>) => {
        setPerfume((prev) => ({ ...prev, brand: selected?.value ?? undefined }));
    };

  return (
    <>
        <div className="p-5">
            <h2 className={`${Designer.className} text-xl text-center mb-5`}>Crea a tu gusto</h2>
            <div className="grid grid-cols-2 gap-5 w-8/12 mx-auto">
                <div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="name" className="text-sm">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300"
                            value={perfume.name}
                            onChange={(e) => setPerfume({...perfume, name: e.target.value})}
                            placeholder="Que nombre desea ponerle al perfume"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="categories" className="text-sm">Categorías</label>
                        <Select 
                            instanceId="categories-select"
                            isMulti
                            options={OptionsCategories}
                            value={OptionsCategories.filter(option => perfume?.categories.includes(option.value))}
                            onChange={changeCategory}
                            placeholder="Como define su perfume"
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
                            placeholder="Que aromas tiene su perfume"
                        />
                    </div>
                </div>
                <div className="bg-white rounded shadow-md p-5">
                    <h3 className={`${Designer.className}  text-center mb-5`}>Factura</h3>

                    {perfume.name && (
                        <p className="font-bold flex justify-between mb-2">{perfume.name} <span className="font-normal">50000</span></p>
                    )}
                    {perfume.categories.length > 0 && (
                        <>
                            <h4 className="font-bold flex justify-between">Categorias</h4>
                            <ul className="mb-2">
                                {perfume.categories.map((category, i) => (
                                    <li key={i} className="ml-5">{category}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {perfume.aromas.length > 0 && (
                        <>
                            <h4 className="font-bold flex justify-between">Aromas</h4>
                            <ul className="list-disc mb-2">
                                {perfume.aromas.map((aromaId, i) => {
                                    const aromaObj = aromas.find(aroma  => aroma.id === aromaId)
                                    return(
                                        <li key={i} className="ml-5 flex justify-between">{aromaObj?.name} <span>{aromaObj?.price}</span></li>
                                    )
                                })}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}