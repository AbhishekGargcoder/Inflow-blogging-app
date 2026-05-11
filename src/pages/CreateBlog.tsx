import { useState, useRef, useEffect } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKENED_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

type PostType = {
    title: string,
    content: string
}

export default function CreateBlog() {

    const [postData, setPostData] = useState<PostType>({
        title: "",
        content: ""
    });
    const [publishing, setPublishing] = useState(false);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    // Auto-resize the title textarea
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = "auto";
            titleRef.current.style.height = titleRef.current.scrollHeight + "px";
        }
    }, [postData.title]);

    // Auto-resize the content textarea
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [postData.content]);

    const publishBlog = async () => {
        if (!postData.title.trim() || !postData.content.trim()) return;
        setPublishing(true);
        try {
            const response = await axios.post(`${BACKENED_URL}/api/v1/blog`, {
                title: postData.title,
                content: postData.content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.blog.id}`);
        } catch (e) {
            console.error("Error publishing blog", e);
            alert("Failed to publish blog. Please try again.");
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-gray-200">
            <Appbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-gray-400 text-xs tracking-[0.2em] uppercase font-bold">Draft in progress</p>
                        </div>
                        <button
                            onClick={publishBlog}
                            disabled={publishing || !postData.title.trim() || !postData.content.trim()}
                            className="px-6 py-2.5 bg-[#1A8917] text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#1A7917] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
                        >
                            {publishing ? "Publishing..." : "Publish"}
                        </button>
                    </div>

                    <div className="relative group flex items-start gap-4">
                        <div className="mt-3 w-10 h-10 flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                            <PlusCircle size={32} strokeWidth={1} />
                        </div>
                        <textarea
                            ref={titleRef}
                            value={postData.title}
                            onChange={(e) => setPostData((obj) => ({ ...obj, title: e.target.value }))}
                            placeholder="Title"
                            className="w-full text-3xl md:text-4xl font-display font-semibold text-gray-900 bg-transparent outline-none resize-none placeholder:text-gray-200 leading-tight"
                            rows={1}
                        />
                    </div>

                    <div className="flex items-start gap-4 mt-2">
                        <div className="w-10 flex-shrink-0" /> {/* Spacer */}
                        <textarea
                            ref={contentRef}
                            value={postData.content}
                            onChange={(e) => setPostData((obj) => ({ ...obj, content: e.target.value }))}
                            placeholder="Tell your story..."
                            className="w-full text-xl md:text-2xl font-light text-gray-700 leading-relaxed bg-transparent outline-none resize-none placeholder:text-gray-400 min-h-[50vh]"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}