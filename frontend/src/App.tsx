import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage'; // Импортируем GamePage

function App() {
  return (
    <BrowserRouter>
      <div className="App font-montserrat flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<MainPage />} />
              <Route path="/gamepage" element={<GamePage/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;