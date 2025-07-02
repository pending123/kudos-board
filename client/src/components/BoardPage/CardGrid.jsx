import React from "react";
import Card from "./Card";

const CardGrid = ({ cards, onUpvote, onDelete }) => {
    return (
        <div className="cards-grid">
            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Card
                        key={card.cardId}
                        card={card}
                        onUpvote={() => onUpvote(card.cardId)}
                        onDelete={() => onDelete(card.cardId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardGrid;