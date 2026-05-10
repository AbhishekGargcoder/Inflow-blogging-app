import { Link, useNavigate } from "react-router-dom";
import { PenLine, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../store/atom/authAtom.tsx";


let setAuthAtom = (value: boolean) => void {

}
let navigate;

// font-family: "lora"; for create account text 
export default function Appbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    setAuthAtom = useSetRecoilState(authAtom);
    navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                        <PenLine size={18} className="text-white" />
                    </div>
                    <span className="font-display text-xl font-semibold text-gray-900 tracking-wide">
                        InkFlow
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <NavLink to="/stories">Stories</NavLink>
                    <NavLink to="/writers">Writers</NavLink>
                    <NavLink to="/membership">Membership</NavLink>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-6">
                    {/* <button className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Search size={20} strokeWidth={1.5} />
                    </button> */}
                    <div className="h-4 w-px bg-gray-200" />
                    {useRecoilValue(authAtom) ? (
                        <>
                            <button
                                onClick={logout}
                                className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Logout
                            </button>
                            <Link
                                to="/publish"
                                className="px-6 py-2.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-gray-700 transition-all active:scale-95 shadow-sm"
                            >
                                Write
                            </Link>
                        </>
                    )
                        : <Link
                            to="/signin"
                            className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Sign in
                        </Link>}



                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 animate-in slide-in-from-top-4 duration-200">
                    <div className="flex flex-col gap-6">
                        <MobileNavLink to="/stories" onClick={() => setIsMobileMenuOpen(false)}>Stories</MobileNavLink>
                        <MobileNavLink to="/writers" onClick={() => setIsMobileMenuOpen(false)}>Writers</MobileNavLink>
                        <MobileNavLink to="/membership" onClick={() => setIsMobileMenuOpen(false)}>Membership</MobileNavLink>
                        <div className="h-px bg-gray-100" />

                        {useRecoilValue(authAtom) ? <Link
                            to="/logout"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Logout
                        </Link> : <Link
                            to="/signin"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Sign in
                        </Link>}


                        <Link
                            to="/publish"
                            className="w-full py-3 bg-gray-900 text-white text-center text-xs font-semibold uppercase tracking-widest rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors relative group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all group-hover:w-full" />
        </Link>
    );
}

function MobileNavLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            className="text-lg font-display font-medium text-gray-900"
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

function logout() {
    // localStorage.setItem("token", "");
    localStorage.clear();
    setAuthAtom(false);
    navigate("/");

}