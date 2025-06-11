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
      <body className={`${Roboto.className} bg-white-smoke`}>
        <HeaderComponent />

        {children}
      </body>
    </html>
  );
}
