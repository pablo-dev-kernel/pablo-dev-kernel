// Local Components
import { MemoryGame } from "./memory-game";

const GamesScreen: React.FC = () => {
  return (
    <>
      <header>
        <h2 className="text-stone-100 text-5xl text-center font-bold uppercase">Juegos</h2>
      </header>

      <MemoryGame />
    </>
  );
}

export { GamesScreen };