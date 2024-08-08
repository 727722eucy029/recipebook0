import React from 'react';
import './Appbar.css';

function Appbar() {
  return (
    <div>
      <div className="app-bar">
        {/* <div className="logo"> 
          <img src="path_to_logo_image" alt="Logo" />
        </div>*/}
        <div className="nav">
          <h2>KITCHEN CHRONICLES</h2>
          The Recipe Book
          {/* <div className="sub-bar">
        <h5>Savor the Flavor: Mouth-Watering Recipes for Every Occasion!</h5>
        </div> */}
          {/* <a href="#">Recipes</a>
          <a href="#">Collections</a>
          <a href="#">Tips</a>
          <a href="#">Recipe Partners</a> */}
        </div>
        <div className="search">
          <input type="text" placeholder="Find a recipe..." />
          <button type="submit" className='btn'>Q</button>
        </div>
        <div className="auth">
          {/* Login to add your recipe */}
          To upload your recipes and explore a world of flavors!
          <a href="/Login">Login</a>
          {/* <a href="#" className="register">Signup</a> */}
        </div>
        
      </div>
      
    </div>
  );
}

export default Appbar;
