import Link from "next/link";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Components
import { Button } from "@/components/common";
// Lang
import dataLeng from "./lang-es.json";

const ResumeScreen: React.FC = () => {
  const { UI_COLORS } = useThemeController();

  const ListWorkExperience: React.FC = () =>
    dataLeng.data.work_experience.map((work, index) => (
      <article key={index} className={`${UI_COLORS.cardWhite} grid px-2 py-1 rounded-xl`}>
        <h4 className="text-2xl font-bold text-balance">{work.company}</h4>
        <h5 className="text-stone-700 text-xl text-balance">{work.title}</h5>
        <p className="text-sm font-bold text-right italic">{work.date}</p>
      </article>
    ));

  const ListEducations: React.FC = () =>
    dataLeng.data.educations.map((dataEducation, index) => (
      <article key={index} className={`${UI_COLORS.cardWhite} grid px-2 py-1 rounded-xl`}>
        <h4 className="text-2xl font-bold text-center text-balance">{dataEducation.description}</h4>
        <p className="text-stone-700 text-xl text-center text-balance">{dataEducation.title}</p>
      </article>
    ));

  interface LayoutContainerProps {
    title: string;
    children: React.ReactNode;
  }

  const LayoutContainer: React.FC<LayoutContainerProps> = ({ title, children }) => (
    <section className="space-y-2">
      <header>
        <h3 className="text-center font-bold text-3xl uppercase">{title}</h3>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </section>
  );

  return (
    <div className={`${UI_COLORS.containerWhite} rounded-xl p-2 md:p-4 space-y-4 print:p-0 print:outline-0`}>
      <header className="grid sm:grid-cols-2 sm:items-center">
        <h2 className="text-4xl font-black text-center sm:text-left uppercase underline">
          {dataLeng.titles.cv}
        </h2>

        <div className="flex md:flex-col flex-wrap justify-center gap-x-6">
          {dataLeng.personal_info.professions.map((info, index) => (
            <h3 key={index} className="text-stone-600 text-xl md:text-2xl font-bold text-center sm:text-right text-nowrap uppercase">
              {info}
            </h3>
          ))}
        </div>
      </header>

      <section className="grid sm:grid-cols-2 gap-2">
        <div>
          <p>
            <span className="capitalize">{`${dataLeng.personal_info.fullnameTitle}: `}</span>
            <strong className="text-xl">{dataLeng.personal_info.fullname}</strong>
          </p>

          <p>
            <span className="capitalize">{`${dataLeng.personal_info.nationalityTitle}: `}</span>
            <strong className="text-xl">{dataLeng.personal_info.nationality}</strong>
          </p>

          <p>
            <span className="capitalize">{`${dataLeng.personal_info.mailTitle}: `}</span>
            <Link
              href={`mailto:${dataLeng.personal_info.mailUrl}`}
              className="hover:text-cyan-700 hover:underline"
              title={`Enviar e-mail a ${dataLeng.personal_info.mailName}`}
              aria-label={`Send E-mail to ${dataLeng.personal_info.mailName}`}
            >
              <strong className="text-xl">{dataLeng.personal_info.mailName}</strong>
            </Link>
          </p>

          <p>
            <span className="capitalize">{`${dataLeng.personal_info.githubTitle}: `}</span>
            <Link
              href={dataLeng.personal_info.githubUrl}
              className="hover:text-cyan-700 hover:underline"
              target="_blank"
              title={`Link a ${dataLeng.personal_info.githubName}`}
              aria-label={`Link to ${dataLeng.personal_info.githubName}`}
            >
              <strong className="text-xl">{dataLeng.personal_info.githubName}</strong>
            </Link>
          </p>

          <p>
            <span className="capitalize">{`${dataLeng.personal_info.webSiteTitle}: `}</span>
            <Link
              href={dataLeng.personal_info.webSiteUrl}
              className="hover:text-cyan-700 hover:underline"
              target="_blank"
              title={`Link a ${dataLeng.personal_info.githubName}`}
              aria-label={`Link to ${dataLeng.personal_info.webSiteName}`}
            >
              <strong className="text-xl">
                {dataLeng.personal_info.webSiteName}
                <br />
                {dataLeng.personal_info.githubName}
              </strong>
            </Link>
          </p>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-xl font-bold pl-6">{dataLeng.personal_info.greeting1}</p>
            <p className="text-center text-balance">{dataLeng.personal_info.greetingResume}</p>
          </div>

          <div className="flex justify-center print:hidden">
            <a href="cv_pablo.pdf" download={"cv_pablo.pdf"} className="self-center">
              <Button text={"Descargar CV"} title={"Descargar Curriculum Vitae"} />
            </a>
          </div>
        </div>
      </section>

      <LayoutContainer title={dataLeng.titles.experience}>
        <ListWorkExperience />
      </LayoutContainer>

      <LayoutContainer title={dataLeng.titles.studies}>
        <ListEducations />
      </LayoutContainer>
    </div>
  );
};

export { ResumeScreen };