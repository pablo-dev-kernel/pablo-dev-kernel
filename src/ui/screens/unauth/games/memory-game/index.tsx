"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useThemeController } from "@/libs/hooks/useThemeController";
import { AngryIcon, CoolIcon, CryIcon, DevilIcon } from "./icons";
import { Button } from "@/components/common";

type SymbolType = "angry" | "cool" | "cry" | "devil";

const FLIP_DELAY = 1000;
const SYMBOLS: SymbolType[] = ["angry", "cool", "cry", "devil"];

interface CardProps {
  index: number;
  symbol: SymbolType;
  flipped: boolean;
  onClick: () => void;
}

const renderIcon = (symbol: SymbolType) => {
  const icons = {
    angry: <AngryIcon />,
    cool: <CoolIcon />,
    cry: <CryIcon />,
    devil: <DevilIcon />,
  };
  return icons[symbol];
};

const Card: React.FC<CardProps> = ({ index, symbol, flipped, onClick }) => {
  const { UI_COLORS, tones } = useThemeController();

  return (
    <div
      key={index}
      className={`h-36 rounded-xl flex items-center justify-center ${flipped ? tones.bgColor.normal : UI_COLORS.card
        } hover:outline ${tones.outlineColor.normal}`}
      onClick={onClick}
      role="button"
      aria-pressed={flipped}
      aria-label={flipped ? `Carta con símbolo ${symbol}` : "Carta oculta"}
    >
      {flipped ? renderIcon(symbol) : <span className="text-3xl">?</span>}
    </div>
  );
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame: React.FC = () => {
  const { UI_COLORS, tones } = useThemeController();
  const [cards, setCards] = useState<SymbolType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);

  const initializeGame = useCallback(() => {
    setCards(shuffleArray([...SYMBOLS, ...SYMBOLS]));
    setFlippedIndices([]);
    setMatchedIndices(new Set());
    setMoves(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardFlip = useCallback(
    (index: number) => {
      if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.has(index)) {
        return;
      }

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((prev) => prev + 1);

        const [first, second] = newFlipped;
        if (cards[first] === cards[second]) {
          setMatchedIndices((prev) => new Set([...prev, first, second]));
        }

        setTimeout(() => setFlippedIndices([]), FLIP_DELAY);
      }
    },
    [flippedIndices, matchedIndices, cards]
  );

  useEffect(() => {
    if (matchedIndices.size === cards.length && cards.length > 0) {
      const timeout = setTimeout(() => {
        alert(`¡Felicidades! Completaste el juego en ${moves} movimientos.`);
      }, FLIP_DELAY);

      return () => clearTimeout(timeout);
    }
  }, [matchedIndices.size, cards.length, moves]);

  const renderBoard = useMemo(
    () => (
      <div className="grid grid-cols-4 gap-4">
        {cards.map((symbol, index) => (
          <Card
            key={index}
            index={index}
            symbol={symbol}
            flipped={flippedIndices.includes(index) || matchedIndices.has(index)}
            onClick={() => handleCardFlip(index)}
          />
        ))}
      </div>
    ),
    [cards, flippedIndices, matchedIndices, handleCardFlip]
  );


  return (
    <section className={`${UI_COLORS.container} rounded-xl p-2 md:p-4 space-y-4`}>
      <header className={`border-b-4 ${tones.borderColor.normal} flex justify-between items-center pb-2`}>
        <h3 className="text-2xl">Juego de Memoria</h3>
        <p>Movimientos: {moves}</p>
        <Button onClick={initializeGame} text="Reiniciar" />
      </header>
      {renderBoard}
    </section>
  );
};

export { MemoryGame };
