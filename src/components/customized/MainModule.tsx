import { useRef, useState } from "react";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global components
import { Button } from "@/components/common";
import { IconMoreHoriz, IconMoreVert, } from "@/components/customized/";
import { PopupMenu } from "@/components/customized/PopupPortal";

interface MainModuleProps {
  children: React.ReactNode;
  moduleTitle: string;
  optionsButtons?: Array<React.ReactNode>;
  optionsMenu?: Array<React.ReactNode>;
}

const MainModule = ({
  children,
  moduleTitle,
  optionsButtons,
  optionsMenu
}: MainModuleProps) => {
  const { tones } = useThemeController();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <main className={`bg-stone-300/90 dark:bg-stone-950/90 outline outline-4 ${tones.outlineColor.normal} md:rounded-lg lg:mx-auto h-full w-full lg:w-3/4 grid grid-rows-[auto_1fr] overflow-hidden transition-all`}>
      <header className={`${tones.bgColor.dark} outline outline-4 ${tones.outlineColor.normal} p-1 md:px-2 flex justify-between items-center md:rounded-t-lg`}>
        <h2 className="capitalize text-2xl">{moduleTitle}</h2>

        <div className="flex space-x-2 md:space-x-4">
          {optionsButtons?.length &&
            <ul className="flex space-x-2 md:space-x-4">
              {optionsButtons.map((option, i) => <li key={i}>{option}</li>)}
            </ul>
          }

          {optionsMenu?.length && (
            <>
              <Button
                ref={buttonRef}
                title={"Menu Options"}
                rightIcon={isMenuOpen ? <IconMoreVert /> : <IconMoreHoriz />}
                onClick={() => setIsMenuOpen(true)}
              />

              <PopupMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                options={optionsMenu}
                position={"bottom right"}
                triggerRef={buttonRef}
              />
            </>
          )}
        </div>
      </header>

      <section className="overflow-y-auto transition-all">
        {children}
      </section>
    </main>
  );
}

export { MainModule };
