import React, { useState, useEffect, useRef } from 'react';
import './Validation.css';
import { useNavigate } from 'react-router-dom';
import RecipeModal from './RecipeModal';
import axios from 'axios';
import Appbar from '../ViewRecipe/Appbar';

const Validation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recipe');
        const recipes = response.data;
        setRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const generateThumbnails = () => {
      recipes.forEach((recipe, index) => {
        const video = document.createElement('video');
        video.src = recipe.video;
        video.crossOrigin = 'anonymous'; // Allow cross-origin requests if needed

        video.addEventListener('loadeddata', () => {
          if (video.readyState >= 2) { // Ensure the video has enough data to be playable
            video.currentTime = 1; // Capture the thumbnail at 1 second
          }
        });

        video.addEventListener('seeked', () => {
          if (video.readyState >= 2) { // Ensure the video has enough data to be playable
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL('image/png');
            setThumbnails((prevThumbnails) => ({
              ...prevThumbnails,
              [recipe.id]: thumbnail,
            }));
          }
        });

        video.addEventListener('error', (e) => {
          console.error(`Error loading video for recipe ${recipe.title}:`, e);
        });

        // Handle the case where video fails to load or no thumbnail is generated
        video.addEventListener('canplaythrough', () => {
          if (video.readyState >= 2) { // Ensure the video has enough data to be playable
            video.currentTime = 1; // Capture the thumbnail at 1 second
          }
        });
      });
    };

    if (recipes.length > 0) {
      generateThumbnails();
    }
  }, [recipes]);

  useEffect(() => {
    // Play all videos automatically after the recipes are set
    videoRefs.current.forEach((video) => {
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video is playing');
            })
            .catch((error) => {
              console.error('Error playing video:', error);
            });
        }
      }
    });
  }, [recipes]);

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

  const handleApprove = async (recipeId) => {
    try {
      const updatedRecipe = {
        ...recipes.find((recipe) => recipe.id === recipeId),
        status: 1,
      };

      await axios.put(`http://localhost:8080/api/recipe/${recipeId}`, updatedRecipe);
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, status: 1 } : recipe
        )
      );
      alert('Recipe approved successfully!');
    } catch (error) {
      console.error('Failed to approve recipe:', error);
      alert('Failed to approve recipe');
    }
  };

  const handleEdit = (recipe) => {
    navigate('/AddRecipe', { state: { recipe } });
  };

  return (
    <>
    <Appbar/>
      <div>
        <h1>ADMIN PAGE</h1>
      </div>
      <div className="recipe-container">
        {recipes.map((recipe, index) => (
          <div
            className="recipe-card"
            key={index}
            onClick={() => handleRecipeClick(recipe)}
          >
            <img src={`${recipe.img}`} className='rimg'/>
            {/* <video
              ref={(el) => (videoRefs.current[index] = el)}
              style={{ height: '280px', width: '95%' }}
              controls
              muted
              poster={thumbnails[recipe.id] || 'fallback-image.png'} // Use generated thumbnail or fallback image as poster
            >
              <source src={recipe.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>Description: {recipe.description}</p>
              <div className="button-container">
                {recipe.status !== 1 && (
                  <button onClick={() => handleApprove(recipe.id)} id="btn1">Approve</button>
                )}
                <button onClick={() => handleEdit(recipe)} id="btn">Edit Recipe</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="backButtonContainer">
        <button onClick={handleBack} className="backButton">
          Back
        </button>
      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Validation;
