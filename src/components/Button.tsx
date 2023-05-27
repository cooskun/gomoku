import { FC, ButtonHTMLAttributes } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={`bg-pink-300 p-4 text-white ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
