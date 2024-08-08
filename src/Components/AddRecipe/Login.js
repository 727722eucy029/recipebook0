import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import img1 from '../Pictures/first.jpg';
import axios from 'axios';

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    //used to set form data
    userName: '',
    pass: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Add the no-scroll class to body when the component mounts
    document.body.classList.add('no-scroll');

    // Remove the no-scroll class from body when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleChange = (e) => {
    //used to handle change
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSign = () => {
    //used to navigate to signup page
    nav("/Signup");
  };
  const handleadm=()=>{
    //used to navigate to adm login page
    nav("/AdmLogin")
  }

  const handleSubmit = async (e) => {
    //used to handle submit
    e.preventDefault();
    const { userName, pass } = formData;
    
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      const user = response.data.find(user => user.userName === userName);
      
      if (user) {
        if (user.pass === pass) {
          setSuccess('Login successful!');
          nav("/AddRecipe");
        } else {
          setError('Invalid username or password');
          setSuccess(false);
        }
      } else {
        setSuccess(false);
        setError('User not found');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div id="firstimg" style={{ backgroundImage: `url(${img1})` }}>
      {/*Used to create a login form */}
      <form onSubmit={handleSubmit} className='log'>
        <div>
          <h1>Login</h1>
          <label>
            Username
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" id="btn">Login</button>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={handleSign} id="btsu">Not a member? Sign up now</button>
      <button onClick={handleadm} id="btsu">Admin</button>
    </div>
  );
};

export default Login;
