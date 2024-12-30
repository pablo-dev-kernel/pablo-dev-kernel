import { ToDoListScreen } from "./to-do-list";

const ProjectsScreen: React.FC = () => {
  return (
    <>
      <header>
        <h2 className="text-stone-100 text-5xl text-center uppercase font-bold">proyectos</h2>
      </header>

      <ToDoListScreen />
    </>
  );
}

export { ProjectsScreen };