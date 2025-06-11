import { Metadata } from "next";
import Main from "@/src/layouts/auth/login/main";

export const metadata: Metadata = {
  title: "Iniciar Sesión"
}

export default function Login() {
  return <Main />
}