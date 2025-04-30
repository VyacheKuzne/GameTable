import React, { useState, useEffect } from "react";
import axios from "axios";
import MobList from "../mob/MobList";
import GridCellGame from "./GirdCellGame";
import { Mob } from "./types";
import { io, Socket } from "socket.io-client";
import ChatBlock from "./ChatBlock";
import TurnList from "./TurnList";
function BlockPole() {
  const blocks = 10;
  const blockCount = blocks * blocks;
  const blockInLine = blocks;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectMob, setSelectMob] = useState<Mob | undefined>(undefined);
  const [isSelectMob, setiISelectMob] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [placedMobs, setPlacedMobs] = useState<
    {
      x: number;
      y: number;
      idMob: number;
      tokenMob: string;
      isOverMove: number;
      mob: Mob;
    }[]
  >([]);
  const [allMobs, setAllMobs] = useState<Mob[]>([]);
  const [replaceMob, setReplaceMob] = useState<Mob | undefined>();
  const [isReplaceMob, setIsReplaceMob] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     setMousePosition({ x: event.clientX, y: event.clientY });
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  }
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    const token = window.location.pathname.split("/").pop();
    const userToken = getCookie('access_token'); // или getCookie('access_token')

    if (token && userToken) {
      newSocket.emit("joinRoom", { idSession: token, userToken });
    }
    newSocket.on("yourTurn", (data) => {
      console.log("🔔 Сейчас твой ход!", data);
      alert("Сейчас твой ход!"); // или открывай модальное окно, включай подсветку, и т.д.
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSessionMob = (
      data: {
        x: number;
        y: number;
        idMob: number;
        tokenMob: string;
        isOverMove: number;
        mob: Mob;
      }[]
    ) => {
      setPlacedMobs(data);
      console.log(data);
    };

    socket.on("sessionMob", handleSessionMob);

    return () => {
      socket.off("sessionMob", handleSessionMob);
    };
  }, [socket]);

  useEffect(() => {
    async function fetchMobs() {
      const response = await axios.get("http://localhost:3000/mobs");
      setAllMobs(response.data);
    }
    fetchMobs();
  }, []);
  useEffect (()=>{
    async function checkCreator() {
      try {
        const token = window.location.pathname.split("/").pop();
        const response = await axios.get('http://localhost:3000/checkCreator',
          
        {
          headers: {
            'X-Session-Token': token
          },
          withCredentials: true
        })
        if(response.data === true){
          setIsCreator(true)
        }
      } catch (error) {
        console.error("Failed to check creator", error);
      }
    }
    checkCreator()
  }, [])

  return (
    <>
      <div className="flex">
        <div
          className={`grid`}
          style={{ gridTemplateColumns: `repeat(${blockInLine}, 1fr)` }}
        >
          {Array.from({ length: blockCount }).map((_, index) => {
            const x = index % blockInLine;
            const y = Math.floor(index / blockInLine);
            return (
              <div>
                <GridCellGame
                  x={x}
                  y={y}
                  selectMob={selectMob}
                  isSelectMob={isSelectMob}
                  socket={socket}
                  placedMob={placedMobs.find(
                    (mob) => mob.x === x && mob.y === y
                  )}
                  allMobs={allMobs}
                  setIsReplaceMob={setIsReplaceMob}
                  setReplaceMob={setReplaceMob}
                  isReplaceMob={isReplaceMob}
                  replaceMob={replaceMob}
                />
              </div>
            );
          })}
        </div>
        <div>
          {/*debug снизу костыль для проверки стейтов*/}
          {isReplaceMob ? (
            <p>Перемещаем моба isReplaceMob</p>
          ) : (
            <p>Не Перемещаем моба isReplaceMob</p>
          )}
          {isSelectMob ? (
            <p>Размещаем моба isSelectMob</p>
          ) : (
            <p>Не Размещаем моба isSelectMob</p>
          )}
          <button
            className="p-2 bg-custom-red text-white"
            onClick={() => {
              setIsReplaceMob(false);
              setiISelectMob(false);
            }}
          >
            отмена действий
          </button>
          {/*конец костыль для проверки стейтов */}
          <TurnList placedMobs={placedMobs} />
          {isCreator ? (
            <MobList
            setSelectMob={setSelectMob}
            setiISelectMob={setiISelectMob}
            isSelectMob={isSelectMob}
          />
          ) : null}
    
          {isSelectMob ? (
            <div
              className="border bg-black text-white border-black w-[50px] h-[50px] fixed justify-center items-center overflow-hidden"
              style={{
                left: `${mousePosition.x + 35}px`,
                top: `${mousePosition.y + 35}px`,
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
              }}
            >
              {selectMob?.name}
            </div>
          ) : (
            <div className="border border-black w-[50px] h-[50px] flex justify-center items-center overflow-hidden">
              {selectMob?.name}
            </div>
          )}
        </div>
        <div className="fixed right-0 bottom-0">
          <ChatBlock socket={socket} />
        </div>
      </div>
    </>
  );
}

export default BlockPole;
