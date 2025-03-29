import React from 'react'

export default function PersonalDataBlock() {
  return (
    <div className='shadow-md'>
      <p>Ваши данные</p>
      <div className='grid grid-cols-2'>
        <label htmlFor="password">
            Пароль
        </label>
        <input type="text" name='password'/>
        <label htmlFor="nickname">
            Никнейм
        </label>
        <input type="text" name='nickname'/>
        <label htmlFor="email">
            Почта
        </label>
        <input type="text" name='email'/>
        <label htmlFor="fio">
            Фио
        </label>
        <input type="text" name='fio'/>
        <label htmlFor="phone">
            Телефон
        </label>
        <input type="text" name='phone'/>
        <button>Хочу обновить данные</button>
      </div>
    </div>
  )
}
