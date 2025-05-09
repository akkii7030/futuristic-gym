import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "NEXUS Fitness - The Future of Fitness",
  description:
    "Experience the next evolution in fitness with cutting-edge equipment, personalized training, and a community that pushes you beyond your limits.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black font-sans antialiased"  data-new-gr-c-s-check-loaded="14.1234.0"
                        data-gr-ext-installed="">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
