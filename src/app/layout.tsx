import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: 'Web Tenis de Mesa',
  description: 'Proyecto Next.js para tenis de mesa',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

