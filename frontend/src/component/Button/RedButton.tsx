import React from 'react'
type Props = {
    img?:string|undefined
    text?:string|undefined
    onClick?: () => void
    p?: string
    w?: string
    h?: string
    f?: string
}
export default function RedButton({img, text, f, onClick, p, w, h}:Props) {

  return (
    <button 
        onClick={onClick} 
        className='bg-custom-red text-white cursor-pointer rounded-[10px] flex align-center justify-center'
        style={
            { 
                padding: p,
                width: w,
                height: h,
                fontSize: f,
             }
        }    
    >
      {
        text ? <p className='content-center'>{text}</p> : <img src={img} alt="img" />
        
      }
    </button>
  )
}
