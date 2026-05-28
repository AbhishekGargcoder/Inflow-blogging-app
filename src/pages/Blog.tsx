import Appbar from "../components/Appbar";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { blogAtom } from '../store/atoms/blog'
import { useBlog } from "../hooks";
// import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Blog() {
    const { id } = useParams();

    const { loading, blog } = useBlog({ id });
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
            return;
        }
        // fetchBlogs(token);
    }, [navigate]);


    if (loading) {
        return (
            <div className="min-h-screen bg-white font-sans">
                <Appbar />
                <Loader />
            </div>)
    }
    console.log(blog);






    return (
        <div className="min-h-screen bg-white font-sans">
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
                rel="stylesheet"
            />

            <Appbar />

            <main className="pt-32 pb-20 px-6">
                <article className="max-w-2xl mx-auto">
                    {/* Category */}
                    <Link to="/blogs" className="mb-4 group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={14} className="group-hover:translate-x-1 transition-transform" />View All
                    </Link>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                            Philosophy & Culture
                        </span>
                        <div className="h-px flex-1 bg-gray-100" />
                        <span className="text-xs text-gray-400 italic">
                            8 min read
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-5xl md:text-6xl font-semibold text-gray-900 leading-[1.1] mb-10">
                        {blog.title}
                    </h1>

                    {/* Author Meta */}
                    <div className="flex items-center gap-4 mb-14 pb-10 border-b border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold">
                            {blog.author.name[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{blog.author.name}</p>
                            <p className="text-xs text-gray-500">Dec 14, 2023 · Inkwell Curator</p>
                        </div>
                    </div>

                    {/* Content Placeholder */}
                    <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-light">
                        <p className="first-letter:text-7xl first-letter:font-display first-letter:font-semibold first-letter:text-gray-900 first-letter:mr-3 first-letter:float-left">
                            {blog.content}
                        </p>
                        {/* <p>
                            Slow writing isn't just about the speed of your fingers on a keyboard. It's about the
                            deliberate cultivation of thought, the patience to let an idea mature before committing
                            it to paper. It's the difference between a fleeting status update and a story that
                            resonates across time.
                        </p> */}

                        {/* <blockquote className="py-10 px-8 border-l-2 border-gray-900 my-12 bg-gray-50 italic font-display text-2xl text-gray-800">
                            "True creativity requires the courage to be slow in a world that demands we be fast."
                        </blockquote>

                        <p>
                            As we navigate the digital landscape, we must find sanctuaries where the written word is
                            respected. Inkwell was built for this very purpose—to provide a refined space where
                            the focus is on quality, nuance, and the enduring power of narrative.
                        </p> */}
                    </div>
                </article>
            </main>
        </div>
    );
}
