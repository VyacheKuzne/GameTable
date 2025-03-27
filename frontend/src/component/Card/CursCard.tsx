import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GamePage from '../../pages/GamePage'
import './KeyCard.css'; // Импортируем CSS
type Props = {
    img:string;
    size:number
    mainText: string;
    subText: string;
}
const CursCard = ({ size, img, mainText, subText }: Props) => {
    const height = size * 1.3047; // Вычисляем высоту исходя из размера
    const width = size * 1.0447; 
  return ( 
    <>
    <Link to="/gamepage">
    <button className='hexagon-container'>
        <p className='hexagon-container-tittle'>{mainText}</p>
        <div className="hexagon-container-first" style={{ width: width, height: height}}>
            <div className='hexagon-container-first-img'>
                <img src={img} alt="VectorKey" />
            </div>
        </div>
        <div className="hexagon-container-second" style={{ width: width, height: height}}>
            <p className='text-white card-text'>{subText}</p>  
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