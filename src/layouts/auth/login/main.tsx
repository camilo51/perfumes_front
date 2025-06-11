"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { Designer } from "@/app/layout";

export default function Main() {

    const router = useRouter();
    const defaultValues = {
        email: "",
        password: ""
    }

    const [values, setValues] = useState(defaultValues);

    useEffect(() => {
        const userData = localStorage.getItem("USER");
        if (userData) {
            const user = JSON.parse(userData);
            if (user.role === 1) {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users/login`, values)
            toast.success(data.message || "Inicio de sesión exitoso");
            localStorage.setItem("USER", JSON.stringify(data.user));
            setValues(defaultValues);
            router.push(data.user.role === 1 ? "/admin/dashboard" : "/");
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || "Error al iniciar sesión");
            }
        }
    }

  return (
    <form className="w-5/12 shadow-lg mx-auto p-5 mt-10 rounded" onSubmit={handleSubmit}>
        <fieldset>
            <legend className={`${Designer.className} text-2xl text-center my-5`}>Iniciar Sesión</legend>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="email" className="text-sm text-gray-500">Correo Electrónico</label>
                <input type="email" className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" id="email" name="email" placeholder="Correo Electrónico" required value={values.email} onChange={(e) => setValues({...values, email: e.target.value})} />
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="password" className="text-sm text-gray-500">Contraseña</label>
                <input type="password" className="bg-white p-2 rounded shadow-sm placeholder:text-gray-300" id="password" name="password" placeholder="Contraseña" required value={values.password} onChange={(e) => setValues({...values, password: e.target.value})} />
            </div>
        </fieldset>
        <div className="my-1 space-y-1 text-sm">
            <p>¿Olvidaste tu contraseña? <Link href={"/auth/forgot"} className="underline text-blue-500">Recuperar Contraseña</Link></p>
            <p>¿Todavía no tienes una cuenta? <Link href={"/auth/register"} className="underline text-blue-500">Registrarme</Link></p>
        </div>
        <div>
            <button className="w-full bg-columbia-blue text-black p-2 rounded mt-5 hover:bg-columbia-blue/80 transition-colors duration-150 uppercase font-bold cursor-pointer">Ingresar</button>
        </div>
    </form>
  )
}