import PropTypes from "prop-types";
import app from "../assets/Firebase/firebase.init";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const UserContext = createContext(null);

const auth = getAuth(app);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  const LogOut = () => {
    return signOut(auth);
  };

  const userInfo = { user, setUser, signIn, LogOut };
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node,
};
