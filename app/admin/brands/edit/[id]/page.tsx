import Form from "@/src/layouts/admin/brands/form";
import { BrandsType } from "@/src/utils/types";
import axios from "axios";

type Props = {
    params: Promise<{id: string}>
}

export default async function Page({params}: Props) {
    const {id} = await params; 
    const {data}: {data: BrandsType} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands/${id}`)
    return <Form data={data} isEdit={true} id={+id} />
}