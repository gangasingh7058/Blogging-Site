"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function SignUp() {

    const route=useRouter();

    const [userdata,setuserdata]=useState({
        username:"",
        email:"",
        password:""
    })

    function handleOnChange(e){
        const {name,value}=e.target;

        setuserdata({...userdata,
            [name]:value
        })
    }

    async function handleonSubmit(e){
        e.preventDefault();

        try {
            const response=await axios.post("http://localhost:3000/api/user/signup",userdata)

            if(!response.data.success){
                alert("User with Same email already exists")
            }
            else{
                localStorage.setItem("uid",response.data.userid)
                localStorage.setItem("uemail",response.data.useremail)
                route.push('/User/userhome')
            }
        } catch (error) {
            alert("An error Occured")
            console.log(error.message);
            
        }
    }

    


    return (
        <div className="w-screen h-screen flex">
            {/* Left Part */}
            <div className="leftpart w-[50%] flex flex-col justify-center items-center bg-white p-10 shadow-lg">
                <div className="text-4xl font-mono font-bold mb-4">Create an Account</div>
                <div className="text-zinc-400 mb-8">Already have an account?<a href="http://localhost:3000/signin" className="ml-2 underline text-zinc-600 hover:text-zinc-900">Sign In</a></div>
                <form onSubmit={handleonSubmit} className="flex flex-col space-y-4 w-full max-w-xs">
                    <label htmlFor="username" className="font-bold font-mono text-lg">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        name="username"
                        value={userdata.username}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="email" className="font-bold font-mono text-lg">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        name="email"
                        value={userdata.value}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="password" className="font-bold font-mono text-lg">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        name="password"
                        value={userdata.password}
                        onChange={handleOnChange}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

            {/* Right Part */}
            <div className="rightpart w-[50%] bg-zinc-300 flex flex-col justify-center px-20 py-10">
                <div className=" font-bold text-3xl ">
                    "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </div>
                <div className="font-semibold mt-4 text-lg">Jules Winnfield</div>
                <div className="text-zinc-500 text-md">CEO, Acme Inc</div>
            </div>
        </div>
    );
}
