import { ArtistCard } from '../types/ArtistCard';

export const saveCardsToLocalStorage = (cards: ArtistCard[]): void => {
  try {
    localStorage.setItem('artistCards', JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving cards to localStorage:', error);
  }
};

export const loadCardsFromLocalStorage = (): ArtistCard[] => {
  try {
    const cardsJSON = localStorage.getItem('artistCards');
    return cardsJSON ? JSON.parse(cardsJSON) : [];
  } catch (error) {
    console.error('Error loading cards from localStorage:', error);
    return [];
  }
};