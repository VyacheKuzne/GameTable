import React from 'react'
import backet from '../../img/backet.svg'
import RedButton from '../../component/Button/RedButton'
export default function ProfileBlock() {
  function Delete () {

  }
  return (
    <div className='flex justify-between shadow-md w-full p-[1%] rounded-xl'>
      <div className='flex w-[55%] items-center justify-between'>
        <div content='' className='w-[177px] h-[177px] rounded-full bg-custom-darkGray'>
        </div>
        <div  className='text-[32px] font-semibold'>
          <p>Имя</p>
          <p>Фамилия</p>
        </div>
      </div>
      <div className='flex flex-col items-start'>
        <RedButton img={backet} w={'43px'} h={'43px'} p={'15%'} onClick={Delete}/>
      </div>
    </div>
  )
}
