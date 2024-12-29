"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignIn() {

   
    const route = useRouter();

    const [userdata, setUserdata] = useState({
        email: "",
        password: ""
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    const [isloadingSignIn,setisloadingSignin]=useState(false);

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    function handleOnChange(e) {
        const { name, value } = e.target;
        setUserdata({ ...userdata, [name]: value });
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        if (!userdata.email || !userdata.password) {
            alert("Enter Your Credentials");
        } else {
            setisloadingSignin(true);
            try {
                const response = await axios.post("/api/user/signin", userdata);

                if (response.data.success) {
                    localStorage.setItem("uid", response.data.userid);
                    localStorage.setItem("uemail", response.data.useremail);
                    route.push("/User/userhome");
                } else {
                    alert("No User With Given Details Found");
                }
            } catch (error) {
                alert("An Error Occurred");
                console.error(error.message);
            }
            setisloadingSignin(false);
        }
    }

    if (!hasLoaded) return null; // To Prevent SSR rendering issues

    return (
        <div className="w-screen h-screen flex">
            <div className="leftpart w-[50%] flex flex-col justify-center items-center bg-white p-10 shadow-lg">
                <div className="text-4xl font-mono font-bold mb-4">Sign In</div>
                <div className="text-zinc-400 mb-8">
                    Don't have an account?
                    <Link href="/signup" className="ml-2 underline text-zinc-600 hover:text-zinc-900">
                        Sign Up
                    </Link>
                </div>
                <form className="flex flex-col space-y-4 w-full max-w-xs" onSubmit={handleOnSubmit}>
                    <label htmlFor="email" className="font-bold font-mono text-lg">
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="email"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        name="email"
                        value={userdata.email}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="password" className="font-bold font-mono text-lg">
                        Password
                    </label>
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
                        disabled={isloadingSignIn}
                    >
                        Sign In
                    </button>
                </form>
            </div>
            <div className="rightpart w-[50%] bg-zinc-300 flex flex-col justify-center px-20 py-10">
                <div className="font-bold text-3xl">
                    "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </div>
                <div className="font-semibold mt-4 text-lg">Jules Winnfield</div>
                <div className="text-zinc-500 text-md">CEO, Acme Inc</div>
            </div>
        </div>
    );
}


