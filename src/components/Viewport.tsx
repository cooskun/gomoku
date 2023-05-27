import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Main: FC<Props> = ({ children }) => {
  return (
    <main
      className="
            h-screen p-8 text-white
            flex items-center justify-center flex-col gap-4 
            bg-gradient-to-r from-purple-500 to-pink-300
            "
    >
      {children}
    </main>
  );
};

export default Main;
