import React, { useState, useEffect } from "react";
import Card from "./card.tsx";
import cardData from "./cardsData.json";
import { CardData } from "@/shared/types";

const Itinerary: React.FC = () => {
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    // Show one card on initial load
    handleRandomize();
  }, []);

  const handleRandomize = () => {
    const randomCardIndex = Math.floor(Math.random() * cardData.length);
    const randomCard = cardData[randomCardIndex];
    setCard(randomCard);
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className="mb-4 text-3xl font-bold">Let's Meet Here!</h1>
      {card && <Card card={card} />}
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        onClick={handleRandomize}
      >
        Randomize Card
      </button>
    </div>
  );
};

export default (Itinerary);
