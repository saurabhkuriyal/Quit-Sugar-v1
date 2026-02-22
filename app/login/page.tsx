"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const isValid = email.trim().length > 0 && password.length >= 1;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid) return;
        console.log("Login →", { email });
    }

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col relative overflow-hidden">

            {/* Ambient blobs — smaller on mobile */}
            <div className="absolute top-[-10%] left-[-15%] w-[70%] h-[40%] sm:w-[45%] sm:h-[45%] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-full blur-[100px] sm:blur-[130px] opacity-70 pointer-events-none" />
            <div className="absolute bottom-[-8%] right-[-15%] w-[65%] h-[35%] sm:w-[40%] sm:h-[40%] bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-[90px] sm:blur-[110px] opacity-60 pointer-events-none" />

            {/* Scrollable content — fills full height, safe-area aware */}
            <div className="relative z-10 flex flex-col justify-center items-center flex-1 w-full px-5 py-10 sm:py-16"
                style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>

                <div className="w-full max-w-[360px]">

                    {/* Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-[16px] bg-black mb-5 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 5-4 8a4 4 0 008 0c0-3-2.5-5-4-8z" />
                            </svg>
                        </div>
                        <h1 className="text-[26px] font-bold tracking-tight text-neutral-900 leading-tight">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-[15px] text-neutral-500">
                            Log in to continue your journey
                        </p>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-3 mb-6">

                        {/* Google */}
                        <button
                            id="btn-login-google"
                            type="button"
                            className="w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl border border-neutral-200 bg-white active:bg-neutral-100 hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm transition-all duration-150 text-[15px] font-medium text-neutral-700"
                        >
                            <span className="flex-shrink-0 w-5 h-5">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </span>
                            <span className="flex-1 text-left">Continue with Google</span>
                            <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Apple */}
                        <button
                            id="btn-login-apple"
                            type="button"
                            className="w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl border border-neutral-200 bg-white active:bg-neutral-100 hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm transition-all duration-150 text-[15px] font-medium text-neutral-700"
                        >
                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neutral-900">
                                    <path d="M16.462 1.518c.107.912-.27 1.82-.814 2.492-.576.715-1.52 1.27-2.434 1.2-.12-.886.319-1.808.844-2.44.577-.696 1.572-1.234 2.404-1.252zM19.698 8.508c-1.064-.637-2.273-.964-3.49-.944-1.077.016-2.104.343-2.991.8-.549.287-1.145.45-1.745.45-.626 0-1.25-.176-1.82-.477-.892-.458-1.86-.72-2.87-.738-1.948-.034-3.748 1.078-4.75 2.835-1.025 1.793-1.044 5.32.977 8.277.849 1.24 1.96 2.64 3.426 2.652.75.01 1.26-.25 1.804-.51.628-.302 1.29-.617 2.408-.617 1.12 0 1.757.313 2.376.613.546.264 1.066.518 1.855.504 1.498-.025 2.52-1.255 3.407-2.538 1.04-1.52 1.506-2.997 1.524-3.062l.01-.032c-.02-.01-2.97-1.16-2.997-4.605-.023-2.872 2.343-4.271 2.47-4.347l.016-.01c-.682-1.01-1.71-1.74-2.61-2.25z" />
                                </svg>
                            </span>
                            <span className="flex-1 text-left">Continue with Apple</span>
                            <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-neutral-100" />
                        <span className="text-xs text-neutral-400 font-medium tracking-wider">OR</span>
                        <div className="flex-1 h-px bg-neutral-100" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="login-email" className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`studio-input w-full px-4 py-[14px] rounded-xl text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 ${submitted && !email.trim() ? "border-red-300 bg-red-50" : ""
                                    }`}
                            />
                            {submitted && !email.trim() && (
                                <p className="text-xs text-red-500">Email is required.</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="login-password" className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-2 decoration-neutral-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`studio-input w-full px-4 py-[14px] pr-12 rounded-xl text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 ${submitted && !password ? "border-red-300 bg-red-50" : ""
                                        }`}
                                />
                                {/* Touch-friendly show/hide — 44×44px tap target */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {submitted && !password && (
                                <p className="text-xs text-red-500">Password is required.</p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                id="btn-login-submit"
                                type="submit"
                                className="btn-generate group inline-flex items-center justify-center w-full px-6 py-4 text-[15px] font-semibold text-white bg-black rounded-2xl hover:bg-neutral-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-all duration-150 shadow-lg shadow-black/10"
                            >
                                <span className="mr-2">Log In</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-8 text-center text-[14px] text-neutral-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            id="link-signup"
                            className="font-semibold text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-all"
                        >
                            Sign up
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}
