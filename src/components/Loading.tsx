import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";
import { ImPlus as IconX } from "react-icons/im";
import { BsRecordCircleFill as IconO } from "react-icons/bs";

const X = 20;
const DELAY = 0.3;
const CHILD_ROTATION = 45;
const CONTAINER_ROTATION = 180;

const xSelector = "span:nth-child(1)";
const oSelector = "span:nth-child(2)";
const Loading = () => {
  const containerRotation = useRef(0);
  const [scope, animate] = useAnimate();
  const isMotionReduced = useReducedMotion();

  useEffect(() => {
    if (!isMotionReduced) {
      const animation = async () => {
        const checkSelectors = () => {
          return (
            document.querySelector(xSelector) &&
            document.querySelector(oSelector)
          );
        };

        if (scope?.current && checkSelectors()) {
          // 1
          animate(
            xSelector,
            { x: [-X, 0], rotate: [-CHILD_ROTATION, 0] },
            { delay: DELAY }
          );
          await animate(oSelector, { x: [X, 0] }, { delay: DELAY });

          if (scope?.current) {
            // 2
            containerRotation.current += CONTAINER_ROTATION;
            await animate(scope?.current, {
              rotate: containerRotation.current,
            });
          }

          if (checkSelectors()) {
            // 3
            animate(xSelector, {
              x: -X,
              rotate: [0, CHILD_ROTATION],
            });
            await animate(oSelector, { x: X });
          }

          if (checkSelectors()) {
            // 4
            animate(xSelector, { x: 0, rotate: 0 }, { delay: DELAY });
            await animate(oSelector, { x: 0 }, { delay: DELAY });
          }

          if (scope?.current) {
            // 5
            containerRotation.current += CONTAINER_ROTATION;
            await animate(scope?.current, {
              rotate: containerRotation.current,
            });
          }

          if (checkSelectors()) {
            // 6
            animate(xSelector, { x: -X, rotate: -CHILD_ROTATION });
            await animate(oSelector, { x: X });
          }

          animation();
        }
      };

      animation();
    }
  }, [scope, animate, isMotionReduced]);

  return !isMotionReduced ? (
    <div ref={scope} className="flex text-8xl text-indigo-900">
      <span className="-mr-1">
        <IconX />
      </span>
      <span className="-ml-1">
        <IconO />
      </span>
    </div>
  ) : (
    <p className="text-8xl text-indigo-900">Loading...</p>
  );
};

export default Loading;
