import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { AuthProvider } from "./context/AuthContext"

export const metadata: Metadata = {
  title: "Web Tenis de Mesa",
  description: "Proyecto Next.js para tenis de mesa",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

