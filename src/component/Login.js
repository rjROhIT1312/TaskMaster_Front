import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
          const response = await axios.post('http://localhost:9000/login', { email, password });
          
          
          const { userId, token } = response.data.data; // Destructure userId and token from the response

          localStorage.setItem('userId', userId); // Store userId in localStorage
          localStorage.setItem('token', token);
          navigate('./Task');
    
        } catch (error) {
          // Handle login error
          console.error('Login error:', error.response.data.error);
          // Display an error message to the user or perform other error handling
          if (error.response && error.response.data.status === false) {
            // Unauthorized: Incorrect email or password
            setErrorMessage(error.response.data.message);
          } else {
            // Other error occurred
            setErrorMessage('An error occurred. Please try again later.');
          }
        }
      };
  return (
    <>
    <div className="container text-center">
        <h1 className="mt-5 custom-heading">TaskMaster: Organize and Conquer</h1>
        <h2 className="mb-4">"Get Organized: Your Ultimate Todo List App!"</h2>
        <div className="bg-white shadow p-4 mt-5 mx-auto sign-up-form" style={{ width: '23.125rem', borderRadius: '0.313rem' }}>
         
          
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="current-password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary btn-block mb-3 custom-button">Login</button>
            <div className="text-center">
            </div>
            <hr />
            <button className="btn btn-success btn-block">
              <Link to="/SignUp" style={{ color: 'white', textDecoration: 'none' }}>Create New Account</Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;