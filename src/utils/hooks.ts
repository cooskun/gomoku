import { useState, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();

export const useAuth = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    signInAnonymously(auth)
      .then((response) => setPlayerId(response.user.uid))
      .catch((error) => console.log(error));
  }, []);

  return playerId;
};
