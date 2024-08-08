// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Firstpg from './Components/FirstPage/Firstpg';
import ViewRecipe from './Components/ViewRecipe/ViewRecipe';  // Create this component
import AddRecipe from './Components/AddRecipe/AddRecipe';    // Create this component
import './App.css';
import Validation from './Components/Validation/Validation';
import AdmLogin from './Components/Validation/AdmLogin';
import Login from './Components/AddRecipe/Login';
import Signup from './Components/AddRecipe/Signup';
import Breakfast from './Components/ViewRecipe/Breakfast/Breakfast';
import Lunch from './Components/ViewRecipe/Lunch/Lunch';
import Snacks from './Components/ViewRecipe/Desserts/Snacks';
import Beverages from './Components/ViewRecipe/Beverages/Dinner';
import Mainpg from './Components/ViewRecipe/Breakfast/Mainpg';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Firstpg />} />
          <Route path="/ViewRecipe" element={<ViewRecipe />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/recipe/breakfast" element={<Breakfast/>}/>
          <Route path="/recipe/Mainpg" element={<Mainpg/>}/>
          <Route path="/recipe/lunch" element={<Lunch/>}/> 
          <Route path = "/Validation" element={<Validation/>}/>
          <Route path = "/AdmLogin" element={<AdmLogin/>}/>
          <Route path="/recipe/snacks" element={<Snacks/>}/>
          <Route path="/recipe/dinner" element={<Beverages/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
