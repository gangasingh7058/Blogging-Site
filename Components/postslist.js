"use client";

import BlogCard from "@/Components/Blogcard";
import getposts from "./getpost_function";
import { useState, useEffect } from "react";
import BlogShow_Module from "./BlogShow_module";

export default function PostList() {
    const [postarray, setPostArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBlogModule, setShowBlogModule] = useState(false);
    const [cid, setCid] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            const userid = localStorage.getItem("uid");
            setLoading(true);
            try {
                const posts = await getposts(userid);
                setPostArray(posts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    function handleOnClick(postId) {        
        setCid(postId);  // Set the post ID
        setShowBlogModule(true);  // Show the blog module
    }

    return (
        <>
            <div>
                {loading ? (
                    <div className="mt-8 text-2xl font-mono">Fetching Data...</div>
                ) : postarray.length > 0 ? (
                    postarray.map((post) => (
                        <div key={post.id} className="border-b border-black border-spacing-3 my-4 hover:cursor-pointer">
                            <BlogCard
                                author={post.user?.name || "Unknown Author"}
                                title={post.title}
                                date={post.date.split("T")[0]}
                                content={post.content.slice(0, 200) + ".."}
                                onClick={() => handleOnClick(post.id)} // Pass post ID here
                                
                            />
                        </div>
                    ))
                ) : (
                    <div className="mt-8 text-2xl font-mono">No Posts Found</div>
                )}
            </div>
            {showBlogModule && cid && <BlogShow_Module cid={cid} setShowBlogModule={setShowBlogModule} />} {/* Pass cid */}
        </>
    );
}
