"use client";
import Link from "next/link";
import Image from "next/image";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Icons
import { GitHubIcon, GmailIcon } from "@/utils/icons";
// Local Components
import { SkillsDev } from "./components/SkillsDev";
// Pictures
import photoProfile from "@/utils/images/profile.png";
// Lang
import dataLeng from "./lang-es.json";

// &quot; = ""

const HomeScreen: React.FC = () => {
  const { tones } = useThemeController();

  return (
    <>
      <section className="text-stone-200 p-2 md:p-4 space-y-2">
        <p className="text-center">
          <strong className="text-3xl md:text-5xl text-nowrap md:pl-4 mr-2">{dataLeng.home.welcomeMessage}</strong>
          <br className="md:hidden" />
          <span className="text-xl md:text-2xl text-nowrap">{dataLeng.home.introText}</span>
        </p>

        <div className="md:px-10">
          <figure className={`float-right md:float-left outline ${tones.outlineColor.normal} h-48 w-48 rounded-full m-2 md:m-4 overflow-hidden`}>
            <Image src={photoProfile} alt="photo profile" />
          </figure>

          <div>
            <p className="md:text-xl">
              <span className="ml-4"></span>
              {dataLeng.home.description.commitment} <strong className="text-xl italic">{dataLeng.home.description.name}</strong>. {dataLeng.home.description.role}<br />
              {dataLeng.home.description.commitment}.
            </p>

            <hr className={`border ${tones.borderColor.normal} rounded-xl my-2`} />

            <div className="flex justify-center gap-4">
              <Link href="mailto:pablo.kernel.dev@gmail.com" title="Gmail" className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-2 border-white hover:${tones.borderColor.normal} rounded-xl`}>
                <GmailIcon width={48} height={48} />
              </Link>

              <Link href="https://github.com/pablo-kernel-dev" title="GitHub" target="_blank" className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-2 border-white hover:${tones.borderColor.normal} rounded-xl`}>
                <GitHubIcon width={48} height={48} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SkillsDev />
    </>
  );
};

export { HomeScreen };