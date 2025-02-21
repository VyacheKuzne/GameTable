import React from 'react';
import Header from '../block/Header'
import BlockCard from '../block/BlockCard';
import BlockAdvantages from '../block/BlockAdvantages';
function MainPage() {
  return (
    <div className="font-montserrat flex flex-col justify-center">
      <Header />
      <BlockCard />
      <BlockAdvantages/>
    </div>
  );
}
export default MainPage;
