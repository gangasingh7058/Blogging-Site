"use client";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { useRouter } from "next/navigation"; // Updated import for Next.js app directory

export default function NewBlog() {
    const userid=localStorage.getItem("uid");
    const router = useRouter();
    const [userdata, setuserdata] = useState({
        title: "",
        content: ""
    });
    const [loading, setLoading] = useState(false); // State to handle loading

    function handleOnChange(e) {
        const { name, value } = e.target;
        setuserdata({ ...userdata, [name]: value });
    }

    async function handleOnSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        if (!userdata.title || !userdata.content) {
            alert("Please fill in all fields."); // Basic validation
            return;
        }
        
        setLoading(true); // Set loading state to true
        try {
            const response = await axios.post("http://localhost:3000/api/blog/post", {
                title: userdata.title,
                content: userdata.content,
                userid: userid
            });
            console.log(response.data);
            alert("Blog Created Successfully");
            router.push("/User/userhome"); // Use relative route
        } catch (error) {
            alert("Some Error Occurred");
            console.error(error);
            setuserdata({ title: "", content: "" });
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className="mx-[10%] my-8 flex">
            <div className="h-[60px] flex items-center pr-4 ">
                <div className="mt-2">
                    <CiCirclePlus 
                        className={`text-6xl text-zinc-500 ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={loading ? null : handleOnSubmit} // Disable click if loading
                    />
                </div>
                <div className="text-6xl text-zinc-500 pl-2">|</div>
            </div>
            <div className="w-full mt-[-16px]">
                <form onSubmit={handleOnSubmit}> {/* Attach handleOnSubmit to form */}
                    <input 
                        className="w-full h-[100px] text-6xl text-zinc-600 font-mono placeholder:text-6xl placeholder:font-mono placeholder:pl-2 pl-2 border-zinc-500 focus:outline-none focus:border-transparent" 
                        placeholder="Title"
                        name="title"
                        value={userdata.title}
                        onChange={handleOnChange}
                    />
                    <textarea 
                        className="w-full h-[450px] text-2xl font-mono mt-4 placeholder:pl-2 pl-2 focus:outline-none focus:border-transparent" 
                        placeholder="Tell Your story..."
                        name="content"
                        value={userdata.content}
                        onChange={handleOnChange}
                    />
                </form>
            </div>
        </div>
    );
}
