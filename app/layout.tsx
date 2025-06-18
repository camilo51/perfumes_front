import localFont from "next/font/local";
import {Roboto as RobotoFont} from "next/font/google";

import "@/app/globals.css";
import HeaderComponent from "@/src/components/HeaderComponent";

export const Designer = localFont({
  src: "../public/fonts/Designer.otf",
  weight: "400",
  variable: "--font-designer",
})

export const Roboto = RobotoFont({
  subsets: ["latin"],
})

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${Roboto.className} bg-white-smoke grid min-h-[100dvh] grid-rows-[auto_1fr_auto]`}>
        <HeaderComponent />

        {children}

        <footer className="bg-columbia-blue py-5 text-center">
          <p>Todos los derechos reservados &copy;</p>
        </footer>
      </body>
    </html>
  );
}
