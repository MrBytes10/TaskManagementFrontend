import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/components/AuthContext"; // for react context state management


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Management App",
  description: "A simple task management application built with Next.js and Tailwind CSS.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* this is the provider for the context, wrapa Navbar and the children*/}
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>{children}</AuthProvider>
//       </body>
//     </html>
//   );
// }
