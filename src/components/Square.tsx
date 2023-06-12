import { FC, MouseEventHandler } from "react";
import cx from "classnames";

interface Props {
  value: "X" | "O" | null;
  index: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  isWinningSquare: boolean;
}

const Square: FC<Props> = ({
  value,
  index,
  onClick,
  disabled,
  isWinningSquare,
}) => {
  const buttonClasses = cx(
    "w-8 aspect-square",
    "font-nunito font-extrabold text-2xl leading-7",
    "cursor-none select-none hover:bg-rose-900/30",
    "border-rose-900",
    {
      "text-blue-900": value === "X",
      "text-green-900": value !== "X",
      "bg-rose-900/30": isWinningSquare,
      "border-t-2": index > 18,
      "border-l-2": index % 19 !== 0,
    }
  );

  return (
    <button
      className={buttonClasses}
      onClick={disabled ? () => false : onClick}
    >
      {value}
    </button>
  );
};

export default Square;
