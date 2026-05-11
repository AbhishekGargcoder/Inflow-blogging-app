import Appbar from '../components/Appbar'
import BlogCard from '../components/BlogCard'
// import Loader from '../components/Loader';
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";

export default function Blogs() {

    const { loading, blogs } = useBlogs();

    if (loading) {
        return (  // LOADER ...
            <div className="mt-32 pt-40 pb-20 px-6 max-w-7xl mx-auto">
                {/* <Loader /> */}
                <BlogSkeleton />
                <BlogSkeleton />
            </div>

        );
    }






    return (
        <div className="min-h-screen bg-white font-sans">
            <Appbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left Side: Blogs List */}
                    <div className="flex-1">
                        <div className="mb-12">
                            <h1 className="font-display text-3xl md:text-5xl font-semibold text-gray-900 mb-4">Latest Stories</h1>
                            <p className="text-gray-500 font-light tracking-wide">Refined insights from the world's most curious minds.</p>
                        </div>

                        <div className="flex flex-col">
                            {blogs.map((blog: any) => (
                                <BlogCard
                                    key={blog.id}
                                    id={blog.id}
                                    authorName={blog.author?.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate="Dec 12, 2024"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Sidebar */}
                    <div className="hidden lg:block w-80"> { /* hidden on mobile view */}
                        <div className="sticky top-32 space-y-12">
                            {/* Trending Topics */}
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">Trending Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Design", "Philosophy", "Writing", "Technology", "Art", "Life"].map(tag => (
                                        <button key={tag} className="px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Staff Picks */}
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">Staff Picks</h3>
                                <div className="space-y-6">
                                    {[1, 2].map(i => (
                                        <div key={i} className="group cursor-pointer">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-5 h-5 rounded-full bg-gray-200" />
                                                <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-widest">Inkwell Staff</span>
                                            </div>
                                            <h4 className="font-display text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                                                How we built a sanctuary for writers in the digital age
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
