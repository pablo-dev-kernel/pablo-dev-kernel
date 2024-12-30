"use client";
import { useState } from "react";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global Components
import { Button } from "@/components/common";
import { InputSelect } from "@/components/form";

const COLOR_OPTIONS = [
  { key: "blue", value: "blue" },
  { key: "red", value: "red" },
  { key: "green", value: "green" },
  { key: "yellow", value: "yellow" },
  { key: "pink", value: "pink" },
  { key: "cyan", value: "cyan" },
  { key: "sky", value: "sky" },
];

const ThemeColorPicker: React.FC = () => {
  const { tones, toggleTheme, updateStageColor } = useThemeController();
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [colorOption, setColorOption] = useState(COLOR_OPTIONS[0].key);
  const toggleAccordion = () => setAccordionOpen((prev) => !prev);

  const handleColorOptions = (data: string) => {
    console.table(data)
    setColorOption(data);
    updateStageColor(data);
  };

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
            <InputSelect
              label={"selector de colores"}
              name={"colorPicker"}
              onChange={handleColorOptions}
              options={COLOR_OPTIONS}
              value={colorOption}
            />
          </div>
        </>
      )}
    </section>
  );
};

export { ThemeColorPicker };
