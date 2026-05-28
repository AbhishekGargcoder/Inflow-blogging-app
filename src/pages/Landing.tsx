import Appbar from "../components/Appbar";
import { ArrowRight, TrendingUp, Bookmark, Share2, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../store/atom/authAtom.tsx";

// import axios from "axios";
// import { BACKENED_URL } from "../../config";


export default function Landing() {

    const navigate = useNavigate();
    const setAuthAtom = useSetRecoilState(authAtom);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
            return;
        }
        setAuthAtom(true);
        // fetchBlogs(token);
    }, [navigate]);


    const featuredStories = [
        {
            id: 1,
            author: "Julian Barnes",
            title: "The Silent Evolution of Modern Architecture",
            date: "Dec 12",
            readTime: "6 min read",
            category: "Design",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            author: "Elena Belova",
            title: "The Art of Slow Writing in a Fast-Paced World",
            date: "Dec 14",
            readTime: "8 min read",
            category: "Philosophy",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            author: "Marcus Aurelius",
            title: "Meditations on Digital Stoicism",
            date: "Dec 15",
            readTime: "12 min read",
            category: "Life",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            author: "Marcus Aurelius",
            title: "Meditations on Digital Stoicism",
            date: "Dec 15",
            readTime: "12 min read",
            category: "Life",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
                rel="stylesheet"
            />

            <Appbar />

            {/* Hero Section */}
            <header className="pt-40 pb-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-8">
                            <TrendingUp size={14} className="text-gray-900" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Trending on InkFlow</span>
                        </div>
                        <h1 className="font-display text-6xl md:text-8xl font-semibold text-gray-900 leading-[1.1] mb-8">
                            Stay <em className="italic font-normal text-gray-400">curious.</em>
                        </h1>
                        <p className="text-xl text-gray-500  leading-relaxed max-w-lg mb-10 font-light mx-auto lg:mx-0">
                            Discover stories, thinking, and expertise from writers on any topic.
                            A refined space for the curious mind.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link
                                to="/blogs"
                                className="px-10 py-4 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-gray-700 transition-all shadow-lg"
                            >
                                Start Reading
                            </Link>
                            <Link
                                to="/membership"
                                className="px-10 py-4 border border-gray-200 text-gray-900 text-xs font-semibold uppercase tracking-widest rounded-full hover:border-gray-900 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 hidden lg:block">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000"
                                alt="Writing"
                                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-bounce-slow">
                                <p className="text-sm italic text-gray-600 mb-4">"InkFlow is where my best ideas find their home."</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-900">— Julian Barnes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Stories */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-14">
                    <div className="flex items-center justify-between mb-16">
                        <h2 className="font-display text-4xl font-semibold text-gray-900">Featured Stories</h2>
                        <Link to="/blogs" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
                            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {featuredStories.map((story) => (
                            <Link key={story.id} to={`/blog/${story.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{story.category}</span>
                                        <div className="w-1 h-1 rounded-full bg-gray-200" />
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{story.readTime}</span>
                                    </div>
                                    <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors leading-tight">
                                        {story.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-[10px] text-white font-bold">
                                                {story.author[0]}
                                            </div>
                                            <span className="text-xs font-medium text-gray-600">{story.author}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Bookmark size={16} className="hover:text-gray-900 cursor-pointer" />
                                            <Share2 size={16} className="hover:text-gray-900 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                            <PenLine size={16} className="text-white" />
                        </div>
                        <span className="font-display text-lg font-semibold text-gray-900 tracking-wide">
                            InkFlow
                        </span>
                    </div>
                    <div className="flex gap-10">
                        <FooterLink href="#">About</FooterLink>
                        <FooterLink href="#">CONTACT</FooterLink>
                        <FooterLink href="#">HELP</FooterLink>
                        <FooterLink href="#">GitHub</FooterLink>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">© 2024 InkFlow Media</p>
                </div>
            </footer>
        </div>
    );
}

function FooterLink({ href, children }) {
    return (
        <a href={href} className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
            {children}
        </a>
    );
}
