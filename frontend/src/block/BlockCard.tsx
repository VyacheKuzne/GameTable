import React from "react";
// import { useState, } from "react";
import CursCard from "../component/Card/CursCard";
 function Header() {
    // const linkText = [
    //     'Вебинары', 'Курсы', 'Практика', 'О нас'
    // ]
    // const [linkText, _setlinkText] = useState() 
    return(
        <>
        <div className="flex justify-aroundw-[1200px] m-auto my-[200px]">
            <CursCard />
            <CursCard />
            <CursCard />
            <CursCard />
            <CursCard />
        </div>
        </>
    )
 }

 export default Header