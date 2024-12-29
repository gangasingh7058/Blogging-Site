"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import BlogCard from "@/Components/Blogcard";
import BlogShow_Module from "@/Components/BlogShow_module";

export default function UserHome() {
    const [posts, setPosts] = useState([]);
    const [showBlogModule,setShowBlogModule]=useState(false);
    const [cid,setcid]=useState(null);

    const userid=localStorage.getItem("uid");

    async function getUserPosts() {
        try {
            const response = await axios.get("http://localhost:3000/api/blog", {
                headers: {
                    "userid": userid
                }
            });
            // console.log(response.data.posts);
            setPosts(response.data.posts);
        } catch (error) {
            alert("Some Error Occurred");
            console.log(error.message);
        }
    }

    // Fetch user posts when the component mounts
    useEffect(() => {
        getUserPosts();
    }); // Empty dependency array means this runs once on mount

    function handleOnclick(postid){
        setcid(postid);
        setShowBlogModule(true);
    }

    return (<>
        <div className="mx-auto w-[80%]">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="hover:cursor-pointer">
                        <BlogCard author={post.user.name} date={post.date} title={post.title} content={(post.content.length<20?post.content:(post.content.slice(0,200)+"..."))} onClick={()=>handleOnclick(post.id)}/>
                    </div>
                ))
            ) : (
                <div className="mt-8 text-2xl font-mono space-y-4">
                    <div>No Blogs Posted...</div>
                    <div>Add One</div>
                </div>
            )}
        </div>
        {showBlogModule && cid &&<BlogShow_Module cid={cid} setShowBlogModule={setShowBlogModule} />}
        </>
    );
}
