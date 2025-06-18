import Form from "@/src/layouts/admin/aromas/form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear Marca"
}

export default function page() {
  const data = {name: "", price: 0}
  return <Form data={data} />
}