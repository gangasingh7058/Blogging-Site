"use client"
import React from "react";
import { useRouter } from "next/navigation";



export default function MyComponent({ children }) {

    const router=useRouter();

    function handleonclick(){
        router.push("http://localhost:3000/User/newblog");
    }

    return (
        <div className="px-4">
            <div className="flex justify-between items-center pr-12 py-4 border-b">
                <div className="text-4xl font-bold font-mono">MY DASHBOARD</div>
                <div>
                    <button onClick={handleonclick} className="bg-black text-white py-2 px-6 rounded-full hover:bg-white hover:text-black font-mono text-xl transition duration-300 ease-in-out">
                        Create New
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
}
