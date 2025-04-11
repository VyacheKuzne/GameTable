import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage'; 
import AftorizationPage from './pages/AftorizationPage';
import RegistartionPage from './pages/RegistartionPage';
import ProfilePage from './pages/ProfilePage';
import TarifPage from './pages/TarifPage';
import AdminPanel from './admin/AdminPanel';
import AdminPanelTarif from './admin/AdminPanelTarif';
function App() {
  return (
    <BrowserRouter>
      <div className="App font-montserrat flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gamepage" element={<GamePage/>} />
            <Route path="/aftorization" element={<AftorizationPage/>} />
            <Route path="/registartion" element={<RegistartionPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/tarifs" element={<TarifPage/>} />
            <Route path="/AdminPanel/users" element={<AdminPanel/>} />
            <Route path="/AdminPanel/tarifs" element={<AdminPanelTarif/>} />

          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;