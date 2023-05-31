import { useState, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

export const useAuth = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    signInAnonymously(auth)
      .then((response) => setPlayerId(response.user.uid))
      .catch((error) => console.log(error));
  }, []);

  return playerId;
};
