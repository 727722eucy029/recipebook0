import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddRecipe.css';
import axios from 'axios';

const AddRecipe = () => {
  //used to set fields in database
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState('');
  const [img, setImg] = useState('');

  const [category, setCategory] = useState('');
  const [recipeId, setRecipeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('scroll');
    return () => {
      document.body.classList.remove('scroll');
    };
  }, []);

  useEffect(() => {
    //used to set the data according to the change
    if (location.state && location.state.recipe) {
      const { id, title, description, ingredients, instruction, image,img, category } = location.state.recipe;
      setRecipeId(id);
      setTitle(title);
      setDescription(description);
      setIngredients(ingredients);
      setInstruction(instruction);
      setImage(image);
      setImg(img);
      setCategory(category);
    }
  }, [location.state]);

  useEffect(() => {
    if (isSubmitted) {
      alert('Recipe submitted successfully');
      navigate('/ViewRecipe');
    }
  }, [isSubmitted, navigate]);

  const handleChange = (e) => {
    //used to handle change
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    if (name === 'ingredients') setIngredients(value);
    if (name === 'instruction') setInstruction(value);
    if (name === 'image') setImage(value);
    if (name === 'img') setImg(value);
    if (name === 'category') setCategory(value);
  };

  const handleSubmit = async (e) => {
    //function for submitting the form
    e.preventDefault();
    try {
      if (recipeId) {
        const response = await axios.put(`http://localhost:8080/api/recipe/${recipeId}`, {
          title,
          description,
          ingredients,
          instruction,
          image,
          img,
          category
        });
        if (response.status === 200) {
          setIsSubmitted(true);
        } else {
          setErrors({ apiError: 'Server error occurred' });
        }
      } else {
        const response = await axios.post('http://localhost:8080/api/recipe', {
          title,
          description,
          ingredients,
          instruction,
          image,
          img,
          category
        });
        if (response.status === 200 || response.status === 201) {
          setIsSubmitted(true);
        } else {
          setErrors({ apiError: 'Server error occurred' });
        }
      }
    } catch (error) {
      setErrors({ apiError: 'An error occurred while submitting the recipe.' });
    }
  };

  const handleBack = () => {
    //navigation to the previous page
    navigate('/');
  };

  return (
    //main page code
    <div className="container">
      <video autoPlay loop muted className="videoBackground">
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>SAVORY STORIES</h1>
      <h2>{recipeId ? 'Edit Recipe' : 'Add Recipe'}</h2>
      
      <form onSubmit={handleSubmit} className="form">
        {/*form for adding recipe*/}
        <div className="formGroup">
          <label className="label">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            className="textarea"
          />
        </div>
        <div className="formGroup">
          <label className="label">Ingredients:</label>
          <textarea
            name="ingredients"
            value={ingredients}
            onChange={handleChange}
            required
            className="textarea"
          />
        </div>
        <div className="formGroup">
          <label className="label">Instructions:</label>
          <textarea
            name="instruction"
            value={instruction}
            onChange={handleChange}
            required
            className="textarea"
          />
        </div>
        <div className="formGroup">
          <label className="label">Video:</label>
          <textarea
            name="image"
            value={image}
            onChange={handleChange}
            required
            className="textarea"
          />
        </div>
        <div className="formGroup">
          <label className="label">Image:</label>
          <textarea
            name="img"
            value={img}
            onChange={handleChange}
            required
            className="textarea"
          />
        </div>
        <div className="formGroup">
          <label className="label">Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            required
            className="select"
          >
            <option value="">Select Category</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Beverages">Beverages</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        {errors.apiError && <p className="error">{errors.apiError}</p>}
        <button type="submit" className="submitButton">{recipeId ? 'Update' : 'Submit'}</button>
      </form>
      <button onClick={handleBack} className="backButton">Back</button>
    </div>
  );
};

export default AddRecipe;
