// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import RequestCard from "../../Components/RequestCard/RequestCard";
import { HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";
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

    // 3. PAGINATION: Define state and variables
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Display 6 requests per page

    // Calculate pagination values
    const totalPages = Math.max(1, Math.ceil(allRequests.length / itemsPerPage));
    const safePage = Math.min(currentPage, totalPages);

    // Get the requests to display for the current page
    const paginatedRequests = allRequests.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    );

    // pagination range (smart ellipsis)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (safePage > 3) pages.push('...');

            const start = Math.max(2, safePage - 1);
            const end = Math.min(totalPages - 1, safePage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (safePage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    // console.log(paginatedRequests);
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
                    paginatedRequests && paginatedRequests.length > 0 ? (
                        <div className="grid justify-evenly gap-5 lg:grid-cols-2">
                            {paginatedRequests.map((request) => (
                                <div key={request._id} className="relative">
                                    <RequestCard request={request} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-10">No donation requests found.</p>
                    )
                }

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <nav
                        aria-label="Pagination"
                        className="mt-10 flex items-center justify-center gap-1 select-none"
                    >
                        {/* Previous */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium
                                       text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Prev
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map((page, idx) =>
                            page === '...' ? (
                                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                                    …
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`min-w-[40px] rounded-xl px-3 py-2 text-sm font-semibold cursor-pointer transition-all
                                        ${safePage === page
                                            ? 'bg-red-500 text-white shadow-md shadow-red-200'
                                            : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium
                                       text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </nav>
                )}

                {/* Simple Card (Modal Preview) */}
                {/* <div className="mt-10 max-w-md mx-auto border rounded-2xl p-6 text-center shadow-md">

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

                </div> */}
            </section>
        </div>
    );
};

export default DonationRequest;