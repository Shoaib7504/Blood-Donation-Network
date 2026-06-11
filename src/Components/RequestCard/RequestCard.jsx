import { CalendarClock, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RequestCard = ({ request }) => {
    const [copied, setCopied] = useState(false);

    // Safe location handling (supports string or object)
    const locationText =
        typeof request.location === "string"
            ? request.location
            : `${request.location?.district || ""}, ${request.location?.hospital || ""}`;

    const handleContactDonor = () => {
        if (request.contact) {
            navigator.clipboard.writeText(request.contact)
                .then(() => {
                    setCopied(true);
                    toast.success(`Contact number of ${request.name} copied to clipboard!`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => {
                    console.error('Failed to copy contact number: ', err);
                    toast.error('Failed to copy contact number.');
                });
        } else {
            toast.warn('Contact number not available for this request.');
        }
    };

    return (
        <div>
            <section className="hover-lift rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4">

                    {/* Left Side */}
                    <div className="flex items-center gap-4">

                      
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-blush font-display font-bold text-primary">
                            {request.name?.split(" ").map(n => n[0]).join("")}
                        </span>

                    
                        <div>
                            <h3 className="font-display text-lg font-bold">
                                {request.name}
                            </h3>

                            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="size-4" />
                                {locationText}
                            </p>
                        </div>
                    </div>

                    {/* Blood Group */}
                    <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-glow">
                        {request.blood}
                    </span>
                </div>

              
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">

                    {/* Date + Time */}
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarClock className="size-4 text-primary" />
                        {request.date} at {request.time}
                    </span>

                    {/* Action */}
                    <div>
                        <button 
                            onClick={handleContactDonor}
                            className={`px-3 py-1.5 rounded-2xl font-medium transition-all duration-200 cursor-pointer ${
                                copied 
                                    ? "bg-green-100 text-green-700 hover:bg-green-200" 
                                    : "bg-blush text-primary hover:bg-accent hover:-translate-y-0.5"
                            }`}
                        >
                            {copied ? "Copied!" : "Contact Donor"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestCard;