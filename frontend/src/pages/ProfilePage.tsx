import React from 'react'
import Profile from '../block/profile/ProfileBlock'
import TimeProfileBlock from '../block/profile/TimeProfileBlock'
import PersonalDataBlock from '../block/profile/PersonalDataBlock'
import Header from '../block/Header'
export default function ProfilePage() {
  return (
    <div>
      <Header/>
      <div className='grid h-[547px] grid-cols-[700px_1fr] gap-[1%] m-auto py-[4.5%] px-[5.7%]'>
        <div className='flex flex-col w-full'>
          <Profile/>
          <TimeProfileBlock/>
        </div>
        <PersonalDataBlock/>
      </div>
    </div>
  )
}
