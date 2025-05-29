import React, { useState, useRef, useEffect } from "react";
import MenuButton from "../component/Button/MenuButton";
import ModalBlockMenu from "../component/ModalBlock/ModalBlockMenu";
import axios from "axios";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  function showMenu() {
    setIsOpen((prev) => !prev);
  }
  const [user, setUser] = useState({
    name: "",
    secondname: "",
    nickname: "",
    email: "",
    phone: "",
    tarif: [],
    avatar: ''
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
    <header className="h-[100px]">
      <nav
        ref={navRef}
        className={` ${
          isOpen ? "nav-open" : ""
        }`}
        >
        <MenuButton onClick={showMenu} />
        <ModalBlockMenu  user={user}/>
      </nav>
    </header>
  );
}

export default Header;
