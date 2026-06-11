/* eslint-disable no-unused-vars */
import { Activity, CheckCircle2, Clock3, Droplets, HeartHandshake, Mail, MapPin, Phone, Search, ShieldCheck, Sparkles, Stethoscope, UserRound, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import RequestCard from '../RequestCard/RequestCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SkeletonBlock = ({ className = '' }) => (
    <div className={`animate-pulse rounded-2xl bg-gradient-to-r from-muted/60 via-muted/30 to-muted/60 bg-[length:200%_100%] ${className}`}
        style={{ animation: 'shimmer 1.8s ease-in-out infinite' }}
    />
);

const HomeSkeleton = () => (
    <div className="space-y-20">
        {/* Hero Section Skeleton */}
        <section className="bg-hero-medical overflow-hidden">
            <div className="mx-auto grid min-h-[calc(80vh-5rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                <div className="space-y-6">
                    <SkeletonBlock className="h-8 w-64 rounded-full" />
                    <SkeletonBlock className="h-16 w-full max-w-lg" />
                    <SkeletonBlock className="h-16 w-3/4" />
                    <SkeletonBlock className="h-6 w-full max-w-md" />
                    <SkeletonBlock className="h-6 w-2/3" />
                    <div className="flex gap-3 pt-4">
                        <SkeletonBlock className="h-12 w-44 rounded-2xl" />
                        <SkeletonBlock className="h-12 w-40 rounded-2xl" />
                    </div>
                    <div className="grid max-w-xl grid-cols-3 gap-4 pt-4">
                        {[1, 2, 3].map(i => <SkeletonBlock key={i} className="h-20 rounded-2xl" />)}
                    </div>
                </div>
                <div className="relative">
                    <div className="mx-auto max-w-lg rounded-[2rem] border border-border p-6">
                        <SkeletonBlock className="h-48 rounded-[1.5rem]" />
                        <div className="mt-5 grid grid-cols-2 gap-4">
                            <SkeletonBlock className="h-20 rounded-3xl" />
                            <SkeletonBlock className="h-20 rounded-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Skeleton */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center space-y-4">
                <SkeletonBlock className="mx-auto h-6 w-32" />
                <SkeletonBlock className="mx-auto h-12 w-96" />
                <SkeletonBlock className="mx-auto h-5 w-80" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                        <SkeletonBlock className="size-12 rounded-2xl" />
                        <SkeletonBlock className="h-6 w-32" />
                        <SkeletonBlock className="h-4 w-full" />
                        <SkeletonBlock className="h-4 w-3/4" />
                    </div>
                ))}
            </div>
        </section>

        {/* Steps Skeleton */}
        <section className="bg-surface py-20">
            <div className="mx-auto mb-12 max-w-2xl text-center space-y-4">
                <SkeletonBlock className="mx-auto h-6 w-40" />
                <SkeletonBlock className="mx-auto h-12 w-80" />
                <SkeletonBlock className="mx-auto h-5 w-72" />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-5 md:grid-cols-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                            <SkeletonBlock className="size-11 rounded-full" />
                            <SkeletonBlock className="h-6 w-24" />
                            <SkeletonBlock className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Request Cards Skeleton */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center space-y-4">
                <SkeletonBlock className="mx-auto h-6 w-40" />
                <SkeletonBlock className="mx-auto h-12 w-80" />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                        <div className="flex items-center gap-4">
                            <SkeletonBlock className="size-14 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <SkeletonBlock className="h-5 w-40" />
                                <SkeletonBlock className="h-4 w-28" />
                            </div>
                            <SkeletonBlock className="h-8 w-16 rounded-xl" />
                        </div>
                        <SkeletonBlock className="h-4 w-full" />
                        <SkeletonBlock className="h-4 w-2/3" />
                        <div className="flex gap-3">
                            <SkeletonBlock className="h-10 w-28 rounded-xl" />
                            <SkeletonBlock className="h-10 w-28 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

const Banner = () => {
    const { data: details, isLoading, isError } = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/request`)
            return result.data
        }
    })

    if (isLoading) return <HomeSkeleton />
    if (isError) console.log(isError);

    // 1. Create a copy of the requests list (if we have data)
    let allRequests = [];
    if (details) {
        allRequests = [...details];
    }

    // 2. Sort the requests so the newest date & time comes first
    allRequests.sort((a, b) => {
        const dateA = new Date(a.date + "T" + (a.time || "00:00"));
        const dateB = new Date(b.date + "T" + (b.time || "00:00"));
        
        // Subtracting dates gives the difference in milliseconds (b - a for newest first)
        return dateB - dateA;
    });

    // 3. Slice the first 3 requests to show on the banner
    const sliceData = allRequests.slice(0, 3);
    // console.log(sliceData);


    const features = [
        { icon: Clock3, title: "Fast Response", text: "Urgent requests are surfaced clearly so donors can act when every minute matters." },
        { icon: ShieldCheck, title: "Trusted Donors", text: "Verified profile cues and availability details make donor discovery feel safe." },
        { icon: CheckCircle2, title: "Easy Process", text: "A calm flow guides visitors from intent to action without confusion." },
        { icon: HeartHandshake, title: "Community Support", text: "Built around people, families, hospitals, and local volunteer networks." },
    ];
    const steps = ["Register", "Search / Request", "Connect", "Donate"];

    return (
        <div>
            {/*  */}
            <section className="bg-hero-medical overflow-hidden">
                <div className="mx-auto grid min-h-[calc(80vh-5rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-semibold text-primary shadow-card">
                            <Sparkles className="size-4" /> Trusted community blood network
                        </div>
                        <h1 className="mt-7 max-w-3xl font-display text-5xl font-black leading-tight text-foreground sm:text-6xl lg:text-7xl">Save Lives, Donate Blood</h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">One compassionate decision can restore hope for patients, families, and entire communities. Find donors, respond to requests, and make every drop count.</p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link className="flex h-12 px-8 text-base rounded-2xl items-center bg-primary text-primary-foreground shadow-glow hover:bg-blood-deep hover:-translate-y-0.5" to="/dashboard/create-request"><Droplets />Join as a Donor</Link>
                            <Link className="flex h-12 px-8 text-base rounded-2xl items-center  border border-primary/20 bg-card text-primary shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/35" to="/search-donor"><Search />Search Donors</Link>
                        </div>
                        <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                            {["12K+ Donors", "4.8K Requests", "64 Districts"].map((item) => <div key={item} className="rounded-2xl bg-card/75 p-4 text-center shadow-card"><strong className="block text-lg text-primary">{item.split(" ")[0]}</strong><span className="text-xs text-muted-foreground">{item.substring(item.indexOf(" ") + 1)}</span></div>)}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="glass-panel relative mx-auto max-w-lg rounded-[2rem] border border-border p-6 hover-lift">
                            <div className="rounded-[1.5rem] bg-cta-medical p-8 text-primary-foreground">
                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-sm font-semibold">Emergency ready</span>
                                    <Stethoscope className="size-8" />
                                </div>
                                <div className="mt-12 flex items-end justify-between gap-6">
                                    <div>
                                        <p className="text-primary-foreground/80">Current need</p>
                                        <h3 className="mt-2 font-display text-6xl font-black">O-</h3>
                                    </div>
                                    <div className="grid gap-3">
                                        <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-3"><UserRound className="size-5" /> 42 nearby donors</span>
                                        <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-3"><MapPin className="size-5" /> 3.2 km radius</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="rounded-3xl bg-secondary p-5"><Activity className="text-primary" /><p className="mt-3 text-sm font-semibold">Live request matching</p></div>
                                <div className="rounded-3xl bg-blush p-5"><Users className="text-primary" /><p className="mt-3 text-sm font-semibold">Human donor network</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xl font-bold uppercase  text-primary">Why LifeDrop</p>
                    <h2 className="mt-3 font-display text-5xl font-bold text-foreground ">Designed for urgent, human action</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Clear signals, emotional warmth, and trustworthy UI patterns help donors move confidently.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ icon: Icon, title, text }) => (
                        <article
                            key={title}
                            className="hover-lift rounded-3xl border border-border bg-card p-6 shadow-card"
                        >
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-blush text-primary">
                                <Icon />
                            </span>

                            <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-surface py-20">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xl font-bold uppercase  text-primary">Recent requests</p>
                    <h2 className="mt-3 font-display text-5xl font-bold text-foreground ">People waiting for a match</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Urgency is highlighted with accessible badges and scannable details.</p>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="grid gap-5 md:grid-cols-4">
                        {steps.map((step, index) => <div key={step} className="relative hover-lift rounded-3xl border border-border bg-card p-6 shadow-card"><span className="flex size-11 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{index + 1}</span><h3 className="mt-6 font-display text-xl font-bold">{step}</h3><p className="mt-2 text-sm text-muted-foreground">{index === 0 ? "Create a verified donor profile." : index === 1 ? "Find donors or publish a request." : index === 2 ? "Coordinate safely and quickly." : "Give blood and save lives."}</p></div>)}
                    </div>
                </div>
            </section>


            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xl font-bold uppercase  text-primary">Recent requests</p>
                    <h2 className="mt-3 font-display text-5xl font-bold text-foreground ">People waiting for a match</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Urgency is highlighted with accessible badges and scannable details.</p>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                    {sliceData.map((request) => <RequestCard key={request.name} request={request} />)}
                </div>
            </section>

            {/* cta brand */}
            <section className="px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-cta-medical h-80 mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 text-center text-primary-foreground shadow-soft sm:px-10">
                    <h2 className="font-display text-3xl font-black sm:text-5xl">Your one donation can save 3 lives</h2>
                    <p className="mx-auto mt-4 mb-10 max-w-2xl text-primary-foreground/80">Step forward today and become the reason a family receives hopeful news.</p>
                    <Link className="bg-secondary text-secondary-foreground
                     shadow-sm hover:bg-secondary/80 py-5 px-8 rounded-2xl  text-lg"
                        to="/dashboard">Become a Donor</Link>
                </div>
            </section>


            {/* contract section */}
            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Contact</p>
                    <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Need guidance for a request?</h2>
                    <div className="mt-8 grid gap-4 text-muted-foreground">
                        <p className="flex items-center gap-3"><Phone className="text-primary" /> +880 1712 345 678</p>
                        <p className="flex items-center gap-3"><MapPin className="text-primary" /> 24 Humanity Avenue, Dhaka</p>
                        <p className="flex items-center gap-3"><Mail className="text-primary" /> hello@lifedrop.org</p>
                    </div>
                </div>
                <form className="rounded-3xl border border-border  bg-card p-6 shadow-card">
                    <div className="grid gap-4 sm:grid-cols-2"><input className="rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Name" /><input className="rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Email" /></div>
                    <textarea className="mt-4 min-h-36 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Message" />
                    <button className="mt-4 rounded-2xl px-5 py-3 bg-primary text-primary-foreground shadow-glow hover:bg-blood-deep hover:-translate-y-0.5" >Send Message</button>
                </form>
            </section>
        </div>

    );
};

export default Banner;