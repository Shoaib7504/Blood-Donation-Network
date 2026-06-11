/* eslint-disable no-unused-vars */
import { Droplets, Eye, EyeOff, Lock, Mail, ShieldCheck, Upload, User } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from "react-toastify";
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { saveOrUpdateUser } from '../../utils';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, setUser, LoginWithGoogle, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    // React hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handelRegistration = async (data) => {
        try {
            const PhotoImg = data.image?.[0];

            if (!PhotoImg) {
                toast.error("Please upload an image");
                return;
            }

            //  Create user
            const userCredential = await createUser(data.email, data.password);
            const user = userCredential.user;
            setUser(user);

            //  Upload image
            const formData = new FormData();
            formData.append("image", PhotoImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
            const res = await axios.post(image_API_URL, formData);

            const imageUrl = res.data.data.url;
            // console.log("Image URL:", imageUrl);

            //  Save user in DB
            await saveOrUpdateUser({
                name: data.name,
                email: data.email,
                photoURL: imageUrl
            });

            //  Update profile
            await updateUserProfile({
                displayName: data.name,
                photoURL: imageUrl
            });

            // console.log("Profile updated successfully");

            //   navigate
            toast.success("Account created successfully");
            navigate('/');

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Registration failed");
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await LoginWithGoogle();
            const user = result.user;

            setUser(user);

            await saveOrUpdateUser({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });

            toast.success("Google login successful");
            navigate('/');

        } catch (error) {
            console.error(error);
            toast.error("Google login failed");
        }
    };


    return (
        <div>
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
                                    <div key={item} className="rounded-3xl hover-lift  border p-5">
                                        <ShieldCheck className="text-primary" />
                                        <p className="mt-3 font-semibold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mx-auto w-full max-w-2xl hover-lift rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
                        <div className="text-center">
                            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-blush text-primary">
                                <Droplets className="size-7" fill="currentColor" />
                            </span>
                            <h2 className="mt-5 font-display text-3xl font-black">
                                Create account
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Start your donor journey today.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit(handelRegistration)} className="mt-7 grid gap-4">

                            {/* Avatar Upload */}
                            <div className="rounded-3xl border border-dashed border-primary/30 bg-blush/50 p-4">
                                <label className="flex cursor-pointer flex-col items-center gap-3 text-sm font-semibold">
                                    <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                                        <Upload className="size-5" />
                                    </span>
                                    <span>Upload avatar</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("image")}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Name */}

                            <div className="text-left mb-4">
                                <label className="text-sm font-medium">Name</label>
                                <div className="flex items-center bg-secondary py-3 border rounded-full px-4  mt-1">
                                    <span className="text-red-400 mr-2"><User /></span>
                                    <input
                                        type="text"
                                        placeholder="Ayesha Rahman"
                                        className="outline-none w-full"
                                        {...register('name', {
                                            required: true, minLength: 6,

                                        })}
                                    />

                                </div>
                                {
                                    errors.name?.type === 'required' &&
                                    <p className='text-xs mt-1 px-2 text-red-400'>Please Input Your Name</p>
                                }
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
                                        {...register('email', {
                                            required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                                        })}
                                    />

                                </div>
                                {
                                    errors.email?.type === 'required' && <p className='text-xs mt-1 px-2 text-red-400'>Please Input Your Email</p>
                                }
                            </div>

                            {/* Blood Group */}
                            <div className="text-left mb-4">
                                <label className="text-sm font-semibold">Blood Group</label>
                                <div className='flex items-center bg-secondary py-3 border rounded-full px-4  mt-1'>

                                    <select
                                        {...register("bloodGroup", { required: true })}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="Select">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>

                            {/* District & Upazila */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold">District</label>
                                    <div className='flex items-center bg-secondary py-3 border rounded-full px-4  mt-1'>

                                        <select
                                            {...register("district", { required: "District is required" })}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">Select District</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Chattogram">Chattogram</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Rajshahi">Rajshahi</option>
                                            <option value="Barishal">Barishal</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Rangpur">Rangpur</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                        </select>

                                        {errors.district && (
                                            <p className="text-xs text-red-400 mt-1">
                                                {errors.district.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold">Upazila</label>
                                    <div className='flex items-center bg-secondary py-3 border rounded-full px-4  mt-1'>

                                        <input
                                            type="text"
                                            {...register("upazila")}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
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
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ml-2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <span><Eye /></span> : <span><EyeOff /></span>}
                                    </button>
                                </div>
                                <span>
                                    {
                                        errors.password?.type === 'required' &&
                                        <p className='text-xs mt-1 px-2 text-red-400'>
                                            Password is required</p>
                                    }
                                    {errors.password?.type === 'minLength' &&
                                        <p className='text-xs mt-1 px-2 text-red-500'>
                                            Password must be 6 characters or longer
                                        </p>
                                    }
                                    {errors.password?.type === 'pattern' && (
                                        <p className='text-xs mt-1 px-2 text-red-500'>
                                            Must include uppercase, number & symbol
                                        </p>
                                    )}

                                </span>
                            </div>



                            {/* Confirm Password */}
                            <div className="text-left mb-3">
                                <label className="text-sm font-medium">Confirm Password</label>
                                <div className="flex items-center border bg-secondary rounded-full px-4 py-3 mt-1">
                                    <span className="text-red-400 mr-2"><Lock /></span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="********"
                                        className="outline-none w-full"
                                        {...register('confirm-password', {
                                            required: true,
                                            minLength: 6,
                                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ml-2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <span><Eye /></span> : <span><EyeOff /></span>}
                                    </button>
                                </div>
                                <span>
                                    {
                                        errors.password?.type === 'required' &&
                                        <p className='text-xs mt-1 px-2 text-red-400'>
                                            Password is required</p>
                                    }
                                    {errors.password?.type === 'minLength' &&
                                        <p className='text-xs mt-1 px-2 text-red-500'>
                                            Password must be 6 characters or longer
                                        </p>
                                    }
                                    {errors.password?.type === 'pattern' && (
                                        <p className='text-xs mt-1 px-2 text-red-500'>
                                            Must include uppercase, number & symbol
                                        </p>
                                    )}

                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm mb-5">
                                <label className="flex  items-center gap-2">
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <button className="text-red-500">Forgot password?</button>
                            </div>


                            {/* Submit */}
                            <button className="w-full cursor-pointer bg-red-500 text-white py-3 rounded-full font-semibold shadow-md hover:bg-red-600 transition">
                                Create Account
                            </button>

                        </form>
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-primary">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

            </section >
        </div >
    );
};

export default RegisterPage;