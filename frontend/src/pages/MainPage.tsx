import React, { useEffect } from "react";
import Header from "../block/Header";
import BlockCard from "../block/BlockCard";
import BlockAdvantages from "../block/BlockAdvantages";
import Auth from "../function/Auth";
function MainPage() {

  return (
    <div className="font-montserrat flex flex-col justify-center">
      <Auth/>
      <Header />
      <BlockCard />
      <BlockAdvantages />
    </div>
  );
}
export default MainPage;
