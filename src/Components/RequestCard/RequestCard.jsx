import { CalendarClock, MapPin } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import React from 'react';

const RequestCard = ({ request }) => {
    // Safe location handling (supports string or object)
    const locationText =
        typeof request.location === "string"
            ? request.location
            : `${request.location?.district || ""}, ${request.location?.hospital || ""}`;

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
                        <button className="btn btn-soft">
                            View Details
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestCard;