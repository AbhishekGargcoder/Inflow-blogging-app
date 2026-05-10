import { PenLine, CheckCircle2 } from "lucide-react";

export default function Quote() {
    const perks = [
        { text: "Publish unlimited posts" },
        { text: "Custom domain support" },
        { text: "Powerful analytics" },
    ];

    return (
        <div className="hidden lg:flex w-[440px] flex-shrink-0 bg-gray-900 flex-col justify-between p-14 relative overflow-hidden">

            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Top section */}
            <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-16">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                        <PenLine size={18} className="text-gray-900" />
                    </div>
                    <span className="font-display text-xl font-semibold text-white tracking-wide">
                        Inkwell
                    </span>
                </div>

                {/* Headline */}
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                    Start for free
                </p>
                <h1 className="font-display text-4xl font-semibold text-white leading-tight mb-5">
                    Write stories<br />
                    <em className="italic font-normal text-gray-300">that matter.</em>
                </h1>
                <div className="w-10 h-px bg-gray-600 mb-6" />
                <p className="text-sm text-gray-400 leading-loose font-light">
                    A refined space for writers who believe in the power of the written word.
                </p>
            </div>

            {/* Bottom section */}
            <div className="relative z-10">
                {/* Perks */}
                <ul className="mb-8 space-y-4">
                    {perks.map(({ text }) => (
                        <li key={text} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 size={12} className="text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-400">{text}</span>
                        </li>
                    ))}
                </ul>

                {/* Testimonial */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="w-6 h-px bg-gray-500 mb-4" />
                    <p className="text-sm text-gray-300 leading-relaxed italic mb-5 font-light">
                        "Inkwell changed how I share my ideas. The experience is simply beautiful."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs text-white font-semibold">
                            S
                        </div>
                        <div>
                            <p className="text-sm text-white font-medium">Sara Mendes</p>
                            <p className="text-xs text-gray-500">Food &amp; Travel Writer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}