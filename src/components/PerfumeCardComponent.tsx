import { Designer } from "@/app/layout";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import currency from "currency.js";
import { PerfumesType } from "../utils/types";
import { useEffect, useState } from "react";

interface PerfumeCardInterface {
    perfume: PerfumesType;
}

export default function PerfumeCardComponent({perfume}: PerfumeCardInterface) {

    const [perfumes, setPerfumes] = useState<PerfumesType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setPerfumes(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (perfumeToAdd: PerfumesType) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = [...existingCart, perfumeToAdd];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setPerfumes(updatedCart);
  };
  return (
    <div className="p-5 bg-lavender rounded-md shadow">
        <img className="aspect-square rounded-md mb-5" src={perfume.image} alt={perfume.name} />
        <div className="grid grid-cols-2 gap-y-2 items-center">
            <div className="space-y-2">
                <h3 className={`${Designer.className}`}>{perfume.name}</h3>
                <p className="text-gray-400 text-sm">Desde: <span className="text-black">{currency(perfume.price, {symbol: '$', separator: '.', precision: 0}).format()}</span></p>
            </div>
            <div className="justify-self-end">
                <button type="button">
                    <HeartIcon className="w-7" />
                </button>
            </div>
            <button type="button" className="flex gap-2 justify-center p-2 rounded border col-span-2 hover:cursor-pointer hover:scale-101 transition-all duration-150" onClick={() => addToCart(perfume)}>
                Agregar al carrito <ShoppingCartIcon className="w-5" />
            </button>
        </div>
    </div>
  )
}