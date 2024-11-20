"use client";

import { useRouter } from "next/navigation";

export default function UserNavbar() {
    const router = useRouter();

    const handleNavigation = (path) => {
        // Navigate to the specified path
        router.push(path);
    };

    return (
        <nav className="border-b w-full px-[6%] flex h-16 items-center justify-between">
            <div className="font-mono text-2xl">MEDIUM | LET'S BLOG</div>
            <div className="flex space-x-8">
                <button
                    onClick={() => handleNavigation('/User/userhome')}
                    className="font-mono text-lg text-gray-700 relative group"
                >
                    For You
                    <span className="block h-[2px] bg-black w-0 transition-all duration-300 group-hover:w-full absolute left-0 bottom-0" />
                </button>
                <button
                    onClick={() => handleNavigation('/User/dashboard')}
                    className="font-mono text-lg text-gray-700 relative group"
                >
                    Public
                    <span className="block h-[2px] bg-black w-0 transition-all duration-300 group-hover:w-full absolute left-0 bottom-0" />
                </button>
                <button
                    onClick={() => handleNavigation('/signin')}
                    className="font-mono text-lg text-gray-700 relative group"
                >
                    Log Out
                    <span className="block h-[2px] bg-black w-0 transition-all duration-300 group-hover:w-full absolute left-0 bottom-0" />
                </button>
            </div>
        </nav>
    );
}
