import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import InputField from "./InputField";

import type { UserSignupInput } from "@imcoder14/medium-common";
import axios from "axios";
import { BACKENED_URL } from "../../config";
// import { useSetRecoilState } from "recoil";
// import { authAtom } from "../store/atom/authAtom.tsx";


// const GoogleIcon = ({ size = 20 }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//     </svg>
// );
// const GithubIcon = ({ size = 20 }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2C6.48 2 2 6.48 2 12C2 16.57 4.84 20.44 9.26 21.9C9.63 21.97 9.88 21.72 9.88 21.47C9.88 21.25 9.87 20.85 9.86 20.27C7.13 20.89 6.39 18.71 6.39 18.71C5.97 17.62 5.2 17.21 5.2 17.21C4.22 16.56 5.19 16.58 5.19 16.58C6.28 16.67 6.85 17.75 6.85 17.75C7.84 19.25 9.39 18.74 10.01 18.46C10.11 17.72 10.41 17.24 10.71 16.92C8.48 16.69 6.15 15.82 6.15 11.26C6.15 10.11 6.54 9.15 7.19 8.39C7.1 8.15 6.82 7.06 7.21 6.2C7.21 6.2 8.07 5.94 9.86 7.03C10.43 6.87 11.02 6.8 11.61 6.8C12.2 6.8 12.79 6.87 13.36 7.03C15.15 5.94 16 6.2 16 6.2C16.39 7.06 16.11 8.15 16.01 8.39C16.66 9.15 17.05 10.11 17.05 11.26C17.05 15.83 14.73 16.68 12.49 16.92C12.83 17.26 13.12 17.79 13.12 18.6C13.12 19.75 13.11 20.64 13.11 21.47C13.11 21.72 13.36 21.98 13.73 21.9C18.15 20.44 21 16.57 21 12C21 6.48 16.52 2 12 2Z" fill="currentColor" />
//     </svg>
// );


export default function Auth({ type }: { type: "signup" | "signin" }) {

    const navigate = useNavigate();
    // const setAuthAtom = useSetRecoilState(authAtom);
    const [authInputs, setauthInputs] = useState<UserSignupInput>({
        name: "",
        username: "",
        password: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [err, setErr] = useState("");

    function update(field: string) {
        return function (e: any) {
            setauthInputs({
                ...authInputs,
                [field]: e.target.value,
            });
        };
    }
    let canSubmit: boolean;
    if (type === "signin") canSubmit = authInputs.username && authInputs.password;
    else canSubmit = authInputs.name && authInputs.username && authInputs.password && agreed;


    console.log("username", authInputs.username);
    console.log("name : ", authInputs.name);
    console.log("password : ", authInputs.password);
    console.log(agreed);


    async function sendRequest() {

        const page = type === "signup" ? "/signup" : "/signin";

        try {
            const response = await axios.post(`${BACKENED_URL}/api/v1/user${page}`, authInputs);
            console.log(response);

            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log("atom values changes to true");
                setToast({
                    type: 'success',
                    message: type === 'signin' ? ' Signing in successfully! Redirecting...' : 'Account created successfully! Redirecting...'
                });
                // wait for success state aur fir navigate karenge.
                setTimeout(() => {
                    setToast(null);
                    navigate('/');
                }, 1500);
            } else {  // now token is not received at the time of register, we get verfication email embedded token inside.
                setToast({
                    type: 'success',
                    message: data.msg || 'Signup failed. Please try again.'
                });
            }
        } catch (error) {
            if (error?.response?.data?.msg == "Invalid Credentials!") {
                setErr("Invalid Credentials!");
            }
            else if (error?.response?.data?.msg == "User with this username already exists!") {
                setErr("User with this username already exists!");
            }
            console.log(error?.response?.data?.msg);
        }
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (canSubmit) {
            await sendRequest();
        }
    };


    return (
        <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="mb-9">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        {type === "signup" ? "New Member" : "Welcome Back"}
                    </p>
                    <h2 className="font-display text-3xl font-semibold text-gray-900 mb-2">
                        {type === "signup" ? "Create account" : "Sign in"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {type === "signup" ? "Already a member?" : "Don't have an account?"}{" "}
                        <Link to={type === "signup" ? "/signin" : "/signup"} className="text-gray-900 font-semibold hover:underline transition-colors">
                            {type === "signup" ? "Sign in" : "Create one"}
                        </Link>
                    </p>
                </div>

                {/* Alert Toast Notification */}
                {toast && (
                    <div className={`flex items-start gap-3 p-3 rounded-lg mb-6 text-sm border transition-all duration-300 ${toast.type === 'success'
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                        : 'bg-rose-50 border-rose-100 text-rose-800'
                        }`}>
                        {toast.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        ) : (
                            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-left font-semibold">{toast.message}</span>
                    </div>
                )}


                {/* Social buttons
                <div className="flex gap-3 mb-7">
                    {[
                        { Icon: GithubIcon, label: "GitHub" },
                        { Icon: GoogleIcon, label: "Google" },
                    ].map(({ Icon, label }) => (
                        <button
                            key={label}
                            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border border-gray-200 rounded-lg bg-white hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
                        >
                            <Icon size={15} />
                            {label}
                        </button>
                    ))}
                </div> */}

                {/* Divider */}
                {/* <div className="flex items-center gap-4 mb-7">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 uppercase tracking-widest">or email</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div> */}

                {/* authInputs */}
                <form onSubmit={handleSubmit}>
                    {type === "signup" && (
                        <InputField
                            icon={User}
                            label="Full name"
                            placeholder="Abhishek Garg"
                            value={authInputs.name}
                            onChange={update("name")}
                        />
                    )}
                    <InputField
                        icon={Mail}
                        label="Username"
                        type="email"
                        placeholder="abhishek@example.com"
                        value={authInputs.username}
                        onChange={update("username")}
                    />
                    <InputField
                        icon={Lock}
                        label="Password"
                        type={showPass ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={authInputs.password}
                        onChange={update("password")}
                        suffix={
                            <span onClick={() => setShowPass(!showPass)}>
                                {showPass
                                    ? <EyeOff size={15} strokeWidth={1.5} />
                                    : <Eye size={15} strokeWidth={1.5} />}
                            </span>
                        }
                    />

                    {/* Terms checkbox */}

                    {type === "signup" && <label className="flex items-start gap-3 cursor-pointer mb-7">
                        <div
                            onClick={() => setAgreed(!agreed)}
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 border rounded flex items-center justify-center transition-all duration-200 ${agreed
                                ? "bg-gray-900 border-gray-900"
                                : "bg-white border-gray-300"
                                }`}
                        >
                            {agreed && (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                    <path
                                        d="M1 3.5L3.2 5.8L8 1"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>
                        <span className="text-xs text-gray-500 leading-relaxed">
                            I agree to the{" "}
                            <a href="#" className="text-gray-900 font-semibold hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-gray-900 font-semibold hover:underline">
                                Privacy Policy
                            </a>
                        </span>
                    </label>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`w-full py-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all duration-200 ${canSubmit
                            ? "bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.99]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {type === "signup" ? "Create Account" : "Sign In"}   <ArrowRight size={14} />
                    </button>
                    <p className=" p-3 my-3 text-xs font-semibold text-red-400 uppercase tracking-widest mb-3 ">
                        {err}
                    </p>

                    <p className="text-center text-xs text-gray-400 mt-5 tracking-wide">
                        🔒 Protected by industry-standard encryption
                    </p>
                </form>
            </div>
        </div>
    )
}


