import React from 'react'
type props = {
    textError: string
}
export default function ErrorMessages({textError}:props) {
  return (
    <div className='absolute left-[25%] translate-x-[50%] bg-custom-red w-fit h-[40px] m-auto [z-10000] p-2 text-white rounded-md'>
        {textError}
    </div>
  )
}
