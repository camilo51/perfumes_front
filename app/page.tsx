import { Metadata } from "next";
import Main from "@/src/layouts/public/main/main";
import { PerfumesType } from "@/src/utils/types";
import axios from "axios";

export const metadata: Metadata = {
  title: {
    default: "Perfumes",
    template: "%s | Perfumes",
  }
}

export default async function Home() {

  const { data }: {data: PerfumesType[]} = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/perfumes?limit=8`);

  return <Main perfumes={data} />
}
