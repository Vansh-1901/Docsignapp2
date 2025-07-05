import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import Navbar from '../Components/Navbar/Navbar';
import PdfView from '../Components/PdfView/PdfView';
import './Home.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="home-wrapper">
      <Navbar username={loggedInUser} onLogout={handleLogout} />
      <main className="home-main-content">
        <PdfView />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Home;
