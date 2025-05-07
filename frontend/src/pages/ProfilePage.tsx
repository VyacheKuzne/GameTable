import React, { useEffect, useState } from 'react';
import ProfileBlock from '../block/profile/ProfileBlock';
import TimeProfileBlock from '../block/profile/TimeProfileBlock';
import PersonalDataBlock from '../block/profile/PersonalDataBlock';
import Header from '../block/Header';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    secondname: "",
    nickname: "",
    email: "",
    phone: "",
    tarif: [],
  });

  async function getUserData() {
    try {
      const host = "http://localhost:3000";
      const response = await axios.get(`${host}/user/getdata`, {
        withCredentials: true,
      });
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Header />
      <div className="grid h-[547px] grid-cols-[700px_1fr] gap-[1%] m-auto py-[4.5%] px-[5.7%]">
        <div className="flex flex-col w-full">
          <ProfileBlock user={user} />
          <TimeProfileBlock user={user}/>
        </div>
        <PersonalDataBlock  user={user} />
      </div>
    </div>
  );
}
