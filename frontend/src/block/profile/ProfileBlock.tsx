import React from 'react'
import backet from '../../img/backet.svg'
export default function ProfileBlock() {
  return (
    <div>
      <div content='' className='w-[117px] h-[117px] bg-custom-darkGray'>
      </div>
      <div>
        <p>Имя</p>
        <p>Фамилия</p>
      </div>
      <div>
        <button>
            <img src={backet} alt="удалить" />
        </button>
      </div>
    </div>
  )
}
