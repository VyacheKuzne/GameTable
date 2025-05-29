import React, { useState, useEffect } from "react";
import axios from "axios";
import MobList from "../mob/MobList";
import GridCellGame from "./GirdCellGame";
import { Mob } from "./types";
import { io, Socket } from "socket.io-client";
import ChatBlock from "./ChatBlock";
import TurnList from "./TurnList";
import StatMob from "./StatMob";
import { Member } from "./types";
import MembersList from "./MembersList";
import NotificationMessages from "../../component/messages/NotificationMessages";
import PlayerCard from "./PlayerCard";
import { MobsOnTable } from "./types";
import MouseMove from "../../function/MouseMove";
import { useNavigate } from "react-router-dom";

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
      status: string;
    }[]
  >([]);
  const [allMobs, setAllMobs] = useState<Mob[]>([]);
  const [replaceMob, setReplaceMob] = useState<MobsOnTable | undefined>();
  const [isReplaceMob, setIsReplaceMob] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [isMesasages, setIsMesasages] = useState<boolean>(false);
  const [isViewMobsStat, setIsViewMobsStat] = useState<boolean>(false);
  const [viewMobsStat, setViewMobsStat] = useState<Mob | undefined>();
  const [allMembers, setMembers] = useState<Member[] | undefined>([]);
  const [isYourTurn, setIsYourTurn] = useState<boolean>(false);
  const [MobIsNowTurn, setMobIsNowTurn] = useState<MobsOnTable>();
  const [isModAtack, setIsModAtack] = useState<boolean>(false);
  const navigate = useNavigate();

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  }
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    const token = window.location.pathname.split("/").pop();
    const userToken = getCookie("access_token"); // или getCookie('access_token')

    if (token && userToken) {
      newSocket.emit("joinRoom", { idSession: token, userToken });
    }
    newSocket.on("yourTurn", (data) => {
      console.log("🔔 Сейчас твой ход!", data);
      setIsMesasages(true);
      setIsYourTurn(true);
      setMobIsNowTurn(data.MobIsNowTurn);
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
        status: string
      }[]
    ) => {
      setPlacedMobs(data);
      console.log(data);
    };
    const handleSessionMembers = (data: Member[]) => {
      setMembers(data);
      console.log(data);
    };
    socket.on("sessionMob", handleSessionMob);
    socket.on("sessionMembers", handleSessionMembers);
    socket.on("stopGameMessage", stopGameRedirect);
    return () => {
      socket.off("sessionMob", handleSessionMob);
      socket.off("sessionMembers", handleSessionMembers);
    };
  }, [socket]);

  useEffect(() => {
    async function fetchMobs() {
      const response = await axios.get("http://localhost:3000/mobs");
      setAllMobs(response.data);
    }
    fetchMobs();
  }, []);
  useEffect(() => {
    async function checkCreator() {
      try {
        const token = window.location.pathname.split("/").pop();
        const response = await axios.get(
          "http://localhost:3000/checkCreator",

          {
            headers: {
              "X-Session-Token": token,
            },
            withCredentials: true,
          }
        );
        if (response.data === true) {
          setIsCreator(true);
        }
      } catch (error) {
        console.error("Failed to check creator", error);
      }
    }
    checkCreator();
  }, []);
  function goOnGame() {
    setIsGameOn(true);
    console.log("начинаем игру");
    const token = window.location.pathname.split("/").pop();
    socket?.emit("GameOn", {
      idSession: token,
    });
  }
    function stopGame() {
    console.log("завершаем игру");
    const token = window.location.pathname.split("/").pop();
    socket?.emit("GameStop", {
      idSession: token,
    });
  }
  function roundEnd() {
    setIsGameOn(true);
    console.log("Завершаем рануд");
    const token = window.location.pathname.split("/").pop();
    socket?.emit("roundEnd", {
      idSession: token,
    });
  }
  function stopGameRedirect(){
      console.log("полученно сообщение завершить игру делаем редирект")
      navigate("/");
  }
  return (
    <>
    <MouseMove setMousePosition={setMousePosition}/>
      <MembersList allMembers={allMembers} />
      <StatMob
        setIsViewMobsStat={setIsViewMobsStat}
        setViewMobsStat={setViewMobsStat}
        isViewMobsStat={isViewMobsStat}
        viewMobsStat={viewMobsStat}
        allMembers={allMembers}
        socket={socket}
        isCreator={isCreator}
      />
      {isMesasages ? (
        <NotificationMessages
          setIsMesasages={setIsMesasages}
          Mesasages={"Ваш ход"}
        />
      ) : null}

      <div className="flex">
        <div
          className={`grid absolute left-[50%] translate-x-[-50%]`}
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
                  setIsViewMobsStat={setIsViewMobsStat}
                  setViewMobsStat={setViewMobsStat}
                  isViewMobsStat={isViewMobsStat}
                  viewMobsStat={viewMobsStat}
                  setIsModAtack={setIsModAtack}
                  isModAtack={isModAtack}
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
            className="p-2 m-2 bg-custom-red text-white"
            onClick={() => {
              setIsReplaceMob(false);
              setiISelectMob(false);
            }}
          >
            отмена действий
          </button>
          <button
            className="p-2 m-2 bg-custom-red text-white"
            onClick={goOnGame}
          >
            закончить расстановку
          </button>
          <br />
          <button
            className="p-2 m-2 bg-custom-red text-white"
            onClick={roundEnd}
          >
            закончить раунд
          </button>
             <button
            className="p-2 m-2 bg-custom-red text-white"
            onClick={stopGame}
          >
            закончить эту партию
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
          ) : null
      }
        </div>
        <div className="fixed right-0 bottom-0">
          <ChatBlock socket={socket} />
        </div>
        {isYourTurn ? (
          <PlayerCard
            setIsReplaceMob={setIsReplaceMob}
            setReplaceMob={setReplaceMob}
            isReplaceMob={isReplaceMob}
            replaceMob={replaceMob}
            MobIsNowTurn={MobIsNowTurn}
            setIsYourTurn={setIsYourTurn}
            soket={socket}
            setIsModAtack={setIsModAtack}
          />
        ) : null}
      </div>
    </>
  );
}

export default BlockPole;
