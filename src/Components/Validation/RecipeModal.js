import React from 'react';
import './RecipeModal.css';
import { useNavigate } from 'react-router-dom';

const RecipeModal = ({ recipe, onClose }) => {
  const navigate = useNavigate();
  const { image,  title, rating, ingredients, instruction } = recipe;

  const handleClose = () => {
    console.log('Close button clicked');
    onClose();
    navigate('');
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        {image ? (
          <video controls className="modal-video">
            <source src={image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={image} alt={title} className="modal-image" />
        )}
        <h2>{title}</h2>
        <p><strong>Ingredients:</strong> {ingredients}</p>
        <p><strong>Instructions:</strong> {instruction}</p>
        
      </div>
    </div>
  );
};

export default RecipeModal;
