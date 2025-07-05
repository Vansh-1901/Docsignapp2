// import './App.css';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import PdfView from './Components/PdfView';
// import PdfViewPage from './Components/PdfViewPage';
// import Navbar from './Components/Navbar';
// import { useLocation } from 'react-router-dom';


// function App() {
//   return (
   
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Navigate to="/Login" />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/Navbar" element={<Navbar />} />
//         <Route path="/upload" element={<PdfView />} />
//         <Route path="/viewPdf" element={<PdfViewPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import PdfView from './Components/PdfView/PdfView';
import PdfViewPage from './Components/PdfViewPage/PdfViewPage';
import Navbar from './Components/Navbar/Navbar';
// import Sign from './Components/SignOption/Sign';
import NormalSign from './Components/normalSign/NormalSign';
import SignPad from './Components/SignPad/SignPad';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// AppWrapper wraps the main App logic
function AppWrapper() {
  const location = useLocation();
  const hideNavbar =
    location.pathname.toLowerCase() === '/login' ||
    location.pathname.toLowerCase() === '/signup';

  const username = localStorage.getItem('loggedInUser');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // force redirect
  };

  return (
    <>
      {!hideNavbar && <Navbar username={username} onLogout={handleLogout} />}

      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<PdfView />} />
          <Route path="/viewPdf" element={<PdfViewPage />} />
          {/* <Route path="/" element={<Sign />} /> */}
          <Route path="/NormalSign" element={<NormalSign />} />
          <Route path="/SignPad" element={<SignPad />} />
        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;
