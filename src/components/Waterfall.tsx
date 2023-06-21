import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Waterfall: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`font-nunito font-thin text-waterfall leading-none text-indigo-900/40 pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
};

export default Waterfall;
