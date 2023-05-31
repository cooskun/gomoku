import { useEffect, FC } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { readGameData } from "@/utils/service";
import { GameData, PlayersData, ReadGameData } from "@/utils/types";
import { useAuth } from "@/utils/hooks";
import { Viewport, Board } from "@/components";

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
  const playerId = useAuth();

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
