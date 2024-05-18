import React from 'react';
import { useRef } from 'react';
import API from '../API/Api';

const SignupForm = () => {
  const username = useRef()
  const useremail = useRef()
  const userpassword = useRef()

  const  HandleSubmit =async (e) => {
    e.preventDefault()

    let submitdata={
      username:username.current.value,
      useremail:useremail.current.value,
      userpassword:userpassword.current.value,
    }
    console.log("submit data is",submitdata);
    try{
      await API.post("/signup",submitdata).then((e)=>{
        console.log("res backend",e);
      })

    }
    catch(e){
      console.log("errr with",e);

    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-md -mt-28 sm:mt-2 md:mt-4 lg:mt-6">
        <div className='flex items-center justify-center rounded-md py-2 mx-16 bg-blue-700 mb-2  '>
          <img src="./img/logoS.ico" className='rounded h-10' alt="" /> <span className='text-white font-semibold text-2xl p-1'>Stream Music</span>

        </div>

        <div className='mb-2'>
          <h2 className="text-[1.4rem]">Create Account for <span className='text-blue-600 font-semibold'>Stream Music</span></h2>
          <p>Listen your Favroite Artists and Albums</p>
        </div>
        <hr />
        <form className='mt-5'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={username}
              type="text"
              placeholder="Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={useremail}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              ref={userpassword}
              type="password"
              placeholder="*********"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-white hover:bg-gray-200 text-blue-700 font-bold py-2 px-2 border rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={HandleSubmit}

            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
