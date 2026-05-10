import { Link } from "react-router-dom";
import { Bookmark, Share2, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    readTime?: string;
    category?: string;
    image?: string;
}

export default function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate,
    readTime = "5 min read",
    category = "General",
    image = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
}: BlogCardProps) {
    return (
        <Link to={`/blog/${id}`} className="group block w-full max-w-4xl">
            <div className="flex flex-col md:flex-row gap-8 py-10 border-b border-gray-100 transition-all duration-300 hover:bg-gray-50/50 px-6 rounded-2xl group-hover:border-gray-200">

                {/* Image Section */}
                <div className="md:w-60 h-44 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[10px] text-white font-bold ring-4 ring-white">
                            {authorName[0].toUpperCase()}
                        </div>
                        <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-widest">{authorName}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-200" />
                        <span className="text-[11px] text-gray-400 uppercase tracking-widest">{publishedDate}</span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-950 transition-colors leading-tight">
                        {title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed font-light mb-6 line-clamp-2">
                        {content}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                {category}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                {readTime}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="text-gray-400 hover:text-gray-900 transition-colors p-1">
                                <Bookmark size={18} strokeWidth={1.5} />
                            </button>
                            <button className="text-gray-400 hover:text-gray-900 transition-colors p-1">
                                <Share2 size={18} strokeWidth={1.5} />
                            </button>
                            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white ml-2">
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
