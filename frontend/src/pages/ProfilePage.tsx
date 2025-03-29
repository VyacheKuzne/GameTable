import React from 'react'
import Profile from '../block/profile/ProfileBlock'
import TimeProfileBlock from '../block/profile/TimeProfileBlock'
export default function ProfilePage() {
  return (
    <div>
      <div>
        <Profile/>
        <TimeProfileBlock/>
      </div>
    </div>
  )
}
