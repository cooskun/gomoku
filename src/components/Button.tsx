import { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-rose-900 py-4 px-8 text-rose-100 text-2xl outline-rose-900 select-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
