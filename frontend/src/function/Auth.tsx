import React, { useEffect } from 'react'
import { GetCookie } from "./GetCookie";
import { useNavigate } from 'react-router-dom';
export default function Auth() {
    const nav = useNavigate()
    useEffect(() => {
      const checkCookie = async () => {
        const userToken = GetCookie('access_token');
        if(!userToken){
            nav('/aftorization')
        }
        console.log(userToken, typeof(userToken))
      }
      checkCookie()
      }, []);
  return (
    <div>

    </div>
  )
}
