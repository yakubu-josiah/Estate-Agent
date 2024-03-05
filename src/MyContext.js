import { createContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../src/firebaseConfig'; 

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [userDocRef, setUserDocRef] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const docRef = db.collection('users').doc(user.uid);
      setUserDocRef(docRef);
    }
  }, []);

  return (
    <MyContext.Provider value={{ userDocRef }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
