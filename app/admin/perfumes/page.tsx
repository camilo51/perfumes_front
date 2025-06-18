import axios from "axios";
import Main from "@/src/layouts/admin/perfumes/main";
import { PerfumesType } from "@/src/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfumes"
}

export default async function page() {

  const { data }: {data: PerfumesType[]} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes`);

  return <Main data={data} />;
}