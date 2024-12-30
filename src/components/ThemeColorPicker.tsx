"use client";
import { useState } from "react";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global Components
import { Button } from "@/components/common";

const ThemeColorPicker: React.FC = () => {
  const { tones, toggleTheme, updateStageColor } = useThemeController();
  const [accordionOpen, setAccordionOpen] = useState(false);
  const toggleAccordion = () => setAccordionOpen((prev) => !prev);

  return (
    <section className="space-y-2">
      <header
        className={`${tones.borderColor.normal} border-y-4 flex justify-between items-center py-1 pl-2 pr-4 md:pr-2 cursor-pointer`}
        onClick={toggleAccordion}
      >
        <h3 className="text-stone-900 dark:text-stone-200 text-xl uppercase font-bold">cambiar colores</h3>
        <span>{accordionOpen ? "▲" : "▼"}</span>
      </header>

      {accordionOpen && (
        <>
          <Button
            onClick={toggleTheme}
            text={"cambiar tema"}
          />

          <div className="flex flex-wrap gap-2 bg-">
            {["pink", "red", "blue", "cyan", "sky", "yellow", "white", "black"].map((color) => (
              <Button
                key={color}
                onClick={() => updateStageColor(color as any)}
                text={"escenario " + color}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export { ThemeColorPicker };
