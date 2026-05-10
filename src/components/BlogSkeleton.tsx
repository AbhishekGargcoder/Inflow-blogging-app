import Appbar from "./Appbar";

export default function BlogSkeleton() {
    return (
        <main className="">
            <div className="flex flex-col lg:flex-row gap-16">
                <div role="status" className="max-w-sm animate-pulse ">
                    <Appbar />

                    {/*  blogcard skeleton */}
                    <div className="flex flex-col md:flex-row gap-8 py-10 border-b border-gray-100 transition-all duration-300 hover:bg-gray-50/50 px-6 rounded-2xl group-hover:border-gray-200">

                        {/* Image Section */}
                        <div className="md:w-60 h-44  flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                            <div className="flex items-center justify-center w-full h-48 bg-neutral-quaternary rounded-base sm:w-96">
                                <svg className="w-11 h-11 text-fg-disabled " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[10px] text-white font-bold ring-4 ring-white">
                                    <div className="bg-neutral-quaternary  rounded-full bg-gray-200 "></div>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-900 uppercase tracking-widest">
                                    <div className=" bg-neutral-quaternary  rounded-full bg-gray-200"></div>
                                </span>
                                <div className="w-1 h-1 rounded-full bg-gray-200" />
                                <span className="text-[11px] text-gray-400 uppercase tracking-widest">
                                    <div className=" bg-neutral-quaternary rounded-full bg-gray-200"></div>
                                </span>
                            </div>

                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-950 transition-colors leading-tight">
                                <div className="h-2.5 bg-neutral-quaternary rounded-full bg-gray-200"></div>
                            </h2>

                            <div className=" font-light mb-6 h-2 bg-neutral-quaternary rounded-full bg-gray-200"></div>

                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        <div className="h-2.5 bg-neutral-quaternary  rounded-full bg-gray-200 w-20 mb-4"></div>
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                        <div className="h-2.5 bg-neutral-quaternary  rounded-full bg-gray-200 w-20 mb-4"></div>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </main>
    )
}
