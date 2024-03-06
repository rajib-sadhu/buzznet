import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";

import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userRegister = async (email, password) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log("user", currentUser);

      if (currentUser) {
        axios
          .post("https://buzznet-server.vercel.app/api/v1/users/jwt", { email: currentUser.email })
          .then((res) => {
            const token = res?.data?.data;
            localStorage.setItem("access-token", token);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const value = {
    user,
    loading,
    userRegister,
    userLogin,
    userLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
