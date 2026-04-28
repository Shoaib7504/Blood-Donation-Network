/* eslint-disable no-unused-vars */
import { Droplets } from 'lucide-react';
import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io';
import { Link } from 'react-router';

const Footer = () => {
    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Donation Requests", to: "/donation-requests" },
        { label: "Search Donors", to: "/search-donors" },
        { label: "Funding", to: "/funding" },
    ]
    return (
        <div>
            <footer className="border-t border-border bg-surface">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
                    <div className="md:col-span-2">
                        <div className='flex gap-3'>

                            <span className="pulse-drop flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                                <Droplets className="size-6" fill="currentColor" />
                            </span>

                            <div className="leading-tight">
                                <span className="block font-display text-xl font-bold text-foreground">
                                    LifeDrop
                                </span>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Blood Donation Network
                                </span>
                            </div>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">A compassionate blood donation experience connecting verified donors with urgent requests through clear, human-centered design.</p>
                    </div>
                    <div>
                        <h3 className="font-display font-bold">Useful links</h3>
                        <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                            {navLinks.map((link) => <Link key={link.to} to={link.to} className="hover:text-primary">{link.label}</Link>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-display font-bold">Social</h3>
                        <div className="mt-4 flex gap-3">

                            <span className="flex size-10 items-center justify-center rounded-full bg-card font-bold text-primary shadow-card"><FaFacebookF /></span>
                            <span className="flex size-10 items-center justify-center rounded-full bg-card font-bold text-primary shadow-card"><IoLogoInstagram /></span>
                            <span className="flex size-10 items-center justify-center rounded-full bg-card font-bold text-primary shadow-card"><FaLinkedinIn /></span>
                            <span className="flex size-10 items-center justify-center rounded-full bg-card font-bold text-primary shadow-card">𝕏</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">© 2026 LifeDrop. Designed for hope, dignity, and faster response.</div>
            </footer>
        </div>
    );
};

export default Footer;