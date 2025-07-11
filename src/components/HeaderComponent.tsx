"use client"

import { Designer } from "@/app/layout";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { PerfumesType, UserType } from "../utils/types";
import { useRouter } from "next/navigation";

export default function HeaderComponent() {

    const router = useRouter();

    const [authMenu, setAuthMenu] = useState(false)
    const [user, setUser] = useState<UserType>();
    const [cart, setCart] = useState<PerfumesType[]>([]);

    useEffect(() => {
        const userData = localStorage.getItem("USER");
        setCart(JSON.parse(localStorage.getItem("cart") || "[]"))
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(undefined);
        }
    }, [])

    const toggleAuthMenu = () => {
        setAuthMenu(prev => !prev);
    }
    const handleLogOut = () => {
        localStorage.removeItem("USER");
        setUser(undefined);
        setAuthMenu(!authMenu);
        router.push("/auth/login");
    }

    return (
        <>
            <header className="py-5 bg-columbia-blue">
                <Toaster expand={true} position="top-right" richColors closeButton duration={4000} />
                <div className="grid grid-cols-3 w-11/12 mx-auto">
                    <h1 className={`${Designer.className} text-4xl justify-self-start`}>Perfumes</h1>
                    <nav className="flex items-center justify-center justify-self-center">
                        <div className="flex items-center py-1 gap-2">
                            <Link href={"/"} className="font-bold rounded p-2 transition-colors duration-150">Inicio</Link>
                            <Link href={"/perfumes"} className="font-bold rounded p-2 transition-colors duration-150">Perfumes</Link>
                            <Link href={"/customize"} className="font-bold rounded p-2 transition-colors duration-150">Personaliza</Link>
                        </div>
                    </nav>
                    <div className="flex items-center gap-5 justify-self-end">
                        <div className="relative flex items-center">
                            <button type="button" className="hover:cursor-pointer hover:scale-108 transition-all duration-200 p-1 hover:text-gray-600" onClick={toggleAuthMenu}><UserIcon className="w-7 aspect-square" /></button>
                            {authMenu && (
                            <div className="flex flex-col absolute top-10 right-0 backdrop-blur-lg bg-columbia-blue/30 p-3 rounded w-52">
                                {user ? (
                                    <>
                                        <Link href={"/admin/dashboard"} className="hover:bg-white/30 p-2 rounded transition-colors duration-150" onClick={() => setAuthMenu(!authMenu)}>Dashboard</Link>
                                        <Link href={"/profile"} className="hover:bg-white/30 p-2 rounded transition-colors duration-150" onClick={() => setAuthMenu(!authMenu)}>Perfil</Link>
                                        <button type="button" className="hover:bg-white/30 p-2 rounded transition-colors duration-150 cursor-pointer text-start" onClick={handleLogOut}>Cerrar Sesión</button>
                                    </>
                                ) : (
                                    <>
                                        <Link href={"/auth/login"} className="hover:bg-white/30 p-2 rounded transition-colors duration-150" onClick={() => setAuthMenu(!authMenu)}>Iniciar Sesión</Link>
                                        <Link href={"/auth/register"} className="hover:bg-white/30 p-2 rounded transition-colors duration-150" onClick={() => setAuthMenu(!authMenu)}>Registrarme</Link>
                                    </>
                                )}
                            </div>
                            )}
                        </div>
                        <div className="relative">
                            <p className="absolute -top-2 -right-1 bg-white rounded-full w-5 h-5 text-sm flex justify-center items-center">{cart.length > 0 ? cart.length : 0}</p>
                            <ShoppingCartIcon className="w-7 aspect-square" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}