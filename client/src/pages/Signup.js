
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import './Signup.css'; 

function Signup() {
  const [signUpInfo, setSignUpInfo] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;

    if (!name || !email || !password) {
      return handleError('All fields (name, email, password) are required.');
    }

    try {
      const url = 'http://localhost:10000/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (response.ok && success) {
        handleSuccess(message || 'Signup successful!');
        setSignUpInfo({ name: '', email: '', password: '' });
        setTimeout(() => {
          navigate('/Login');
        }, 1000);
      } else if (error?.details) {
        handleError(error.details[0].message);
      } else {
        handleError(message || 'Signup failed.');
      }

      console.log(result);
    } catch (err) {
      handleError(err.message || 'Something went wrong during signup.');
    }
  };

  return (
    <div className="signup-container">
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={signUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={signUpInfo.email}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Enter your password"
            value={signUpInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/Login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
