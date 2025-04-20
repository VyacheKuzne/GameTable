import React from "react";
type Props = {
  img?: string | undefined;
  text?: string | undefined;
  onClick?: () => void;
  p?: string;
  w?: string;
  h?: string;
  f?: string;
  size?: string;
  type?: "submit" | "reset" | "button";
};
export default function RedButton({
  img,
  text,
  f,
  size,
  type,
  onClick,
  p,
  w,
  h,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-custom-red hover-effect-btn-red text-white cursor-pointer rounded-[10px] flex align-center  justify-center"
      style={{
        padding: p,
        width: w,
        height: h,
        fontSize: f,
      }}
    >
      {text ? (
        <p className="content-center flex items-center h-full" style={{fontWeight: `${size}`}}>
          {text}
        </p>
      ) : (
        <img src={img} alt="img" />
      )}
    </button>
  );
}

