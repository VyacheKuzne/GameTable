import React from 'react';
// import Fon from '../img/Fon.png'
// import FonImg from '../img/FonImg.png'
// import './BlockAdvantages.css'

interface AdvantageText {
    text: string;
  }
function Advantage({text}: AdvantageText) {

    return(
        <>
        <div>
            <p className='text-white'>
                {text}
            </p>
        </div>
        </>
    )
}

export default Advantage