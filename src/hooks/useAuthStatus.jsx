import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        console.log("User is not logged in");
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { isLoggedIn, isLoading, user };
}
