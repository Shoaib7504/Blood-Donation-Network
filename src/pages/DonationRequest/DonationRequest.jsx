// eslint-disable-next-line no-unused-vars
import React from "react";
import RequestCard from "../../Components/RequestCard/RequestCard";
import { HeartHandshake } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpiner from "../../Components/LoadingSpiner";

const DonationRequest = () => {

    const { data: details, isLoading, isError } = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/request`)
            return result.data
        }
    })

    if (isLoading) return <LoadingSpiner></LoadingSpiner>
    if (isError) console.log(isError);




    // console.log(details);
    return (
        <div>
            <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
                <div className="px-5 sm:px-8 lg:px-16 py-16">
                    <h1 className="font-display text-4xl font-black sm:text-6xl">Donation Requests
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Browse urgent and pending blood needs in a clean, scannable layout.

                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-12">

                {/* Cards */}
                {
                    details && details.length > 0 ? (<div className="grid justify-evenly gap-5 lg:grid-cols-2">
                        {details.map((request) => (
                            <div key={request._id} className="relative">

                                <RequestCard request={request} />


                            </div>
                        ))}
                    </div>) : null
                }

                {/* Simple Card (Modal Preview) */}
                <div className="mt-10 max-w-md mx-auto border rounded-2xl p-6 text-center shadow-md">

                    <div className="flex justify-center mb-3">
                        <div className="bg-red-100 p-3 rounded-full text-red-500">
                            <HeartHandshake />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold">
                        Donation confirmation modal
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        A simple preview card for confirmation UI.
                    </p>

                    <div className="flex justify-center gap-3 mt-5">
                        <button className="px-4 py-2 border rounded-lg">
                            Cancel
                        </button>

                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                            Confirm
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default DonationRequest;