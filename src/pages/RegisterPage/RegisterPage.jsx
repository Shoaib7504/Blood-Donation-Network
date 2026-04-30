/* eslint-disable no-unused-vars */
import { Droplets, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from '../../Hooks/useAuth';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, setUser, LoginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handelRegistration = (data) => {
        createUser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;

                setUser(user);

                toast.success("Account created successfully 🎉");

                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message || "Registration failed ❌");
            });
    };

    const handleGoogleLogin = () => {
        LoginWithGoogle()
            .then((result) => {
                setUser(result.user);

                toast.success("Google login successful 🚀");

                navigate('/');
            })
            .catch((error) => {
                toast.error("Google login failed ❌");
            });
    };

    return (
        <div>
            {/*  Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <section className="bg-hero-medical min-h-[calc(100vh-5rem)] px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">

                    {/* Left Content */}
                    <div className="hidden lg:block">
                        <div className="max-w-xl">
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Secure donor access</p>
                            <h1 className="mt-4 text-5xl font-black leading-tight">Join the LifeDrop donor network</h1>
                            <p className="mt-5 text-lg">
                                A warm, trustworthy account experience for donors, requesters, and volunteers.
                            </p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {["Verified donor profile", "Urgent request access"].map((item) => (
                                    <div key={item} className="rounded-3xl border p-5">
                                        <ShieldCheck className="text-primary" />
                                        <p className="mt-3 font-semibold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mx-auto w-full max-w-md rounded-[2rem] border p-6 sm:p-8">
                        <div className="text-center">
                            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <Droplets className="size-7" />
                            </span>
                            <h2 className="mt-5 text-3xl font-black">Create account</h2>
                            <p className="mt-2 text-sm text-gray-500">Start your journey today.</p>
                        </div>

                        <form onSubmit={handleSubmit(handelRegistration)} className="mt-7 grid gap-4">

                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <div className="flex items-center border rounded-full px-4 py-3 mt-1">
                                    <User className="text-red-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Ayesha Rahman"
                                        className="outline-none w-full"
                                        {...register('name', { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <div className="flex items-center border rounded-full px-4 py-3 mt-1">
                                    <Mail className="text-red-400 mr-2" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="outline-none w-full"
                                        {...register('email', {
                                            required: true,
                                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs mt-1 text-red-400">Valid email required</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium">Password</label>
                                <div className="flex items-center border rounded-full px-4 py-3 mt-1">
                                    <Lock className="text-red-400 mr-2" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="********"
                                        className="outline-none w-full"
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs mt-1 text-red-400">
                                        Password must have uppercase, number & symbol
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600">
                                Create Account
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="grow h-px bg-gray-200"></div>
                            <span className="mx-3 text-xs text-gray-400">OR</span>
                            <div className="grow h-px bg-gray-200"></div>
                        </div>

                        {/* Google */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full border py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50"
                        >
                            <span className="text-red-500 font-bold">G</span>
                            Login with Google
                        </button>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-red-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;