import React from "react";
import { Member } from "./types";
import Profile from '../../img/profile.svg'
type props = {
  allMembers: Member[] | undefined;
};

export default function MembersList({ allMembers }: props) {
  const counMmbers = allMembers?.length;
  return (
    <div className="bg-white fixed  shadow-md rounded-[20px] p-2 right-0 top-0 w-[20%]">
      <p className="text-[24px] font-medium">Участников:{counMmbers}</p>
      <ol className="flex flex-col items-start">
        {allMembers?.map((key, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <p>{index + 1}</p>
                <div
                  content=""
                  className="w-[50px] h-[50px] flex justify-center bg-gray-400 mx-1 rounded-full"
                >
                  {
                  key.avatar ? (<img className="rounded-full" src={`http://localhost:3000${key.avatar}`} alt="avatar" />)
                  :
                  (<img className="rounded-full" src={Profile} alt="avatar" />)
                  }
                
                </div>
                <p>{key.name}</p>
                <p>{key.secondname}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
