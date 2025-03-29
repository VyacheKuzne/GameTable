import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage'; 
import AftorizationPage from './pages/AftorizationPage';
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <BrowserRouter>
      <div className="App font-montserrat flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gamepage" element={<GamePage/>} />
            <Route path="/aftorization" element={<AftorizationPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;