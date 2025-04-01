import React from 'react'
import Header from '../block/Header'
import TarifCard from '../component/Card/TarifCard'
export default function TarifPage() {
  return (
    <div>
      <Header/>
      <div className='grid grid-cols-3 p-[7%]'>
        <TarifCard/>
        <TarifCard/>
        <TarifCard/>
        <TarifCard/>
        <TarifCard/>
        <TarifCard/>
      </div>
    </div>
  )
}
