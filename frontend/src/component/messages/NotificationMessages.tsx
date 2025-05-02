import React from 'react'
type props = {
    Mesasages: string
    setIsMesasages: React.Dispatch<React.SetStateAction <boolean>>
}
export default function NotificationMessages({Mesasages, setIsMesasages}:props) {
  setTimeout(()=>{
    setIsMesasages(false)
  },4000)
  return (
    <div className='absolute left-[50%] font-bold top-0 translate-x-[-50%] bg-custom-green w-fit h-[40px] m-auto [z-10000] p-2 text-white rounded-md'>
        {Mesasages} 
    </div>
  )
}
