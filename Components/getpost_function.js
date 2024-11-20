import axios from "axios";

export default async function getposts(userid) {
    let postdata = []; // Initialize postdata as an empty array
    try {
        const response = await axios.get("http://localhost:3000/api/blog/bulk");
        
        postdata=response.data.data;
        // console.log(postdata);
        
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        alert("Some Error Occurred While Fetching Posts");
    }

    // Filter out posts by the current user
    postdata = postdata.filter((post) => post.user.id !== userid);

    return postdata;
}
