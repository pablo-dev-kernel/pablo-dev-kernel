import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pablo Dev Kernel",
  description: "Desarrollador de aplicaciones móviles y web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <div id="popup-portal-root"></div> {/* z-10 */}
        <div id="modal-portal-root"></div> {/* z-20 */}
        <div id="navbar-portal-root"></div> {/* z-30 */}
      </body>
    </html>
  );
}
