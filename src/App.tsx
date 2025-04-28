import { useState, useEffect } from 'react';
import CardForm from './components/CardForm';
import CardGrid from './components/CardGrid';
import ThemeToggle from './components/ThemeToggle';
import { ArtistCard } from './types/ArtistCard';
import { generateId } from './utils/helpers';
import { saveCardsToLocalStorage, loadCardsFromLocalStorage } from './utils/localStorage';
import { Save, Download } from 'lucide-react';
import './App.css';

function App() {
  const [cards, setCards] = useState<ArtistCard[]>([]);
  const [editingCard, setEditingCard] = useState<ArtistCard | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load cards from localStorage on initial render
  useEffect(() => {
    const savedCards = loadCardsFromLocalStorage();
    if (savedCards.length > 0) {
      setCards(savedCards);
    }
  }, []);

  const handleAddCard = (cardData: Omit<ArtistCard, 'id'>) => {
    const newCard: ArtistCard = {
      ...cardData,
      id: generateId()
    };
    
    setCards(prevCards => [...prevCards, newCard]);
  };

  const handleEditCard = (card: ArtistCard) => {
    setEditingCard(card);
    setIsEditing(true);
  };

  const handleUpdateCard = (updatedCardData: Omit<ArtistCard, 'id'>) => {
    if (editingCard) {
      const updatedCards = cards.map(card => 
        card.id === editingCard.id 
          ? { ...updatedCardData, id: card.id } 
          : card
      );
      
      setCards(updatedCards);
      setIsEditing(false);
      setEditingCard(null);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCard(null);
  };

  const handleSaveAllCards = () => {
    saveCardsToLocalStorage(cards);
    alert('All cards saved successfully!');
  };

  const handleLoadCards = () => {
    const savedCards = loadCardsFromLocalStorage();
    if (savedCards.length > 0) {
      setCards(savedCards);
      alert('Cards loaded successfully!');
    } else {
      alert('No saved cards found.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Artist Trading Cards</h1>
        <ThemeToggle />
      </header>

      <main className="app-content">
        <section className="form-section">
          <CardForm 
            onSubmit={isEditing ? handleUpdateCard : handleAddCard}
            editingCard={editingCard}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
          />

          <div className="storage-actions">
            <button 
              onClick={handleSaveAllCards} 
              className="save-button"
              aria-label="Save all cards to local storage"
            >
              <Save size={20} />
              <span>Save All Cards</span>
            </button>
            <button 
              onClick={handleLoadCards} 
              className="load-button"
              aria-label="Load cards from local storage"
            >
              <Download size={20} />
              <span>Load Cards</span>
            </button>
          </div>
        </section>

        <section className="cards-section">
          <h2>Your Collection</h2>
          <CardGrid 
            cards={cards} 
            onEdit={handleEditCard} 
            onDelete={handleDeleteCard} 
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>Artist Trading Cards Collection © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;