import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setIsLoggedIn(true);
      }
      console.log("User is not logged in");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { isLoggedIn, isLoading };
}
