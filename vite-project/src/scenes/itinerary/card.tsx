import React from "react";
import { CardData } from "@/shared/types";

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="m-2 h-64 w-1/2 rounded-lg border p-4 shadow-md">
      <h2 className="mb-2 text-xl font-bold">{card.title}</h2>
      <img
        className="mb-2 h-32 w-full object-cover"
        src={card.imageUrl}
        alt={card.title}
      />
      <p>{card.content}</p>
    </div>
  );
};

export default Card;
