import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

import { onAuthStateChanged, getAuth } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log("user", currentUser);

      if (currentUser) {
        axios.post("/jwt", { email: currentUser.email }).then((res) => {
          const token = res.data.token;
          localStorage.setItem("access-token", token);
          setLoading(false);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
