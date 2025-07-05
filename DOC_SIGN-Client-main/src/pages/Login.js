import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
  const [LoginInfo, setLoginInfo] = React.useState({
    email: '',
    password: '',
  });

  const Navigate = useNavigate() ;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email, password } = LoginInfo;

    if ( !email || !password) {
      return handleError('All fields (email, password) are required.');
    }

    try {
      const url = 'http://localhost:8080/auth/login'; 
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginInfo),
      });

      const result = await response.json();
      const {success , jwtToken ,name, error ,message} = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('Token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          Navigate('/Home'); 
        },1000)
    } 
        else if(error){
            const details = error?.details[0].message
            handleError(details);
        }
        else if(!success){
            handleError(message );
        }
        console.log(result);

      if (response.ok) {
        handleSuccess(result.message || 'Login successful!');
        setLoginInfo({ name: '', email: '', password: '' }); 
        handleError(result.message || 'Login failed.');
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong during Login.');
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={LoginInfo.email}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Enter your password"
            value={LoginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Doesn't have an account? <Link to="/Signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
