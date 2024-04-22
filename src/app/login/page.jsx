"use client"

import { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db, googleProvider } from '../config/firebase';
import { AuthContext } from "../context/authContext";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";


const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext)

  {/* 
 useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = '/user-dashboard';
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

*/}



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch({ type: "LOGIN", payload: { ...user, role: userData.role } });
        if (userData.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/user-dashboard';
        }
      } else {
        setError('User does not exist. Regiter a new account');
      }

    } catch (error) {
      setError(error.message.replace('Firebase:', ''));
    }
  };


  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userRef = doc(db, 'users', user.uid);

      // Checking if the user exists in Firestore
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        dispatch({ type: "LOGIN", payload: { ...user, role: userData.role } });
        if (userData.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/user-dashboard';
        }
      } else {
        // Redirect to sign-up if the user does not exist in Firestore
        window.location.href = '/sign-up';
      }
    } catch (error) {
      setError(error.message.replace('Firebase:', ''));
    }
  };




  return (
    <>
      <div className="flex min-h-full bg-gray-50 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/kuai-sourcing-login.svg"
            alt="Kuai Sourcing"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-500 hover:text-blue-400">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Sign in
              </button>
            </div>
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={loginWithGoogle}
              >
                <FaGoogle className='font-bold text-xl mr-4' /> Sign in with Google Account
              </button>
            </div>
            <div>

            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/sign-up" className="font-semibold leading-6 text-blue-500 hover:text-blue-400">
              Register here for free.
            </a>
            {error && <p className="text-error text-sm">{error}</p>}
          </p>
        </div>
      </div>
    </>
  )
}

export default Login;