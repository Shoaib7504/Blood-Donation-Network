// eslint-disable-next-line no-unused-vars
import React from "react";
import RequestCard from "../../Components/RequestCard/RequestCard";
import { HeartHandshake } from "lucide-react";

const DonationRequest = () => {
    const requests = [
        { name: "Ayesha Rahman", location: "Dhanmondi, Dhaka", group: "A+", time: "Today, 6:30 PM", status: "Pending" },
        { name: "Mahir Hasan", location: "Chattogram Medical", group: "O-", time: "Tomorrow, 9:00 AM", status: "Urgent" },
        { name: "Nusrat Jahan", location: "Sylhet Sadar", group: "B+", time: "Apr 28, 11:15 AM", status: "Pending" },
        { name: "Reza Karim", location: "Rajshahi Central", group: "AB+", time: "Apr 29, 3:45 PM", status: "Matched" },
    ];

    return (
        <div>
            <section className="bg-hero-medical border-b border-border">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl font-black sm:text-6xl">Donation Requests
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Browse urgent and pending blood needs in a clean, scannable layout.

                    </p>
                </div>
            </section>;

            <section className="max-w-7xl mx-auto px-4 py-12">

                {/* Cards */}
                <div className="grid justify-evenly gap-5 lg:grid-cols-2">
                    {requests.map((request, index) => (
                        <div key={index} className="relative">

                            <RequestCard request={request} />


                        </div>
                    ))}
                </div>

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