import React, { useState, useRef } from "react";
import MenuButton from "../component/Button/MenuButton";
import ModalBlockMenu from "../component/ModalBlock/ModalBlockMenu";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  function showMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className="h-[100px]">
      <nav
        ref={navRef}
        className={` ${
          isOpen ? "nav-open" : ""
        }`}
        >
        <MenuButton onClick={showMenu} />
        <ModalBlockMenu />
      </nav>
    </header>
  );
}

export default Header;
