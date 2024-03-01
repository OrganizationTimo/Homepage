import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ButtonProps = {
  buttonName: string | ReactNode;
  to?: string;
  styled?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Button({
  buttonName,
  to,
  styled,
  onClick,
  className,
}: ButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function styleButton() {
    if (styled) {
      return "bg-third px-10 py-2 rounded-md hover:opacity-75 transition-all";
    }
    if (to) {
      if (location.pathname === to) {
        return "hover:opacity-75 transition-all underline";
      } else {
        return "hover:opacity-75 transition-all";
      }
    }
    return "hover:opacity-75 transition-all hover:underline";
  }

  return (
    <button
      className={className ? className : styleButton()}
      onClick={to ? () => navigate(to) : onClick}
    >
      {buttonName}
    </button>
  );
}
