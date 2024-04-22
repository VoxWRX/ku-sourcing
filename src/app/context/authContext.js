"use client"

import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./authReducer"
import { auth, db } from "../config/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem("user");
    try {
      return { currentUser: JSON.parse(storedUser || 'null') };
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      // Handle the error or set to a default state
      return { currentUser: null };
    }
  }
  return { currentUser: null };
};

const INITIAL_STATE = getInitialState();


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [isUserInfoFetched, setIsUserInfoFetched] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        const fetchUserInfo = async () => {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            const userInfo = {
              uid: user.uid, 
              ...userDoc.data(),
            };
            dispatch({
              type: 'SET_USER_INFO',
              payload: userInfo,
            });

          } else {
            console.log("No additional user info found!");
          }
          setIsUserInfoFetched(true); // Set to true after user info is fetched or not found

        };
  
        dispatch({ type: 'LOGIN', payload: user });
        fetchUserInfo();
      } else {
        dispatch({ type: 'LOGOUT' });
        setIsUserInfoFetched(true); // Set to true when there's no user

      }
    });
  
    return () => unsubscribe();
  }, []);
  


  const login = async (email, password) => {
    // Login logic
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch({ type: 'LOGIN', payload: user});
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = {
    currentUser: state.currentUser,
    isUserInfoFetched,
    dispatch,
    login,
    logout,
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={ contextValue }>
      {children}
    </AuthContext.Provider>
  );
};