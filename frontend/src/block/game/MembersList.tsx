import React from "react";
import { Member } from "./types";

type props = {
  allMembers: Member[] | undefined;
};
export default function MembersList({ allMembers }: props) {
  return (
    <div>
      MembersList
      {allMembers?.map((key, index) => {
         return <div key={index}>{key.name}</div>;
      })}
    </div>
  );
}
