"use client";

import Link from "next/link";

export default function SignUpPage() {
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">

            {/* Ambient Background Blobs */}
            <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-full blur-[130px] opacity-70 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-[110px] opacity-60 pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-sm">

                {/* Logo / Brand */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black mb-5 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 5-4 8a4 4 0 008 0c0-3-2.5-5-4-8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Create your account
                    </h1>
                    <p className="mt-1.5 text-sm text-neutral-500">
                        Start your sugar-free journey today
                    </p>
                </div>

                {/* Auth Options */}
                <div className="space-y-3">

                    {/* Continue with Google */}
                    <button
                        id="btn-continue-google"
                        className="group w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-neutral-700"
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
                        <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Continue with Apple */}
                    <button
                        id="btn-continue-apple"
                        className="group w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-neutral-700"
                    >
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neutral-900">
                                <path d="M16.462 1.518c.107.912-.27 1.82-.814 2.492-.576.715-1.52 1.27-2.434 1.2-.12-.886.319-1.808.844-2.44.577-.696 1.572-1.234 2.404-1.252zM19.698 8.508c-1.064-.637-2.273-.964-3.49-.944-1.077.016-2.104.343-2.991.8-.549.287-1.145.45-1.745.45-.626 0-1.25-.176-1.82-.477-.892-.458-1.86-.72-2.87-.738-1.948-.034-3.748 1.078-4.75 2.835-1.025 1.793-1.044 5.32.977 8.277.849 1.24 1.96 2.64 3.426 2.652.75.01 1.26-.25 1.804-.51.628-.302 1.29-.617 2.408-.617 1.12 0 1.757.313 2.376.613.546.264 1.066.518 1.855.504 1.498-.025 2.52-1.255 3.407-2.538 1.04-1.52 1.506-2.997 1.524-3.062l.01-.032c-.02-.01-2.97-1.16-2.997-4.605-.023-2.872 2.343-4.271 2.47-4.347l.016-.01c-.682-1.01-1.71-1.74-2.61-2.25z" />
                            </svg>
                        </span>
                        <span className="flex-1 text-left">Continue with Apple</span>
                        <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Continue with Email */}
                    <Link href="/signupemail">
                        <button
                            id="btn-continue-email"
                            className="group w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-neutral-700"
                        >
                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span className="flex-1 text-left">Continue with Email</span>
                            <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </Link>
                </div>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-100" />
                    <span className="text-xs text-neutral-400 font-medium tracking-wide">OR</span>
                    <div className="flex-1 h-px bg-neutral-100" />
                </div>

                {/* Login CTA */}
                <p className="text-center text-sm text-neutral-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        id="link-login"
                        className="font-semibold text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-all duration-200"
                    >
                        Log in
                    </Link>
                </p>

                {/* Legal */}
                <p className="mt-8 text-center text-[11px] text-neutral-400 leading-relaxed px-2">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-600 transition-colors">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-600 transition-colors">
                        Privacy Policy
                    </Link>
                    .
                </p>

            </div>
        </main>
    );
}
