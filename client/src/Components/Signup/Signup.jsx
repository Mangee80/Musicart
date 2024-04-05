import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from "react-router";


const RegisterForm = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
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
      const response = await fetch("https://musicart-9bam.vercel.app/api/auth/register", {
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
      console.log(responseData);
      window.localStorage.setItem("user",responseData.user)
      window.localStorage.setItem("token",responseData.token)
      navigate("/");
  
    } catch (error) {
      alert("There was a problem with the request, please try again");
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.name.trim()) {
      errors.name = "Please enter your name";
    }
    if (!data.email.trim()) {
      errors.email = "Please enter your email";
    }
    if (!data.password.trim()) {
      errors.password = "Please enter your password";
    }
    if (!data.mobile.trim()) {
      errors.mobile = "Please enter your mobile number";
    }
    return errors;
  };
  
  return (
    <div className={styles.container}>
      <p className={styles.responsiveHeader}>Welcome</p>
      <div className={styles.formContainer}>
        
        <h2 className={styles.h2}>Create Account</h2>

        <p className={styles.label}>Your name</p>
        <input 
        className={styles.input} 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        type="text" 
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <p className={styles.label}>Mobile number</p>
        <input 
        className={styles.input} 
        name="mobile" 
        value={formData.mobile} 
        onChange={handleChange} 
        type="text" 
        />
        {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}

        <p className={styles.label}>Email Id</p>
        <input 
        className={styles.input}  
        name="email" 
        value={formData.email}  
        onChange={handleChange} 
        type="email"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <p className={styles.label}>Password</p>
        <input 
        className={styles.input} 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        type="password" 
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <p className={styles.instruction1}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>

        <button onClick={handleSubmit}  className={styles.signinButton}>Continue</button>

        <p className={styles.instruction2}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
      </div>
      <p className={styles.signin}>Already have an account? <span onClick={() => navigate("/login")}>Sign in</span></p>
    </div>
  )
};
export default RegisterForm;