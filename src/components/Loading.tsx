import { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
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

  useEffect(() => {
    const animation = async () => {
      /* 1 */
      animate(
        xSelector,
        { x: [-X, 0], rotate: [-CHILD_ROTATION, 0] },
        { delay: DELAY }
      );
      await animate(oSelector, { x: [X, 0] }, { delay: DELAY });

      /* 2 */
      containerRotation.current += CONTAINER_ROTATION;
      await animate(scope.current, { rotate: containerRotation.current });

      /* 3 */
      animate(xSelector, { x: -X, rotate: [0, CHILD_ROTATION] });
      await animate(oSelector, { x: X });

      /* 4 */
      animate(xSelector, { x: 0, rotate: 0 }, { delay: DELAY });
      await animate(oSelector, { x: 0 }, { delay: DELAY });

      /* 5 */
      containerRotation.current += CONTAINER_ROTATION;
      await animate(scope.current, { rotate: containerRotation.current });

      /* 6 */
      animate(xSelector, { x: -X, rotate: -CHILD_ROTATION });
      await animate(oSelector, { x: X });

      animation();
    };

    animation();
  }, [animate, scope]);

  return (
    <div ref={scope} className="flex text-8xl text-indigo-900">
      <span className="-mr-1">
        <IconX />
      </span>
      <span className="-ml-1">
        <IconO />
      </span>
    </div>
  );
};

export default Loading;
