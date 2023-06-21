import { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-indigo-900 py-4 px-8 text-indigo-100 text-2xl outline-rose-900 select-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
