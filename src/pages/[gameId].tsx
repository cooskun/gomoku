import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth, signInAnonymously } from "firebase/auth";
import { readGameData } from "@/utils/service";
import { GameData, PlayersData, ReadGameData } from "@/utils/types";
import { Viewport, Board } from "@/components";

const auth = getAuth();

interface Props {
  data: GameData & PlayersData;
  gameId: string;
  isLoaded: boolean;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { gameId } = context.query;
  const { isLoaded, data }: ReadGameData = await readGameData(gameId as string);

  return {
    props: {
      isLoaded,
      gameId: gameId as string,
      data: data as GameData & PlayersData,
    },
  };
};

const Page: FC<Props> = ({ data, gameId, isLoaded }) => {
  const router = useRouter();
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    signInAnonymously(auth)
      .then((response) => setPlayerId(response.user.uid))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      router.push("/404");
    }
  }, [isLoaded, router]);

  if (!playerId) return null;

  return (
    <Viewport>
      <Board data={data} playerId={playerId} gameId={gameId} />
    </Viewport>
  );
};

export default Page;
