import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const navigate = useNavigate(); 
  const [formdata, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [conf_pass, Setconf_pass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkValidation = () => {
    if (!formdata.username || !formdata.email || !formdata.password || !conf_pass) {
      toast.warning("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email.toLowerCase())) {
      toast.warning("Please enter a valid email", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    }

    if (formdata.password !== conf_pass) {
      toast.warning("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidation()) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('https://recipemanager-ma43.onrender.com/register', formdata);
      console.log("Response:", response.data);
      
      toast.success("Registration Successful!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });

      setFormData({ username: '', email: '', password: '' });
      Setconf_pass("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage = err.response?.data?.message || "Registration failed. Try again!";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/bg.jpg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="container shadow bg-light p-4" style={{ width: '30%', borderRadius: '10px' }}>
        <h2 className="text-center">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Enter Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formdata.username}
              onChange={handleInput}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group mb-3">
            <label>Enter Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formdata.email}
              onChange={handleInput}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group mb-3">
            <label>Enter Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formdata.password}
              onChange={handleInput}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group mb-3">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="conf_password"
              className="form-control"
              value={conf_pass}
              onChange={(e) => Setconf_pass(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-success d-flex mx-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;