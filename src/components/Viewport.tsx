import type { FC, ReactNode } from "react";
import cx from "classnames";

interface Props {
  children: ReactNode;
  shouldHideCursor?: boolean;
}

const Main: FC<Props> = ({ children, shouldHideCursor }) => {
  const classes = cx(
    "relative h-screen p8",
    "bg-indigo-300 text-white",
    "flex flex-col items-center justify-center gap-4",
    { "cursor-none": shouldHideCursor }
  );

  return <main className={classes}>{children}</main>;
};

export default Main;
