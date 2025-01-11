"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import BlogCard from "@/Components/Blogcard";
import BlogShow_Module from "@/Components/BlogShow_module";

export default function UserHome() {
    const [posts, setPosts] = useState([]);
    const [showBlogModule, setShowBlogModule] = useState(false);
    const [cid, setCid] = useState(null);
    const [userid, setUserid] = useState(null);

    // Fetch userid from localStorage on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserid = localStorage.getItem("uid");
            setUserid(storedUserid);
        }
    }, []); // Run only once on component mount

    // Fetch user posts when the userid is available
    useEffect(() => {
        if (!userid) return;

        // Define `getUserPosts` inside the `useEffect`
        async function getUserPosts() {
            try {
                const response = await axios.get("/api/blog", {
                    headers: {
                        userid: userid, // Use the state variable here
                    },
                });
                setPosts(response.data.posts);
            } catch (error) {
                alert("Some Error Occurred");
                console.error(error.message);
            }
        }

        getUserPosts();
    }, [userid]); // Re-run this effect when userid changes

    function handleOnclick(postid) {
        setCid(postid);
        setShowBlogModule(true);
    }

    return (
        <>
            <div className="mx-auto w-[80%]">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="hover:cursor-pointer">
                            <BlogCard
                                author={post.user.name}
                                date={post.date}
                                title={post.title}
                                content={
                                    post.content.length < 20
                                        ? post.content
                                        : post.content.slice(0, 200) + "..."
                                }
                                onClick={() => handleOnclick(post.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div className="mt-8 text-2xl font-mono space-y-4">
                        <div>No Blogs Posted...</div>
                        <div>Add One</div>
                    </div>
                )}
            </div>
            {showBlogModule && cid && (
                <BlogShow_Module
                    cid={cid}
                    setShowBlogModule={setShowBlogModule}
                />
            )}
        </>
    );
}
