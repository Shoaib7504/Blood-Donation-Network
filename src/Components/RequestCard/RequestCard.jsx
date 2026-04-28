import { CalendarClock, MapPin } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import React from 'react';

const RequestCard = ({ request }) => {

    const tone =
        request.status === "Matched"
            ? "bg-success text-success-foreground"
            : status === "Urgent"
                ? "bg-destructive text-destructive-foreground"
                : "bg-warning text-warning-foreground";
    return (
        <div>
            <section className="hover-lift rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center  gap-4">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-blush font-display font-bold text-primary">
                            {request.name.split(" ").map((n) => n[0]).join("")}</span>
                        <div>
                            <h3 className="font-display text-lg font-bold">{request.name}</h3>
                            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="size-4" />{request.location}</p>
                        </div>
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-glow">{request.group}</span>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarClock className="size-4 text-primary" />{request.time}</span>
                    <div className="flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>
                            {request.status}
                        </span>
                        <button variant="soft">View Details</button></div>
                </div>
            </section>
        </div>
    );
};

export default RequestCard;