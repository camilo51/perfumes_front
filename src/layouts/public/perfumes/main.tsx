"use client"

import { Designer } from "@/app/layout";
import PerfumeCardComponent from "@/src/components/PerfumeCardComponent";
import { usePerfumesStore } from "@/src/store/usePerfumesStore";
import { AromasType, BrandsType, CategoriesType, FiltersPerfumesType, PerfumesType } from "@/src/utils/types"
import { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";

interface MainInterface {
    data: PerfumesType[];
    categories: CategoriesType[];
    aromas: AromasType[];
    brands: BrandsType[];
}

export default function Main({data, categories, aromas, brands}: MainInterface) {

    const {perfumes, setPerfumes} = usePerfumesStore();

    const defaultValues = {
        price: "",
        categories: [],
        aromas: [],
        brand: undefined
    }

    const [filters, setFilters] = useState<FiltersPerfumesType>(defaultValues);

    useEffect(() => {
        setPerfumes(data);
    }, [])

    const OptionsPrice = [
        {value: "DESC", label: "Menor a Mayor"},
        {value: "ASC", label: "Mayor a Menor"},
    ]
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

    const changePrice = (selected: SingleValue<{ value: string; label: string }>) => {
        setFilters((prev) => ({ ...prev, price: selected?.value ?? "" }));
    };
    const changeCategory = (selected: MultiValue<{ value: number; label: string }>) => {
        const values = selected.map((opt) => opt.value);
        setFilters((prev) => ({ ...prev, categories: values }));
    };
    const changeAroma = (selected: MultiValue<{ value: number; label: string }>) => {
        const values = selected.map((opt) => opt.value);
        setFilters((prev) => ({ ...prev, aromas: values }));
    };
    const changeBrand = (selected: SingleValue<{ value: number | undefined; label: string }>) => {
        setFilters((prev) => ({ ...prev, brand: selected?.value ?? undefined }));
    };

    const clearFilters = () => {
        setFilters(defaultValues);
    }

    return (
        <div className="p-5">
            <h2 className={`${Designer.className} text-center text-xl mb-5`}>Perfumes</h2>
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-1 shadow rounded h-min p-5 sticky top-2">
                    <h3 className="uppercase text-center font-bold mb-5">Filtrar perfumes</h3>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="prices-select" className="text-sm">Precios</label>
                        <Select 
                            instanceId="prices-select"
                            options={OptionsPrice}
                            value={OptionsPrice.filter(option => option.value === filters.price)}
                            onChange={changePrice}
                            placeholder="Filtrar por precio"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="categories" className="text-sm">Categorías</label>
                        <Select 
                            instanceId="categories-select"
                            isMulti
                            options={OptionsCategories}
                            value={OptionsCategories.filter(option => filters.categories.includes(option.value))}
                            onChange={changeCategory}
                            placeholder="Filtrar por categorias"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="aromas" className="text-sm">Aromas</label>
                        <Select 
                            instanceId="aromas-select"
                            isMulti
                            options={OptionsAromas}
                            value={OptionsAromas.filter(option => filters.aromas.includes(option.value))}
                            onChange={changeAroma}
                            placeholder="Filtrar por aromas"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="brand" className="text-sm">Marca</label>
                        <Select 
                            key={filters.brand ?? "brand-default"}
                            instanceId="brand-select"
                            options={OptionsBrands}
                            value={OptionsBrands.find(option => option.value === filters.brand)}
                            onChange={changeBrand}
                            placeholder="Filtrar por marca"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button type="button" className="border rounded p-1 w-full uppercase text-sm hover:cursor-pointer" onClick={clearFilters}>Limpiar filtros</button>
                        <button type="button" className="border rounded p-1 w-full uppercase text-sm hover:cursor-pointer">Filtrar</button>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 col-span-4">
                    {perfumes.map((perfume) => (
                        <PerfumeCardComponent key={perfume.id} perfume={perfume} />
                    ))}
                </div>
            </div>
        </div>
    )
}