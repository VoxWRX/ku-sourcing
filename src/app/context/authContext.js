"use client"

import { createContext, useEffect, useReducer } from "react";
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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserInfo = async () => {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            dispatch({
              type: 'SET_USER_INFO',
              payload: {
                uid: user.uid, // Preserve the uid from the auth state
                ...userDoc.data(), // Spread the additional user info from Firestore
              }
            });
          } else {
            console.log("No additional user info found!");
          }
        };
  
        dispatch({ type: 'LOGIN', payload: user });
        fetchUserInfo();
      } else {
        dispatch({ type: 'LOGOUT' });
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