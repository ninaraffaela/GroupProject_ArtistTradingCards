import React, { useState, useEffect } from "react";
import { ArtistCard } from "../types/ArtistCard";

interface CardFormProps {
  onSubmit: (card: Omit<ArtistCard, "id">) => void;
  editingCard: ArtistCard | null;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const CardForm: React.FC<CardFormProps> = ({
  onSubmit,
  editingCard,
  isEditing,
  onCancelEdit,
}) => {
  const [formData, setFormData] = useState<Omit<ArtistCard, "id">>({
    name: "",
    age: 0,
    genre: "",
    albumsSold: 0,
    origin: "",
    recordlabel: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (isEditing && editingCard) {
      const { id, ...rest } = editingCard;
      setFormData(rest);
    } else {
      setFormData({
        name: "",
        age: 0,
        genre: "",
        albumsSold: 0,
        origin: "",
        recordlabel: "",
        imageUrl: "",
      });
    }
  }, [isEditing, editingCard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({
        name: "",
        age: 0,
        genre: "",
        albumsSold: 0,
        origin: "",
        recordlabel: "",
        imageUrl: "",
      });
    }
  };

  return (
    <div className="card-form-container">
      <h2 className="form-title">
        {isEditing ? "Edit Artist Card" : "Create New Artist Card"}
      </h2>
      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-group">
          <label htmlFor="name">Artist Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Billie Eilish"
            aria-label="Artist name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age === 0 ? "" : formData.age}
            onChange={handleChange}
            required
            min={1}
            placeholder="e.g. 29"
            aria-label="Artist age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            placeholder="e.g. Pop, Rock, Hip-Hop"
            aria-label="Music genre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="albumsSold">Albums Sold (millions)</label>
          <input
            type="number"
            id="albumsSold"
            name="albumsSold"
            value={formData.albumsSold === 0 ? "" : formData.albumsSold}
            onChange={handleChange}
            required
            min={0}
            placeholder="e.g. 300"
            aria-label="Albums sold in millions"
          />
        </div>

        <div className="form-group">
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            placeholder="e.g. Los Angeles, USA"
            aria-label="Artist origin"
          />
        </div>

        <div className="form-group">
          <label htmlFor="recordlabel">Record Label</label>
          <input
            type="text"
            id="recordlabel"
            name="recordlabel"
            value={formData.recordlabel}
            onChange={handleChange}
            required
            placeholder="e.g. Universal Music"
            aria-label="Record label"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            aria-label="Artist image URL"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditing ? "Save Changes" : "Add Card"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CardForm;
