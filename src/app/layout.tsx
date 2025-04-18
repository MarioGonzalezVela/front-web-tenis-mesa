import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: 'Web Tenis de Mesa',
  description: 'Proyecto Next.js para tenis de mesa',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}

