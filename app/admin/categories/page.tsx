import Main from "@/src/layouts/admin/categories/main";
import { CategoriesType } from "@/src/utils/types";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categorias"
}

export default async function page() {

  const {data}: {data: CategoriesType[]} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories`);

  return <Main data={data} />
}