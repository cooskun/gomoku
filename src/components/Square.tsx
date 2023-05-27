import { FC, MouseEventHandler } from "react";

interface Props {
  value: "X" | "O" | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  color: string;
}

const Square: FC<Props> = ({ value, onClick, disabled, color }) => {
  return (
    <button
      className={`w-6 aspect-square text-base leading-4 border border-indigo-400 bg-white ${color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Square;
