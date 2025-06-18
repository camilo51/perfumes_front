"use client"

import { Designer } from "@/app/layout";
import PerfumeCardComponent from "@/src/components/PerfumeCardComponent";
import { PerfumesType } from "@/src/utils/types"
import { ChatBubbleLeftRightIcon, ReceiptRefundIcon, RocketLaunchIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface MainInterface {
    perfumes: PerfumesType[];
}

export default function Main({perfumes}: MainInterface) {
  return (
    <>
        <div className="mb-5">
            <img src="img/bg-principal.webp" alt="Background principal de la pagina" />
        </div>
        <div className="px-5 mb-5">
            <h2 className={`${Designer.className} text-3xl text-center mb-5`}>Perfumes</h2>
            <div className="grid grid-cols-4 gap-2">
                {perfumes.map(perfume => (
                    <PerfumeCardComponent key={perfume.id} perfume={perfume} />
                ))}
            </div>
            <div className="p-5 flex justify-center">
                <Link href={"/perfumes"} className="p-2 border rounded">Ver mas Perfumes</Link>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-x-5 px-5 mb-5">
            <div className="border rounded aspect-4/1 flex flex-col justify-center items-center">
                <ChatBubbleLeftRightIcon className="w-10" />
                <p>Contactenos</p>
            </div>
            <div className="border rounded aspect-4/1 flex flex-col justify-center items-center">
                <ShieldCheckIcon className="w-10" />
                <p>Pagos Seguros</p>
            </div>
            <div className="border rounded aspect-4/1 flex flex-col justify-center items-center">
                <ReceiptRefundIcon className="w-10" />
                <p>Fáciles Devoluciones</p>
            </div>
            <div className="border rounded aspect-4/1 flex flex-col justify-center items-center">
                <RocketLaunchIcon className="w-10" />
                <p>Envios a todo el país</p>
            </div>
        </div>
    </>
  )
}