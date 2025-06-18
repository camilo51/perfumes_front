import Form from "@/src/layouts/admin/perfumes/form";
import { AromasType, BrandsType, CategoriesType, PerfumesType } from "@/src/utils/types";
import axios from "axios";

type Props = {
    params: Promise<{ id: string; }>
}

export default async function Page({params}: Props) {
    const {id} = await params;

    const {data: categories}: { data: CategoriesType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories`);
    const {data: aromas}: { data: AromasType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas`);
    const {data: brands}: { data: BrandsType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands`)

    const {data}: {data: PerfumesType} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes/${id}`); 

    return <Form categories={categories} aromas={aromas} brands={brands} data={data} isEdit={true} id={+id} />
}