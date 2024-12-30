"use client";
import { useRef, useState } from "react";
import Link from "next/link";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global Components
import { Button } from "@/components/common";
// Local Data
import { dataYB } from "./data/dataYT";
// Lang
import dataLeng from "./lang-es.json";

const AboutScreen: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((expanded) => !expanded);
  };

  const contentRef = useRef(null);

  const { UI_COLORS } = useThemeController();

  return (
    <>
      <header>
        <h2 className="text-stone-100 text-5xl text-center uppercase font-bold">{dataLeng.about.header}</h2>
      </header>

      <section className={`${UI_COLORS.container} rounded-xl p-2 md:p-4 space-y-4`}>
        <p>
          <span className="ml-4">{dataLeng.about.introduction.welcome} <strong className="italic text-xl">Pablo</strong></span> y bienvenidos a mi página en GitHub.<br />
          He optado por brindar solamente mi nombre para proteger mi información, privacidad y la de mi entorno.<br />
          Busco captar la atención de reclutadores que necesiten desarrolladores con experiencia para unirse a sus equipos y aportar soluciones, respeto y lealtad.
        </p>

        <p className="grid gap-4">
          <span><strong className="text-xl italic ml-4">Mi objetivo</strong> es incorporarme a los equipos que necesiten desarrolladores de confianza para escalar sus proyectos.</span>
          <span><strong className="text-xl italic ml-4">Tengo experiencia</strong> en educación y formación, aportes en sistemas de uso público/privado, y diseño de interfaces de usuario centradas en la experiencia.</span>
        </p>

        <p><strong className="text-xl italic ml-4">Ser uno con el equipo</strong> es lo que me ayudara hará crecer.</p>
        <p><strong className="text-xl italic ml-4">Soy feliz programando</strong>, disfrutaré construyendo y brindando soporte a cualquier proyecto, sistema o programa.</p>


        <p>
          <span className="ml-4">Una mencion a <strong className="text-xl italic">mis mentores</strong></span>, todos creadores de contenido en YouTube. Quiero expresar mi gratitud hacia quienes dedican su tiempo a instruir e inspirar.
        </p>

        <div
          ref={contentRef}
          className={`${expanded ? 'max-h-[500px]' : 'max-h-0'} overflow-y-scroll transition-[max-height] duration-500 ease-in-out`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto">
            {Object.entries(dataYB).map(([category, links]) => (
              <article key={category} className="p-4">
                <h3 className="text-2xl capitalize">{category}</h3>

                <ul className="list-disc list-inside mt-2 space-y-1">
                  {links.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 hover:underline font-bold">
                        {link.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={toggleExpand}
            text={expanded ? 'Mostrar menos' : 'Mostrar más'}
          />
        </div>

        <p>
          <span className="ml-4">Este blog está en crecimiento</span>. Próximamente encontrarán más contenido, desde pequeñas aplicaciones, notas de estudio y proyectos de programación.
        </p>

        <p className="text-xl font-bold text-center uppercase">¡Gracias por visitar!</p>
      </section>
    </>
  );
};

export { AboutScreen };
