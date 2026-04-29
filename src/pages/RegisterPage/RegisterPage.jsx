/* eslint-disable no-unused-vars */
import { Droplets, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <section className="bg-hero-medical min-h-[calc(100vh-5rem)] px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="hidden lg:block">
                        <div className="max-w-xl">
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Secure donor access</p>
                            <h1 className="mt-4 font-display text-5xl font-black leading-tight text-foreground">Join the LifeDrop donor network</h1>
                            <p className="mt-5 text-lg leading-8 text-muted-foreground">A warm, trustworthy account experience for donors, requesters, and volunteers—designed as UI only with no authentication logic attached.</p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {["Verified donor profile", "Urgent request access"].map((item) => <div key={item} className="rounded-3xl hover-lift border border-border bg-card/80 p-5 shadow-card"><ShieldCheck className="text-primary" /><p className="mt-3 font-semibold">{item}</p></div>)}
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto w-full max-w-md rounded-[2rem] border border-border bg-card p-6 hover-lift shadow-soft sm:p-8">
                        <div className="text-center">
                            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-blush text-primary"><Droplets className="size-7" fill="currentColor" /></span>
                            <h2 className="mt-5 font-display text-3xl font-black">Create account</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Start your donor journey today.</p>
                        </div>
                        <form className="mt-7 grid gap-4">
                            {/* full name */}
                            <div className="text-left mb-4">
                                <label className="text-sm font-medium">Email address</label>
                                <div className="flex items-center bg-secondary py-3 border rounded-full px-4  mt-1">
                                    <span className="text-red-400 mr-2"><User /></span>
                                    <input
                                        type="text"
                                        placeholder="Ayesha Rahman"
                                        className="outline-none w-full"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="text-left mb-4">
                                <label className="text-sm font-medium">Email address</label>
                                <div className="flex items-center bg-secondary py-3 border rounded-full px-4  mt-1">
                                    <span className="text-red-400 mr-2"><Mail /></span>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="outline-none w-full"
                                    />
                                </div>
                            </div>


                            {/* Password */}
                            <div className="text-left mb-3">
                                <label className="text-sm font-medium">Password</label>
                                <div className="flex items-center border bg-secondary rounded-full px-4 py-3 mt-1">
                                    <span className="text-red-400 mr-2"><Lock /></span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="********"
                                        className="outline-none w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ml-2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <span><Eye /></span> : <span><EyeOff /></span>}
                                    </button>
                                </div>
                            </div>

                           

                            {/* Login Button */}
                            <button  className="w-full bg-red-500 text-white py-3 rounded-full font-semibold shadow-md hover:bg-red-600 transition">
                                Login
                            </button>

                        </form>
                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="grow h-px bg-gray-200"></div>
                            <span className="mx-3 text-xs text-gray-400">
                                OR CONTINUE WITH
                            </span>
                            <div className="grow h-px bg-gray-200"></div>
                        </div>

                        {/* Google Login */}
                        <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50">
                            <span className="text-red-500 font-bold">G</span>
                            Login with Google
                        </button>

                        <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account <Link to='/login' className="font-bold text-primary"> Login</Link></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;