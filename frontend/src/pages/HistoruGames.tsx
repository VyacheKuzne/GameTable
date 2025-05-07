import React from 'react'
import Header from '../block/Header'
export default function HistoruGames() {
    const headersTable = [
        'Дата',
        'Продолжительность',
        'Количество игроков',
        'Статус',
        'Ключ',
        'Оставшееся время по вашему тарифу',
    ]
  return (
    <div>
        <Header/>
        <div className='w-[80%] m-auto rounded-[20px] p-[45px] bg-white'>
            <table className='w-full'>
                <tr className='felx justify-between items-center'>
                    {headersTable.map((key,index)=>(
                        <td className='text-center text-[24px] font-medium' key={index}>
                            {key}
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    </div>
  )
}
