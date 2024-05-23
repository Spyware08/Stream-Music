import React, { useState } from 'react';
import Login from '../Auth/Login';
import SignupForm from '../Auth/Signup';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  const showLogin = () => setIsLogin(true);
  const showSignup = () => setIsLogin(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center min-h-screen min-w-screen px-4 md:px-0 max-sm:py-5">
      <div className="mb-8 md:mb-32 flex flex-col items-center justify-center text-center md:text-left max-sm:mb-[-3rem]">
        <div className='flex items-center'>
          <img src="./img/logoS.ico" alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
          <h1 className="text-3xl md:text-4xl font-semibold ml-2">Stream Music</h1>
        </div>
        <br />
        <h2 className='text-2xl md:text-4xl w-full md:w-64 underline font-bold'>Listen to Millions of Songs with Us</h2>
      </div>
      <div className="w-full md:w-auto px-2">
        <div className='mb-8 md:-mb-20 text-center pt-10 md:pt-20 max-sm:mb-[-6rem]'>
          <button
            onClick={showLogin}
            className={`px-4 py-2 font-semibold ${isLogin ? 'border-b-2 border-blue-500' : ''}`}
          >
            Login
          </button>
          <button
            onClick={showSignup}
            className={`px-4 py-2 font-semibold ${!isLogin ? 'border-b-2 border-blue-500' : ''}`}
          >
            Signup
          </button>
        </div>
        <div>
          {isLogin ? <Login /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}
