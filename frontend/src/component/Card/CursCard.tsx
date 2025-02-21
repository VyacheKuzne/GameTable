import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GamePage from '../../pages/GamePage'
import './KeyCard.css'; // Импортируем CSS
import VectorKey from '../../img/Vectorkey.svg'
const CursCard = ({ size = 200 }) => {
    const height = size * 1.1547; // Вычисляем высоту исходя из размера
  return ( 
    <>
    <Link to="/gamepage">
    <button className='hexagon-container'>
        <p className='hexagon-container-tittle'>Присоединиться к игре
        по ключу</p>
        <div className="hexagon-container-first" style={{ width: size, height: height}}>
            <div className='hexagon-container-first-img'>
                <img src={VectorKey} alt="VectorKey" />
            </div>
        </div>
        <div className="hexagon-container-second" style={{ width: size, height: height}}>
            <p className='text-white card-text'>Уникальный ключ
            вам сообщит создатель игры</p>  
        </div>
    </button>
    </Link>
    <Routes>
        <Route path="/about" element={<GamePage />} />
    </Routes>
    </>
  );
};

export default CursCard;