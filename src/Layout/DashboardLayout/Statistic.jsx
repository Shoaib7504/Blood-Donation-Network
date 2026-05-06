import { Droplets, HeartHandshake, Users, WalletCards } from "lucide-react";

const Statistic = () => {
    const adminStats = [
        { label: "Total Users", value: "12,480", delta: "+5.2%", icon: Users },
        { label: "Total Funding", value: "৳ 8.6L", delta: "+12.4%", icon: WalletCards },
        { label: "Total Requests", value: "3,219", delta: "+2.1%", icon: Droplets },
        { label: "Active Donors", value: "4,108", delta: "+8.0%", icon: HeartHandshake },
    ];
    return (
        <div className="px-10">
            <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
                <div className="  px-4 py-16  sm:px-6 lg:px-8">
                    <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">Statistics overview
                    </h1>
                    <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">Operational metrics across users, requests, and funding for the LifeDrop network.

                    </p>
                </div>
            </section>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {adminStats.map(({ label, value, delta, icon: Icon }) => (
                    <div key={label} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                        <div className="flex items-center justify-between">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-blush text-primary">
                                <Icon className="size-5" />
                            </span>
                            <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
                                {delta}
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">{label}</p>
                        <strong className="mt-1 block font-display text-4xl text-foreground">{value}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statistic;