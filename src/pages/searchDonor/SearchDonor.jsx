/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MapPin, Search } from 'lucide-react';
import React from 'react';
import LoadingSpiner from '../../Components/LoadingSpiner';

const SearchDonor = () => {

    const { data: details = [], isLoading, isError } = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/request`);
            return result.data;
        }
    });

    if (isLoading) return <LoadingSpiner />;
    if (isError) return <p className="text-red-500 text-center">Failed to load data</p>;

    return (
        <section className="px-4 py-12">

            {/* Header */}
            <section className="bg-hero-medical border-b rounded-xl mb-1 border-border">
                <div className="mx-auto ml-20 px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl font-black sm:text-6xl">
                        Search Donors
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Filter verified donor profiles by blood group and location.
                    </p>
                </div>
            </section>

            <section className='max-w-7xl mx-auto'>

                {/* Filters */}
                <div className="rounded-3xl border p-5 shadow-sm bg-white">
                    <div className="grid gap-4 md:grid-cols-4">

                        {["Blood group", "District", "Upazila"].map((label) => (
                            <label key={label} className="grid gap-2 text-sm font-semibold">
                                <span>{label}</span>
                                <select className="rounded-xl border px-4 py-2 text-gray-500 focus:ring-2">
                                    <option>Select {label}</option>
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

                    {details.map((donor) => {
           
                        const locationText =
                            typeof donor.location === "string"
                                ? donor.location
                                : `${donor.location?.district || ""}, ${donor.location?.hospital || ""}`;

                        return (
                            <article
                                key={donor._id} 
                                className="rounded-3xl hover-lift border p-6 shadow-sm bg-white hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">

                                    <span className="flex size-14 items-center justify-center rounded-2xl bg-blush font-display font-bold text-primary">
                                        {donor.name?.split(" ").map(n => n[0]).join("")}
                                    </span>

                                    <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                        {donor.blood}
                                    </span>
                                </div>

                                <h3 className="mt-5 text-xl font-bold">
                                    {donor.name}
                                </h3>

                                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="size-4" />
                                    {locationText}
                                </p>

                                <p className="mt-2 text-sm text-green-600">
                                    {donor.last || "Available"}
                                </p>

                                <button className="mt-5 w-full rounded-xl border border-red-300 py-2 text-red-500 hover:bg-red-50">
                                    Contact Donor
                                </button>
                            </article>
                        );
                    })}

                </div>
            </section>
        </section>
    );
};

export default SearchDonor;