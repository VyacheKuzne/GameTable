import React, { useEffect } from 'react'
type props = {
    setMousePosition: React.Dispatch<{
        x: number,
        y: number
    }>
}
export default function MouseMove({setMousePosition}:props) {
      useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div></div>
  )
}
