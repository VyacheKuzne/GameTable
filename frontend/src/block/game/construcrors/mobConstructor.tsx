import React, { useState } from 'react'
import {Mob} from '../types' 
export default function mobConstructor() {
    const [visibleMobConstructor, setVisibleMobConstructor] = useState<boolean>(false)
    const tableHeadersWithKeys = [
        { label: "ID", key: "id" },
        { label: "Имя", key: "name" },
        { label: "Фамиля", key: "secondname" },
        { label: "ЭЛЕКТРОННАЯ ПОЧТА", key: "email" },
        { label: "ПАРОЛЬ", key: "password" },
        { label: "НИКНЕЙМ", key: "nickname" },
        { label: "ТЕЛЕФОН", key: "phone" },
        // { label: "ТАРИФ", key: "tariff" },
        { label: "СТАТУС", key: "status" },
        { label: "ДАТА СОЗДАНИЯ", key: "createdAt" },
      ];
  return (
    <div>
        <button>
            создать нового моба
        </button>
       ({
        visibleMobConstructor ? (
            <form action="">

            </form>
        ): null
       })
    </div>
  )
}
