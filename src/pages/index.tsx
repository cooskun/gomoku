"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewGame } from "@/utils/service";
import { Button, Viewport, Waterfall } from "@/components";
import { useAuth } from "@/utils/hooks";

export default function Home() {
  const router = useRouter();
  const playerId = useAuth();
  const [gameIdToJoin, setGameIdToJoin] = useState("");

  const clickHandler = async () => {
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
      <div className="flex flex-col items-center gap-5 z-10">
        <Button onClick={clickHandler} className="rounded-xl">
          Create a New Game
        </Button>
        <p className="text-4xl">or join to a game</p>
        <p className="relative">
          <input
            type="text"
            placeholder="Game id here"
            className="bg-indigo-100 p-4 text-rose-900 text-2xl rounded-l-lg placeholder:text-indigo-900/50 placeholder:italic outline-rose-900"
            value={gameIdToJoin}
            onChange={(e) => setGameIdToJoin(e.target.value)}
          />
          <Button className="rounded-r-lg" onClick={joinToGame}>
            Join
          </Button>
        </p>
      </div>
      <div className="absolute">
        <Waterfall>O X</Waterfall>
      </div>
    </Viewport>
  );
}
