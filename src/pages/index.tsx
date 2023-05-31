"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewGame } from "@/utils/service";
import { Button, Viewport } from "@/components";
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
      <Button onClick={clickHandler} className="rounded-xl">
        Create a New Game
      </Button>
      <p>or join to a game</p>
      <p className="relative">
        <input
          type="text"
          placeholder="Game id here"
          className="p-4 text-black rounded-l-lg"
          value={gameIdToJoin}
          onChange={(e) => setGameIdToJoin(e.target.value)}
        />
        <Button className="rounded-r-lg" onClick={joinToGame}>
          Join
        </Button>
      </p>
    </Viewport>
  );
}
