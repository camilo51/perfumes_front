"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { Designer } from "@/app/layout";

export default function Main() {

    const router = useRouter();
    const defaultUser = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    }; 


    const [user, setUser] = useState(defaultUser);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        if (user.password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (!user.name || !user.email || !user.phone) {
            toast.error("Por favor completa todos los campos");
            return;
        }
        
        const {confirmPassword, ...formData} = user;
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users/create`, formData);
            toast.success(data.message || "Usuario registrado correctamente");
            toast.info('Hemos enviado un correo de confirmación, por favor revisa tu bandeja de entrada', {
                duration: 8000,
            });
            setUser(defaultUser);
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000)
        } catch (error) {
            
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || "Error al registrar el usuario");
            }
        }

    }

  return (
    <form className="w-5/12 shadow-lg mx-auto p-5 mt-10 rounded" onSubmit={handleSubmit}>
        <fieldset>
            <legend className={`${Designer.className} text-2xl text-center my-5`}>Registrarme</legend>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="name" className="text-sm text-gray-500">Nombre completo</label>
                <input 
                    type="text" 
                    className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" 
                    id="name" 
                    name="name"
                    placeholder="Ej: Cristian Pereira" 
                    required 
                    value={user.name} 
                    onChange={(e) => setUser({...user, name: e.target.value})} 
                />
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="email" className="text-sm text-gray-500">Email</label>
                <input 
                    type="email" 
                    className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" 
                    id="email" 
                    name="email" 
                    placeholder="Ej: correo@correo.com" 
                    required 
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})} 
                />
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="telefono" className="text-sm text-gray-500">Número de teléfono</label>
                <input 
                    type="tel" 
                    className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" 
                    id="telefono" 
                    name="telefono" 
                    placeholder="Ej: 300 1234567" 
                    required 
                    value={user.phone} 
                    onChange={(e) => setUser({...user, phone: e.target.value})} 
                />
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="password" className="text-sm text-gray-500">Contraseña</label>
                <input 
                    type="password" 
                    className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" 
                    id="password" 
                    name="password" 
                    placeholder="Crea una contraseña" 
                    required 
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                />
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="confirmPassword" className="text-sm text-gray-500">Confirmar Contraseña</label>
                <input 
                    type="password" 
                    className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="Repite tu contraseña" 
                    required 
                    value={user.confirmPassword}
                    onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                />
            </div>
        </fieldset>
        <div className="my-1 space-y-1 text-sm">
            <p>¿Ya tienes una cuenta? <Link href={"/auth/login"} className="underline text-blue-500">Iniciar Sesión</Link></p>
        </div>
        <div>
            <button className="w-full bg-columbia-blue text-black p-2 rounded mt-5 hover:bg-columbia-blue/80 transition-colors duration-150 uppercase font-bold cursor-pointer">Registrarme</button>
        </div>
    </form>
  )
}