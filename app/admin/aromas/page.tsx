import Main from "@/src/layouts/admin/aromas/main";
import { AromasType } from "@/src/utils/types";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aromas"
}

export default async function page() {

  const { data }: {data: AromasType[]} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/aromas`);

  return <Main data={data} />
}