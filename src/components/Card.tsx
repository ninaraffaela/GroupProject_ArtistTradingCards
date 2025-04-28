import React from 'react';
import { ArtistCard } from '../types/ArtistCard';
import { Pencil, Trash } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  card: ArtistCard;
  onEdit: (card: ArtistCard) => void;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`artist-card ${theme}`}>
      <div className="card-image-container">
        <img 
          src={card.imageUrl} 
          alt={`${card.name} portrait`} 
          className="card-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg';
          }}
        />
        <div className="card-shine"></div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{card.name}</h3>
        <div className="card-details">
          <p><span>Age:</span> {card.age}</p>
          <p><span>Genre:</span> {card.genre}</p>
          <p><span>Origin:</span> {card.origin}</p>
          <p><span>Record Label:</span> {card.recordlabel}</p>
          <p><span>Albums Sold:</span> {card.albumsSold}M</p>
        </div>
      </div>
      <div className="card-actions">
        <button 
          onClick={() => onEdit(card)} 
          className="edit-button"
          aria-label={`Edit ${card.name}`}
        >
          <Pencil size={16} />
        </button>
        <button 
          onClick={() => onDelete(card.id)} 
          className="delete-button"
          aria-label={`Delete ${card.name}`}
        >
          <Trash size={16} />
        </button>
      </div>
      <div className="card-footer">
        <span className="card-collector-number">#{card.id.substring(0, 5)}</span>
      </div>
    </div>
  );
};

export default Card;