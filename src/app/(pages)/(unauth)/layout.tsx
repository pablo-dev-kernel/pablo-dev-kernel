"use client";
import Link from "next/link";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global Components
import { NavbarPortal } from "@/components/customized/NavbarPortal";
// Icons
import { GitHubIcon, GmailIcon } from "@/utils/icons";

const links = [
  { url: `home`, label: "inicio" },
  { url: `resume`, label: "curriculum" },
  { url: `projects`, label: "proyectos" },
  { url: `memory-game`, label: "juegos" },
  { url: `about`, label: "sobre mí" },
];

export default function PagesLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { tones } = useThemeController();

  return (
    <div className={`bg-stone-200 dark:bg-stone-900 bg-fixed bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${tones.fromColor.dark} to-stone-950 text-stone-900 dark:text-stone-200 text-lg min-h-screen`}>
      <header className="flex justify-between items-center p-1 md:px-2">
        <Link href={"home"} title={"ir a inicio"}>
          <h1 className="text-stone-400 hover:text-stone-200 text-xl uppercase font-semibold">pablo-dev-kernel</h1>
        </Link>

        <NavbarPortal listRoutes={links} />
      </header>

      <main className="md:w-5/6 lg:w-2/3 my-10 md:mx-auto px-4 md:px-0 space-y-10">
        {props.children}
      </main>

      <footer className={`bg-stone-900 text-stone-200 border-t ${tones.borderColor.normal} space-y-4 p-4`}>
        <h3 className="text-3xl font-bold uppercase">
          informacin de contacto
        </h3>

        <div className="flex justify-center gap-4">
          <Link href="mailto:pablo.kernel.dev@gmail.com" title="Gmail" className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-2 border-white hover:${tones.borderColor.normal} rounded-xl`}>
            <GmailIcon width={48} height={48} />
          </Link>

          <Link href="https://github.com/pablo-kernel-dev" title="GitHub" target="_blank" className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-2 border-white hover:${tones.borderColor.normal} rounded-xl`}>
            <GitHubIcon width={48} height={48} />
          </Link>
        </div>

        <hr className="border-stone-700" />

        <div className="grid md:grid-cols-3 items-center">
          <p className="text-sm text-stone-400">
            DESARROLLADOR POR<br />
            <Link href={"https://github.com/pablo-kernel-dev"} target="_blank" className="text-stone-200 text-xl hover:underline text-nowrap">pablo-kernel-dev</Link>.
          </p>

          <p className="text-center">
            Página impulsada con las tecnologías Next.js 15
          </p>

          <p className="text-sm text-stone-400 text-end">
            Ver. 1.0.2
          </p>
        </div>
      </footer>
    </div>
  );
}
