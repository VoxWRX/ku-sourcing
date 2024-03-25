"use client"

import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

const Sign = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container bg-white">
        <form action="">
          <h1 className="font-bold">Create Account</h1>
          <div className="social-container">
            <a href="#" className="social border border-gray-400 rounded-full flex justify-center items-center m-1">
              <FaFacebookF />
            </a>
            <a href="#" className="social border border-gray-400 rounded-full flex justify-center items-center m-1">
              <FaGoogle />
            </a>
            <a href="#" className="social border border-gray-400 rounded-full flex justify-center items-center m-1">
              <FaTwitter />
            </a>
          </div>
          <span className="text-xs">or use your email for registration</span>
          <input type="text" name="name" placeholder="Name" className="bg-gray-200 border border-gray-400 p-2 w-full my-2" />
          <input type="email" name="email" placeholder="Email" className="bg-gray-200 border border-gray-400 p-2 w-full my-2" />
          <input type="password" name="password" placeholder="Password" className="bg-gray-200 border border-gray-400 p-2 w-full my-2" />
          <button className="bg-red-500 text-white font-bold rounded-full border border-red-500 py-2 px-6 uppercase tracking-wider transition duration-200 ease-in-out transform hover:scale-95">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1 className="font-bold">Sign In</h1>
          <div className="social-container">
            <a href="#" className="social border border-gray-400 rounded-full flex justify-center items-center m-1">
              <FaFacebookF />
            </a>
            <a href="#" className="social border border-gray-400 rounded-full flex justify-center items-center m-1">
              <FaGoogle />
            </a>
            <a href="#" className="social border border-gray-400 rounded-full flex justify-center items-center m-1">
              <FaTwitter />
            </a>
          </div>
          <span className="text-xs">or use your account</span>
          <input type="email" name="email" placeholder="Email" className="bg-gray-200 border border-gray-400 p-2 w-full my-2" />
          <input type="password" name="password" placeholder="Password" className="bg-gray-200 border border-gray-400 p-2 w-full my-2" />
          <a href="#" className="text-blue-500">Forgot Your Password</a>
          <button className="bg-red-500 text-white font-bold rounded-full border border-red-500 py-2 px-6 uppercase tracking-wider transition duration-200 ease-in-out transform hover:scale-95">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay bg-gradient-to-r from-red-500 to-red-700 text-white">
          <div className="overlay-panel overlay-left">
            <h1 className="font-bold">Welcome Back!</h1>
            <p className="text-sm">To keep connected with us please login with your personal info</p>
            <button className="ghost bg-transparent border border-white text-white font-bold rounded-full py-2 px-6 uppercase tracking-wider transition duration-200 ease-in-out transform hover:scale-95" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="font-bold">Hello, Friend!</h1>
            <p className="text-sm">Enter your details and start the journey with us</p>
            <button className="ghost bg-transparent border border-white text-white font-bold rounded-full py-2 px-6 uppercase tracking-wider transition duration-200 ease-in-out transform hover:scale-95" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
