import React from 'react';
import Card from './Card';
import { ArtistCard } from '../types/ArtistCard';

interface CardGridProps {
  cards: ArtistCard[];
  onEdit: (card: ArtistCard) => void;
  onDelete: (id: string) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onEdit, onDelete }) => {
  if (cards.length === 0) {
    return (
      <div className="empty-state card-grid">
        <p>No artist cards yet. Create your first card above!</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {cards.map(card => (
        <Card 
          key={card.id} 
          card={card} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default CardGrid;