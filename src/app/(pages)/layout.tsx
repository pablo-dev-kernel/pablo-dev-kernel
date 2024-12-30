"use client";
// Contaxts
import { ThemeProvider } from "@/libs/contexts/ThemeContext";
// import { AppConfig } from "@/utils/AppConfig";

export default function PagesLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // if (!AppConfig.locales.includes(props.params.pages)) notFound();
  return (
    <ThemeProvider>
      {props.children}
    </ThemeProvider>
  );
}
