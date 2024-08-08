import React, { useState, useRef, useEffect } from 'react';
import './Dinner.css';
import { useNavigate } from 'react-router-dom';
import RecipeModal from './RecipeModal';
import axios from 'axios';

const Breakfast = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Fetch recipes from the backend
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recipe'); // Adjust the API endpoint as needed
        console.log('Fetched recipes:', response.data); // Log fetched recipes
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleBack = () => {
    navigate('/ViewRecipe');
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    navigate('/breakfast');
  };

  const handleMouseEnter = (videoElement) => {
    if (videoElement) {
      videoElement.play();
    }
  };

  const handleMouseLeave = (videoElement) => {
    if (videoElement) {
      videoElement.pause();
    }
  };

  const approvedRecipes = recipes.filter(recipe => recipe.status === 1 && recipe.category === 'Beverages');
  console.log('Approved recipes for breakfast:', approvedRecipes); // Log filtered recipes

  return (
    <>
      <div><h1>VEGETARIAN RECIPE</h1></div>
      <div className="recipe-container">
        {approvedRecipes.map((recipe, index) => (
          <div 
            className="recipe-card" 
            key={index} 
            onClick={() => handleRecipeClick(recipe)}
          >
            {recipe.video ? (
              <video 
                style={{ height: '280px', width: '95%' }} 
                controls 
                onMouseEnter={(e) => handleMouseEnter(e.target)} 
                onMouseLeave={(e) => handleMouseLeave(e.target)}
              >
                <source src={recipe.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img style={{ height: '260px' }} src={recipe.image} alt={recipe.title} className="recipe-image" />
            )}
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>Rating: {recipe.rating}</p>
            </div>
          </div>
        ))}
        <button onClick={handleBack} className='backButton'>Back</button>
      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Breakfast;
