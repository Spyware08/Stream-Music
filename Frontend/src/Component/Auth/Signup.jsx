import React from 'react';
import { useRef } from 'react';
import API from '../API/Api';
import { Toaster, toast } from 'sonner'

const SignupForm = () => {
  const username = useRef()
  const useremail = useRef()
  const userpassword = useRef()

  const HandleSubmit = async (e) => {
    e.preventDefault()

    if (username.current.value.length > 0 &&
      useremail.current.value.length > 0 &&
      userpassword.current.value.length > 0

    ) {
      let submitdata = {
        username: username.current.value,
        useremail: useremail.current.value,
        userpassword: userpassword.current.value,
      }
      try {
        await API.post("/signup", submitdata).then((e) => {
          toast.success("Account created")
        })

      }
      catch (e) {
        if (e.response.status === 409) {
          return toast.warning("User already Exists")
        }
        else { return toast.error("Internal server Error") }
      }

    }
    else {
      return toast.error("Please provide all Details!")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center mt-3">
      <div className="bg-white p-7 rounded-lg shadow-xl w-full max-w-md -mt-28 sm:mt-2 md:mt-4 lg:mt-6">
        <div className='flex items-center justify-center rounded-md p-2 mx-16 bg-blue-700 mb-2  '>
          <img src="./img/logoS.ico" className='rounded h-10' alt="" /> <span className='text-white font-semibold text-2xl p-1 max-sm:text-base'>Stream Music</span>

        </div>

        <div className='mb-2'>
          <h2 className="text-[1.4rem]">Create Account for <span className='text-blue-600 font-semibold'>Stream Music</span></h2>
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
      <Toaster richColors position="top-center" />
    </div>
  );
}


export default SignupForm;
