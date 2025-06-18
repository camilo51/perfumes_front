import Form from "@/src/layouts/admin/aromas/form";
import { AromasType } from "@/src/utils/types";
import axios from "axios";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string; }>
}

export const metadata: Metadata = {
    title: "Editar Aroma"
}

export default async function page({params}: Props) {
    const {id} = await params;
    const {data}: {data: AromasType} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas/${id}`)
    return <Form data={data} isEdit={true} id={+id} />
}