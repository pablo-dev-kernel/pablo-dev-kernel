import { useState } from "react";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Components
import { Button } from "@/components/common";
// Local Data
import { techSkills } from "../data/dataDev";
// Lang
import dataLeng from "../lang-es.json";

const SkillsDev: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"lenguages" | "frameworks" | "libraries" | "operatingSystems" | "programs" | "others">("lenguages");

  const handleTabClick = (tab: "lenguages" | "frameworks" | "libraries" | "operatingSystems" | "programs" | "others") => {
    setActiveTab(tab);
  };

  const currentSkills = techSkills[activeTab];

  const { UI_COLORS } = useThemeController();

  const tabOptions: ("lenguages" | "frameworks" | "libraries" | "operatingSystems" | "programs")[] = ["lenguages", "frameworks", "libraries", "operatingSystems", "programs"];

  return (
    <section className={`${UI_COLORS.container} rounded-xl p-2 md:p-4 space-y-4 overflow-hidden`}>
      <header>
        <h2 className="text-3xl font-bold text-center">{dataLeng.skillsDev.header.title}</h2>
        <h3>{dataLeng.skillsDev.header.subtitle}</h3>
      </header>

      <div className="flex justify-center space-x-4">
        {tabOptions.map((tab, index) => (
          <Button
            key={index}
            text={tab}
            onClick={() => handleTabClick(tab)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSkills.length > 0 ? (
          currentSkills.map((skill) => (
            <article
              key={skill.title}
              className={`${UI_COLORS.card} p-4 rounded-md`}
            >
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-sm mb-4">{skill.subtitle}</p>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-600">{dataLeng.skillsDev.noSkills}</p>
        )}
      </div>
    </section>
  );
};

export { SkillsDev };
