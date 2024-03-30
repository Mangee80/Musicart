import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from "react-router"
import Line from '../../assets/Line.png'

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        window.localStorage.setItem("user", responseData.user);
        window.localStorage.setItem("userID", responseData.userID);
        
        window.localStorage.setItem("MusicCartUsername", responseData.MusicCartUsername);
        window.localStorage.setItem("token", responseData.token);
        navigate("/");

      } catch (error) {
          alert("There was a problem with the request, please try again");
          console.log(error);
      }
    };

    const validateForm = (data) => {
      let errors = {};
      if (!data.identifier.trim()) {
        errors.identifier = "Please enter your identifier";
      }
      if (!data.password.trim()) {
        errors.password = "Please enter your password";
      }
      return errors;
    };
  
    return (
      <div className={styles.container}>

        <div className={styles.formContainer}>
            <h2 className={styles.h2}>Sign in</h2>
            <p className={styles.label}>Enter your identifier or mobile number</p>
            <input 
                className={styles.input}  
                name="identifier" 
                value={formData.identifier}  
                onChange={handleChange} 
                type="identifier"
            />
            {errors.identifier && <p className={styles.error}>{errors.identifier}</p>}
            
            <p className={styles.label}>Password</p>
            <input 
                className={styles.input} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                type="password"
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
        
            <button onClick={handleSubmit}  className={styles.signinButton}>Continue</button>
            <p>By continuing, you agree to Musicart privacy notice and conditions of use.</p>

        </div>
        
        <div className={styles.signupNavigation}>
          <div className={styles.img_container}>
            <img src={Line} alt="line" />
          </div>
          <div className={styles.new}>New to Musicart?</div>
          <button onClick={() => navigate("/register")}  className={styles.regbutton}>Register</button>
        </div>

      </div>
    )
};
export default LoginForm;