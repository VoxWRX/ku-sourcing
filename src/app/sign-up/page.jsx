"use client"

import { useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, EmailAuthProvider, PhoneAuthProvider, RecaptchaVerifier } from '@firebase/auth';
import { setDoc, doc, getDoc } from '@firebase/firestore';
import { FaGoogle } from "react-icons/fa";


const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    otpCode: '',
  });
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');

  const { dispatch } = useContext(AuthContext);


  useEffect(() => {
    // Initialize the invisible reCAPTCHA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      window.recaptchaVerifier.render();
    }
  }, []);

  const sendOTP = async () => {
    setIsSendingOTP(true);
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, formData.phoneNumber, appVerifier);
      setConfirmationResult(result);
      console.log("OTP sent successfully.");
    } catch (error) {
      console.error("OTP isn't sent:", error);
      setError(error.message);
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsVerifyingOTP(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsVerifyingOTP(false);
      return;
    }
    if (!confirmationResult) {
      setError("No confirmation result available");
      setIsVerifyingOTP(false);
      return;
    }

    try {
      const verificationCode = formData.otpCode;
      const result = await confirmationResult.confirm(verificationCode);

      if (result) {
        // Create email and password account after phone verification
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Update Firestore with user details
        await setDoc(doc(db, 'users', user.uid), {
          email: formData.email,
          firstName: formData.firstName,
          familyName: formData.familyName,
          phoneNumber: formData.phoneNumber,
          isVerified: false,
          role: 'basic',
          profilePicture: null,
        }, { merge: true });

        dispatch({ type: "SIGNUP", payload: user });

        console.log("User signed up and phone verified with email linked");
        window.location.href = '/user-dashboard'; // Navigate to user dashboard
      }

    } catch (error) {
      console.error("Error during sign up or phone verification:", error);
      setError(error.message);
      setIsVerifyingOTP(false);
    }
  };



  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      console.log('User signed in with Google:', user);

      const userRef = doc(db, 'users', user.uid);
      // Checking if the user exists in Firestore
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        console.log('User does not exist, creating new document');
        await setDoc(userRef, {
          email: user.email,
          firstName: user.displayName ? user.displayName.split(' ')[0] : '',
          familyName: user.displayName && user.displayName.split(' ').length > 1 ? user.displayName.split(' ')[1] : '',
          role: 'basic',
          profilePicture: null,
          isVerified: false,

        });
        console.log('User document created');
      } else {
        console.log('User already exists in Firestore');
      }

      dispatch({ type: "SIGNUP", payload: user });
      console.log('Redirecting to user dashboard');
      window.location.href = '/user-dashboard';
    } catch (error) {
      console.error('Error signing in with Google or creating the user document:', error);
      setError(error.message);
    }
  };



  return (
    <>
      <div className="flex min-h-full bg-gray-50 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/kuai-logo.svg"
            alt="Kuai Sourcing"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div id="recaptcha-container"></div> {/* Invisible reCAPTCHA container */}
          <form className="space-y-6" onSubmit={handleSignUp}>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Family Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>


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
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+1"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <button
                type="button"
                className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={sendOTP}
                disabled={isSendingOTP}
              >
                {isSendingOTP ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
            <div>
              <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <input
                type="text"
                name="otpCode"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.otpCode}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                disabled={isVerifyingOTP}

              >
                {isVerifyingOTP ? 'Verifying...' : 'Sign Up'}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={loginWithGoogle}
              >
                <FaGoogle className='font-bold text-xl mr-4' /> Sign up with Google Account
              </button>
            </div>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="/login" className="font-semibold leading-6 text-blue-500 hover:text-blue-400">
              Login to your account here.
            </a>
            {error && <p className="text-error">{error}</p>}
          </p>
        </div>
      </div>
    </>

  );
};

export default SignUp;
