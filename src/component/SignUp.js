import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUpForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const navigate = useNavigate();
    useEffect (() =>{
      const auth = localStorage.getItem('email');
      if(auth){
        navigate('/Task')
      }
    },)

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
           await axios.post('http://localhost:9000/create', { fullName,email, password });
          // Handle the successful login response
          
          
          setShowSuccessAlert(true); // Show success alert

          // Clear form fields
          setFullName('');
          setEmail('');
          setPassword('');

          setTimeout(() => {
            navigate('/');
          }, 5000); // Navigate after 5 seconds
          
    
        } catch (error) {
          console.error('SignUp error:', error.response.data.error);
          // Display an error message to the user or perform other error handling
          if (error.response && error.response.data.status === false) {
            // Unauthorized: Incorrect email or password
            setErrorMessage(error.response.data.message);
          } else {
            // Other error occurred
            setErrorMessage('An error occurred. Please try again later.');
          }
        }
      }
      
  return (
    <div className="container bg-black shadow p-4 mt-5 mx-auto sign-up-form" style={{ width: '23.125rem', borderRadius: '0.313rem' }}>
      <form onSubmit={handleLogin} className='text-center'>
        <h3 className="text-center mb-4">Create a new account</h3>
        <h2 className="text-center mb-4">It's quick and easy.</h2>
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {showSuccessAlert && (
          <div className="alert alert-success" role="alert">
            Account created successfully! Please wait, you will be redirected to the Login Page.
          </div>
        )}
        <input type="text" className="form-control mb-3" placeholder="Full Name" name="fname" value={fullName}
              onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" className="form-control mb-3" placeholder="Email Address" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)}  required />
        <input type="current-password" className="form-control mb-3" placeholder="Password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success btn-block">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;