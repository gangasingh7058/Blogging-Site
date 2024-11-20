import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogShow_Module({ cid ,setShowBlogModule}) {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            // Only fetch if cid is provided
            if (!cid) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get("http://localhost:3000/api/blog/getblog", {
                    params: {
                        cid: cid,
                    },
                });

                if (response.data.success) {
                    setPost(response.data.data);
                } else {
                    throw new Error("Failed to fetch post");
                }
            } catch (error) {
                alert("An error occurred while fetching the post."); // More user-friendly alert
                console.error(error.message);
            } finally {
                setLoading(false); // Ensure loading is set to false after the request
            }
        };

        fetchBlogPost();
    }, [cid]); // Added cid as a dependency

    function handleonClick(){
       
        setShowBlogModule(false);        
    }

    // Render loading state or post content
    if (loading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
                <div className="text-white">Loading...</div> {/* Styled loading indicator */}
            </div>
        );
    }

    if (!post) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
                <div className="text-white">No post found.</div> {/* If no post data is available */}
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-80 p-4">
            <div className="bg-white text-black w-full max-w-3xl h-full max-h-[80%] rounded-lg shadow-lg p-8 overflow-hidden">
                <div className="text-4xl font-mono font-bold mb-4">{post.title}</div>
                <div className="my-4 text-zinc-500 flex space-x-2 font-serif">
                    <span className="text-zinc-700">{post.user.name}</span>
                    <span>Posted on {formatDate(post.date)}</span>
                </div>
                <div className="text-xl font-mono h-[60%] overflow-y-auto">{post.content}</div>
                <div className="mt-10 flex justify-end">
                    <button 
                    onClick={handleonClick}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-600">Close</button>
                </div>
            </div>
        </div>
    );
}

function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);

    // Format the date to "DD Month, YYYY"
    return date.toLocaleDateString('en-US', options);
}
