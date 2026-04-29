/* eslint-disable no-unused-vars */
import { MapPin, Search } from 'lucide-react';
import React from 'react';

const SearchDonor = () => {
    const donors = [
        { name: "Samia Akter", group: "O+", area: "Mirpur", last: "Available now", avatar: "SA" },
        { name: "Tanvir Ahmed", group: "A-", area: "Uttara", last: "Last donated 5 months ago", avatar: "TA" },
        { name: "Farhana Islam", group: "B+", area: "Gulshan", last: "Available this week", avatar: "FI" },
        { name: "Rafi Chowdhury", group: "AB-", area: "Banani", last: "Verified donor", avatar: "RC" },
        { name: "Mehedi Hossain", group: "O-", area: "Mohammadpur", last: "Emergency ready", avatar: "MH" },
        { name: "Priya Das", group: "A+", area: "Savar", last: "Available tomorrow", avatar: "PD" },
    ];

    return (
        <section className=" px-4 py-12">

            <section className="bg-hero-medical border-b rounded-xl mb-1 border-border">
                <div className="mx-auto ml-20  px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl font-black sm:text-6xl">Search Donors
                    </h1>
                    <p className="mt-4  text-lg text-muted-foreground">Filter verified donor profiles by blood group and location.

                    </p>
                </div>
            </section>

            <section className='max-w-7xl mx-auto'>
            {/* Filters */}

                <div className="rounded-3xl border  p-5 shadow-sm bg-white">
                    <div className="grid gap-4 md:grid-cols-4">

                        {["Blood group", "District", "Upazila"].map((label) => (
                            <label key={label} className="grid gap-2 text-sm font-semibold">
                                <span>{label}</span>
                                <select className="rounded-xl border px-4 py-2 text-gray-500 focus:ring-2">
                                    <option>Select {label}</option>
                                    <option>Dhaka</option>
                                    <option>O+</option>
                                    <option>Mirpur</option>
                                </select>
                            </label>
                        ))}

                        <button className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 self-end">
                            <Search size={18} />
                            Search
                        </button>

                    </div>
                </div>

                {/* Donor Cards */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {donors.map((donor) => (
                        <article
                            key={donor.name}
                            className="rounded-3xl hover-lift border p-6 shadow-sm bg-white hover:shadow-md transition"
                        >
                            <div className="flex items-center  justify-between">

                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 font-bold">
                                    {donor.avatar}
                                </span>

                                <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                    {donor.group}
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold">
                                {donor.name}
                            </h3>

                            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                <MapPin size={16} />
                                {donor.area}, Dhaka
                            </p>

                            <p className="mt-2 text-sm text-green-600">
                                {donor.last}
                            </p>

                            <button className="mt-5 w-full rounded-xl border border-red-300 py-2 text-red-500 hover:bg-red-50">
                                Contact Donor
                            </button>
                        </article>
                    ))}

                </div>
            </section>
        </section>
    );
};

export default SearchDonor;