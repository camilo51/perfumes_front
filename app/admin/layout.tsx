import { Metadata } from "next";
import Link from "next/link";
import { Designer } from "../layout";

export const metadata: Metadata = {
    title: {
        default: "Dashboard | Admin",
        template: "%s | Admin"
    }
}

export default function AdminLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="grid grid-cols-12">
        <div className="col-span-2 p-5 bg-columbia-blue h-min sticky top-0">
            <h1 className={`${Designer.className} text-2xl font-bold text-center mt-5 mb-10`}>Admin Dashboard</h1>
            <nav className="flex flex-col gap-2">
                <Link href={"/admin/dashboard"} className="hover:bg-blue-200 p-2 rounded-lg text-sm">Dashboard</Link>
                <Link href={"/admin/perfumes"} className="hover:bg-blue-200 p-2 rounded-lg text-sm">Perfumes</Link>
                <Link href={"/admin/categories"} className="hover:bg-blue-200 p-2 rounded-lg text-sm">Categorías</Link>
                <Link href={"/admin/aromas"} className="hover:bg-blue-200 p-2 rounded-lg text-sm">Aromas</Link>
                <Link href={"/admin/brands"} className="hover:bg-blue-200 p-2 rounded-lg text-sm">Marcas</Link>
                <Link href={"/admin/orders"} className="hover:bg-blue-200 p-2 rounded-lg text-sm">Pedidos</Link>
            </nav>
        </div>
        <div className="col-span-10 p-5">
            {children}
        </div>
    </div>
  )
}