"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInAnonymously } from "firebase/auth";
import { createNewGame } from "@/utils/service";
import { Button, Viewport } from "@/components";

const auth = getAuth();

export default function Home() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState<null | string>(null);
  const [gameIdToJoin, setGameIdToJoin] = useState("");

  useEffect(() => {
    signInAnonymously(auth)
      .then((response) => setPlayerId(response.user.uid))
      .catch((error) => console.log(error));
  }, []);

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
