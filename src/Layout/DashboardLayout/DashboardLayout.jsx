import { Droplets, Home, LogOut, PlusCircle, User } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, Outlet } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const DashboardLayout = () => {
    const { Logout } = useAuth()

    const sideLinks = [
        { label: "Profile", to: "/dashboard/profile", icon: User },
        { label: "Dashboard Home", to: "/dashboard", icon: Home },
        { label: "My Requests", to: "/dashboard/my-requests", icon: Droplets },
        { label: "Create Request", to: "/dashboard/create-request", icon: PlusCircle },
    ]
    return (
        <div className='w-11/12 mx-auto grid grid-cols-8'>
            <div className='col-span-2 h-screen border-2 border-red-500'>
                <aside className="border-b border-border bg-card px-6 py-4 shadow-card lg:sticky lg:top-0 lg:h-screen  lg:border-b-0 lg:border-r">
                    <Link
                        to="/"
                        className="flex items-center gap-x-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

                    >
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
                    </Link>
                    <nav className="mt-8 grid gap-2">
                        {sideLinks.map(({ label, to, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                activeOptions={{ exact: to === "/dashboard" }}
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                                activeProps={{ className: "bg-blush text-primary" }}
                            >
                                <Icon className="size-5" />
                                {label}
                            </Link>
                        ))}
                        <button
                            onClick={Logout} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary">
                            <LogOut className="size-5" />
                            Logout
                        </button>
                    </nav>
                </aside>
            </div>
            <div className='col-span-6 h-screen  border-2 border-red-500'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;