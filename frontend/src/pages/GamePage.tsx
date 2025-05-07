import React from 'react'
import BlockPole from '../block/game/BlockPole'
import Header from '../block/Header'

export default function GamePage() {
  return (
    <div className='w-[2000px]'>
    <Header />
    <BlockPole/>
    </div>
  )
}
