import { useEffect, useState } from "react"
import axios from "axios"
import { BACKENED_URL } from "../../config";
import { useNavigate } from "react-router-dom";

interface Blog {
    id: string,
    content: string,
    title: string,
    author: {
        name: string
    },
    published: boolean
}

export function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        try {
            console.log("try m hu");
            axios.get(`${BACKENED_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            }).catch(e => {
                console.log(e);
                console.log("Error");
                setLoading(false);
                navigate("/signin");
                return;
            })
        } catch (e) {
            console.log(e);
        }


    }, []);

    return {
        loading,
        blogs
    }
}


// 1. Create a global cache object outside the hook
const blogCache: Record<string, Blog> = {}; // hashmap or hashtable 
// C++ :  store key-value pairs with O(1) average lookup time.
// unordered_map<string, Blog> blogCache;
// Declared outside the hook, so it lives at the module level and 
// persists across renders and component re-mounts.


// Check if key exists
// if (blogCache[id]) { ... }

// // Get value by key
// setBlog(blogCache[id]);

// // Set value by key
// blogCache[id] = response.data.blog;
// This is a custom React hook called useBlog that fetches a blog post by ID, with a caching layer 
// to avoid redundant network requests.
export function useBlog({ id }: { id: string }) {
    // const [blog, setBlog] = useState<Blog | null>(null);
    // const [loading, setLoading] = useState(true);

    // 2. Initialize state with cached data if it exists
    const [blog, setBlog] = useState<Blog | null>(blogCache[id] || null);
    const [loading, setLoading] = useState(!blogCache[id]);

    useEffect(() => {

        // 3. If we already have the blog in the cache, don't fetch it again
        if (blogCache[id]) {
            setBlog(blogCache[id]);
            setLoading(false);
            return;
        }

        // 4. Otherwise, fetch from backend and save it to the cache

        axios.get(`${BACKENED_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            blogCache[id] = response.data.blog; // save to cache 
            setBlog(response.data.blog);       // update state to trigger re-render
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog
    }
}
//  /api/v1/blog/bulk