import React, { useState } from 'react'
import MenuArow from '../../img/MenuArrow.svg'

type ShowModalProps = {
    onClick: () => void;
}

export default function MenuButton({ onClick }: ShowModalProps) {
    const [isRotated, setIsRotated] = useState(false);

    const handleClick = () => {
        setIsRotated((prev) => !prev);
        onClick();
    };

    return (
        <div>
            <button 
                onClick={handleClick} 
                className="fixed flex items-center gap-2 right-0 w-[25%] bg-custom-darkGray p-2 text-white cursor-pointer z-30"
            >       
                <p>Меню</p>
                <img 
                    src={MenuArow} 
                    alt="кнопка меню" 
                    className={`transition-transform duration-300 ${isRotated ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
        </div>
    )
}
