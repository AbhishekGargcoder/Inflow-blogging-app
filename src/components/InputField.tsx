import { useState } from "react";
import type { ReactNode } from "react";
interface InputFieldProps {
    icon: any;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: any) => void;
    suffix?: ReactNode;
}

export default function InputField({ icon: Icon, label, type = "text", placeholder, value, onChange, suffix = null }: InputFieldProps) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                {label}
            </label>
            <div className="relative">
                <Icon
                    size={16}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused ? "text-gray-900" : "text-gray-400"
                        }`}
                />
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full pl-10 pr-${suffix ? "10" : "4"} py-3 text-sm font-normal text-gray-900 bg-white border rounded placeholder-gray-400 outline-none transition-all duration-200 ${focused
                        ? "border-gray-900 ring-1 ring-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                        }`}
                />
                {suffix && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700 transition-colors">
                        {suffix}
                    </div>
                )}
            </div>
        </div>
    );
}
