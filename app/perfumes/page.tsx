import Main from "@/src/layouts/public/perfumes/main";
import { AromasType, BrandsType, CategoriesType, PerfumesType } from "@/src/utils/types";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfumes"
}

export default async function Page() {

    const {data: categories}: { data: CategoriesType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories`);
    const {data: aromas}: { data: AromasType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas`);
    const {data: brands}: { data: BrandsType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands`)
    const { data }: {data: PerfumesType[]} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes`);

    return <Main data={data} categories={categories} aromas={aromas} brands={brands} />
}