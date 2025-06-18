import Form from "@/src/layouts/admin/categories/form";
import { CategoriesType } from "@/src/utils/types";
import axios from "axios";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string; }>
}

export const metadata: Metadata = {
    title: "Editar Categoria"
}

export default async function Page({params} : Props) {
    const {id} = await params;
    const {data}: {data: CategoriesType} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories/${id}`)
    return <Form data={data} isEdit={true} id={+id} />
}