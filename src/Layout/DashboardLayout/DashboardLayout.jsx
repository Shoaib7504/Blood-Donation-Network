import { ActivityIcon, Droplets, HeartPulse, House, LogOut, User, UserRoundPen } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import LoadingSpiner from '../../Components/LoadingSpiner';

const DashboardLayout = () => {
    const { Logout } = useAuth()
    const { role, isReloading } = useRole()
    if(isReloading) return <LoadingSpiner></LoadingSpiner>
    return (
        <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-8">

            {/* Sidebar */}
            <div className="lg:col-span-2">
                <aside className="border-b border-border bg-card px-6 py-4 shadow-card 
                     lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">

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

                        {role === 'donor' && (
                            <>
                                <NavLink to='/dashboard/profile'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <User /> Profile
                                </NavLink>

                                <NavLink to='/dashboard'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <House /> Dashboard Home
                                </NavLink>

                                <NavLink to='/dashboard/my-requests'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <Droplets /> My Requests
                                </NavLink>

                                <NavLink to='/dashboard/create-request'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <HeartPulse /> Create Request
                                </NavLink>
                            </>
                        )}
                        {role === 'admin' && <> <NavLink to='/dashboard/statistic'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <ActivityIcon /> Statistic
                        </NavLink>
                            <NavLink to='/dashboard/profile'
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                <User /> Profile
                            </NavLink>
                            <NavLink to='/dashboard'
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                <House /> Dashboard Home
                            </NavLink>
                            <NavLink to='/dashboard/my-requests'
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                <Droplets />  My Requests
                            </NavLink>
                            <NavLink to='/dashboard/create-request'
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                <HeartPulse />  Create Request
                            </NavLink>
                            <NavLink to='/dashboard/manageUser'
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                <UserRoundPen />  ManageUser
                            </NavLink>
                        </>}
                        {
                            role === 'Volunteer' && <><NavLink to='/dashboard/profile'
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                <User /> Profile
                            </NavLink>
                                <NavLink to='/dashboard'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <House /> Dashboard Home
                                </NavLink>
                                <NavLink to='/dashboard/my-requests'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <Droplets />  My Requests
                                </NavLink>
                                <NavLink to='/dashboard/create-request'
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                                    <HeartPulse />  Create Request
                                </NavLink>
                            </>
                        }
                        {/* <NavLink to='/dashboard/statistic'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <ActivityIcon /> Statistic
                        </NavLink>
                        <NavLink to='/dashboard/profile'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <User /> Profile
                        </NavLink>
                        <NavLink to='/dashboard'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <House /> Dashboard Home
                        </NavLink>
                        <NavLink to='/dashboard/my-requests'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <Droplets />  My Requests
                        </NavLink>
                        <NavLink to='/dashboard/create-request'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <HeartPulse />  Create Request
                        </NavLink>
                        <NavLink to='/dashboard/manageUser'
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                            <UserRoundPen />  ManageUser
                        </NavLink> */}


                        <button
                            onClick={Logout}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary"
                        >
                            <LogOut className="size-5" />
                            Logout
                        </button>
                    </nav>
                </aside>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-6 border-2 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;