import { useEffect, useRef, FC } from "react";

interface Props {
  value: string;
}

const Cursor: FC<Props> = ({ value }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorElement = cursorRef.current;

    if (!cursorElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorElement.style.left = e.pageX + "px";
      cursorElement.style.top = e.pageY + "px";
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="font-nunito font-extrabold text-indigo-900 text-2xl fixed pointer-events-none z-50"
    >
      {value}
    </div>
  );
};

export default Cursor;
