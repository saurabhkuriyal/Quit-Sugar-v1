"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpFormPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const isValid =
        email.trim().length > 0 &&
        password.length >= 8 &&
        password === confirmPassword &&
        agreed;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid) return;
        console.log("Sign up →", { email, password });
    }

    const EyeIcon = () => (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    );

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col relative overflow-hidden">

            {/* Ambient blobs */}
            <div className="absolute top-[-10%] right-[-15%] w-[70%] h-[40%] sm:w-[45%] sm:h-[45%] bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-full blur-[100px] sm:blur-[130px] opacity-70 pointer-events-none" />
            <div className="absolute bottom-[-8%] left-[-15%] w-[65%] h-[35%] sm:w-[40%] sm:h-[40%] bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-[90px] sm:blur-[110px] opacity-60 pointer-events-none" />

            <div
                className="relative z-10 flex flex-col justify-center items-center flex-1 w-full px-5 py-10 sm:py-16"
                style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
            >
                <div className="w-full max-w-[360px]">

                    {/* Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-[16px] bg-black mb-5 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 5-4 8a4 4 0 008 0c0-3-2.5-5-4-8z" />
                            </svg>
                        </div>
                        <h1 className="text-[26px] font-bold tracking-tight text-neutral-900 leading-tight">
                            Create your account
                        </h1>
                        <p className="mt-2 text-[15px] text-neutral-500">
                            Start your sugar-free journey today
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                Email
                            </label>
                            <input
                                id="email"
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
                            <label htmlFor="password" className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`studio-input w-full px-4 py-[14px] pr-12 rounded-xl text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 ${submitted && password.length < 8 ? "border-red-300 bg-red-50" : ""
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {submitted && password.length < 8 && (
                                <p className="text-xs text-red-500">Password must be at least 8 characters.</p>
                            )}
                            {/* Strength bar */}
                            {password.length > 0 && (
                                <div className="flex gap-1.5 pt-1">
                                    {[1, 2, 3, 4].map((level) => {
                                        const strength = password.length >= 12 ? 4 : password.length >= 10 ? 3 : password.length >= 8 ? 2 : 1;
                                        return (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${level <= strength
                                                        ? strength === 1 ? "bg-red-400" : strength === 2 ? "bg-yellow-400" : strength === 3 ? "bg-blue-400" : "bg-emerald-400"
                                                        : "bg-neutral-100"
                                                    }`}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirm ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`studio-input w-full px-4 py-[14px] pr-12 rounded-xl text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 ${passwordMismatch || (submitted && !confirmPassword)
                                            ? "border-red-300 bg-red-50"
                                            : confirmPassword && !passwordMismatch
                                                ? "border-emerald-300"
                                                : ""
                                        }`}
                                />
                                {/* Show/hide — full-height tap target */}
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                                {/* Match check icon — pushed left of the eye button */}
                                {confirmPassword.length > 0 && !passwordMismatch && (
                                    <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {passwordMismatch && (
                                <p className="text-xs text-red-500">Passwords do not match.</p>
                            )}
                        </div>

                        {/* Terms & Privacy — larger touch area */}
                        <div className="pt-1">
                            <label className="flex items-start gap-3.5 cursor-pointer">
                                <div className="relative mt-0.5 flex-shrink-0">
                                    <input
                                        id="terms-checkbox"
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    {/* Custom checkbox — 24px to meet touch guidelines */}
                                    <div className="w-6 h-6 rounded-md border border-neutral-300 bg-white peer-checked:bg-black peer-checked:border-black transition-all duration-150 flex items-center justify-center shadow-sm">
                                        {agreed && (
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-[14px] text-neutral-600 leading-snug select-none pt-0.5">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-800 transition-all"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-800 transition-all"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {submitted && !agreed && (
                                <p className="text-xs text-red-500 mt-2 ml-10">You must accept the terms to continue.</p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                id="btn-create-account"
                                type="submit"
                                className="btn-generate group inline-flex items-center justify-center w-full px-6 py-4 text-[15px] font-semibold text-white bg-black rounded-2xl hover:bg-neutral-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-all duration-150 shadow-lg shadow-black/10"
                            >
                                <span className="mr-2">Create Account</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Login link */}
                    <p className="mt-8 text-center text-[14px] text-neutral-500">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            id="link-login"
                            className="font-semibold text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-all"
                        >
                            Log in
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}
