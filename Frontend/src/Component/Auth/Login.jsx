import React, { useRef, useState } from 'react';
import API from '../API/Api';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('demouser@gmail.com'); 
    const [password, setPassword] = useState('12345678'); 

    async function HandleSubmit(e) {
        e.preventDefault();
        toast.loading("Please Wait")

        if (email.length > 0 && password.length > 0) {
            let submitdata = {
                useremail: email,
                userpassword: password,
            };

            try {
                const res = await API.post("/login", submitdata);
                sessionStorage.setItem("userInfo", JSON.stringify(res.data.userdata));

                toast.success("Logged in successful");

                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } catch (e) {
                if (e.response.status === 404) {
                    toast.error("User not Exist!");
                } else if (e.response.status === 401) {
                    toast.info("Password Wrong!");
                } else {
                    toast.error("Server error!");
                }
            }
        } else {
            toast.error("Please provide all Info!");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-0">
            <div className="bg-white p-3 rounded-lg shadow-xl w-full max-w-md -mt-28 sm:mt-2 md:mt-4 lg:mt-6">
                <div className="flex flex-col justify-center px-4 py-4 lg:px-8">
                    <div className='flex items-center justify-center rounded-md py-2 px-2 mx-12 bg-blue-700 mb-2'>
                        <img src="./img/logoS.ico" className='rounded h-10' alt="" />
                        <span className='text-white font-semibold text-2xl p-1 max-sm:text-base'>Stream Music</span>
                    </div>
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <hr />
                <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 pb-10" method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email} // Bind the input value to the state
                                    onChange={(e) => setEmail(e.target.value)} // Update the state on change
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full outline-none rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password} // Bind the input value to the state
                                    onChange={(e) => setPassword(e.target.value)} // Update the state on change
                                    type="password"
                                    autoComplete="current-password"
                                    required=""
                                    className="block outline-none px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className='flex gap-5 px-10 pt-2'>
                            <button
                                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm border hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={HandleSubmit}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster richColors position="top-center" className="max-sm:w-[18rem] max-sm:mx-auto" autoClose={1500} />
        </div>
    );
}

export default Login;
