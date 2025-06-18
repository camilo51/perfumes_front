import Form from "@/src/layouts/admin/brands/form";

export default function page() {
  const data = {name: "", price: 0}
  return <Form data={data} />
}