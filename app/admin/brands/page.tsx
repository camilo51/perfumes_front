import Main from "@/src/layouts/admin/brands/main";
import { BrandsType } from "@/src/utils/types";
import axios from "axios";

export default async function page() {

  const {data}: {data: BrandsType[]} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/brands`);

  return <Main data={data} />
}