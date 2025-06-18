import axios from "axios";
import { AromasType, BrandsType, CategoriesType } from "@/src/utils/types";
import Form from "@/src/layouts/admin/perfumes/form";

export default async function page() {

  const {data: categories}: { data: CategoriesType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/categories`);
  const {data: aromas}: { data: AromasType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas`);
  const {data: brands}: { data: BrandsType[] } = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands`)

  const data = {
        name: "",
        price: 0,
        description: "",
        image: "",
        stock: 0,
        categories: [], 
        aromas: [],
        brand: 0,
    }

  return <Form categories={categories} aromas={aromas} brands={brands} data={data} />
}