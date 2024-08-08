import React from 'react';
import './RecipeModal.css';
import { useNavigate } from 'react-router-dom';

const RecipeModal = ({ recipe, onClose }) => {
  const navigate = useNavigate();
  const { image, title, rating, Ingredients, Instructions } = recipe; // Destructure Ingredients

  const handleClose = () => {
    onClose();
    console.log('Navigating back to the previous page');
    navigate(''); // Navigate back to the Breakfast page directly
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        <img src={image} alt={title} className="modal-image" />
        <h2>{title}</h2>
        <p><strong>Ingredients:</strong> {Ingredients}</p> {/* Display Ingredients */}
        <p><strong>Instructions:</strong> {Instructions}</p> {/* Display Ingredients */}
        <p><strong>Rating:</strong> {rating}</p>
      </div>
    </div>
  );
};

export default RecipeModal;
