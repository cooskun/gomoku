"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewGame } from "@/utils/service";
import { Button, Viewport, Waterfall, Loading } from "@/components";
import { useAuth } from "@/utils/hooks";

export default function Home() {
  const router = useRouter();
  const playerId = useAuth();
  const [gameIdToJoin, setGameIdToJoin] = useState("");
  const [isGameLoading, setIsGameLoading] = useState(false);

  const clickHandler = async () => {
    setIsGameLoading(true);
    if (playerId) {
      const gameId = await createNewGame(playerId);
      router.push(`/${gameId}`);
    }
  };

  const joinToGame = () => {
    router.push(`/${gameIdToJoin}`);
  };

  return (
    <Viewport>
      {isGameLoading && <Loading />}
      {!isGameLoading && (
        <>
          <div className="flex flex-col items-center gap-5 z-10">
            <Button onClick={clickHandler} className="rounded-xl">
              Create a New Game
            </Button>
            <p className="text-4xl">or join to a game</p>
            <p className="relative">
              <input
                type="text"
                placeholder="Game id here"
                className="bg-indigo-100 p-4 text-indigo-900 text-2xl rounded-l-lg placeholder:text-indigo-900/50 placeholder:italic focus:ring-2 ring-inset ring-indigo-900 outline-none"
                value={gameIdToJoin}
                onChange={(e) => setGameIdToJoin(e.target.value)}
              />
              <Button className="rounded-r-lg" onClick={joinToGame}>
                Join
              </Button>
            </p>
          </div>
          <div className="absolute">
            <Waterfall>X O</Waterfall>
          </div>
        </>
      )}
    </Viewport>
  );
}
