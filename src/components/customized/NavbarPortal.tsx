"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global Components
import { Button } from "@/components/common";
import { ThemeColorPicker } from "@/components/ThemeColorPicker";
// Icons
import { MenuCloseIcon, MenuOpenIcon } from "@/utils/icons";

// <body>: <div id="navbar-portal-root"></div>

interface NavbarPortalProps {
  defaultRoute?: string;
  listRoutes: Array<{
    url: string,
    label: string,
    icon?: React.ReactNode
  }>;
  othersRoutes?: Array<{
    url: string,
    label: string,
    icon?: React.ReactNode
  }>;
};

const NavbarPortal: React.FC<NavbarPortalProps> = ({
  defaultRoute = "",
  listRoutes = [],
  othersRoutes = [],
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const pathname = usePathname();

  const handleOpenMenu = () => setOpenMenu(true);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
    handleCloseAccordion();
  }, []);

  const handleOpenAccordion = () => setAccordionOpen((prev) => !prev);

  const handleCloseAccordion = () => setAccordionOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openMenu) handleCloseMenu();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu, handleCloseMenu]);

  const { tones } = useThemeController();

  const menuContent = (
    <div className="bg-stone-950/90 h-screen w-screen fixed top-0 left-0 z-30">
      <nav className={`bg-stone-300 dark:bg-stone-900 h-screen w-4/5 sm:w-2/4 md:w-1/3 lg:w-1/4 ${tones.borderColor.normal} border-l-4 border-y-4 rounded-l-xl absolute top-0 right-0 space-y-2 flex flex-col md:px-2 transition-all`}>
        <header className={`${tones.borderColor.normal} border-b-4 flex justify-between items-center py-1 px-2`}>
          <h2 className="text-stone-900 dark:text-stone-200 text-xl uppercase font-bold">menú</h2>

          <Button
            title={"cerrar menú (Esc)"}
            text={"cerrar"}
            rightIcon={<MenuCloseIcon />}
            onClick={handleCloseMenu}
          />
        </header>

        <section>
          <ul className="text-stone-900 dark:text-stone-200 font-semibold space-y-1">
            {listRoutes.map((route, i) => (
              <li key={i}>
                <Link
                  href={defaultRoute + route.url}
                  onClick={handleCloseMenu}
                  className={`
                    text-xl py-1 px-2 flex items-center space-x-2
                    ${pathname === "/" + route.url ?
                      `${tones.bgColor.normal} text-stone-200` :
                      "hover:bg-stone-400 hover:dark:bg-stone-700"}
                  `}
                >
                  {route.icon} {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {othersRoutes.length > 0 && (
          <section>
            <header
              className={`${tones.borderColor.normal} border-y-4 flex justify-between items-center py-1 pl-2 pr-4 md:pr-2 cursor-pointer`}
              onClick={handleOpenAccordion}
            >
              <h3 className="text-stone-900 dark:text-stone-200 text-xl uppercase font-bold">otras rutas</h3>

              <span>{accordionOpen ? "▲" : "▼"}</span>
            </header>

            {accordionOpen && (
              <ul className="space-y-2 text-stone-900 dark:text-stone-200 font-semibold">
                {othersRoutes.map((route, i) => (
                  <li key={i}>
                    <Link
                      href={defaultRoute + route.url}
                      onClick={handleCloseMenu}
                      className={`
                      text-xl py-1 px-2 flex items-center space-x-2
                      ${pathname === "/" + route.url ?
                          `${tones.bgColor.normal} text-stone-200` :
                          "hover:bg-stone-400 hover:dark:bg-stone-700"}
                    `}
                    >
                      {route.icon} {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <ThemeColorPicker />
      </nav>
    </div>
  );

  return (
    <>
      <Button
        title={"abrir menú"}
        text={"menú"}
        rightIcon={<MenuOpenIcon />}
        onClick={handleOpenMenu}
        styles="fixed top-2 right-2"
      />

      {openMenu && createPortal(menuContent, document.getElementById("navbar-portal-root")!)}
    </>
  );
};

export { NavbarPortal };
