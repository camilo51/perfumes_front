import Form from "@/src/layouts/admin/categories/form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear Categoria"
}

export default function page() {

  const data = {
    name: ""
  }

  return <Form data={data} />
}