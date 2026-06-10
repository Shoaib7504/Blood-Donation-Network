import { useQuery } from '@tanstack/react-query';
import { ClipboardList, Inbox } from 'lucide-react';
import RequestCard from '../../Components/RequestCard/RequestCard';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SkeletonCard = () => (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card space-y-4">
        <div className="flex items-center gap-4">
            <div className="size-14 animate-pulse rounded-2xl bg-muted" style={{ animation: 'shimmer 1.8s ease-in-out infinite', backgroundImage: 'linear-gradient(to right, var(--color-muted) 0%, transparent 50%, var(--color-muted) 100%)', backgroundSize: '200% 100%' }} />
            <div className="flex-1 space-y-2">
                <div className="h-5 w-36 animate-pulse rounded-xl bg-muted" style={{ animation: 'shimmer 1.8s ease-in-out infinite', backgroundImage: 'linear-gradient(to right, var(--color-muted) 0%, transparent 50%, var(--color-muted) 100%)', backgroundSize: '200% 100%' }} />
                <div className="h-4 w-28 animate-pulse rounded-xl bg-muted" style={{ animation: 'shimmer 1.8s ease-in-out infinite', backgroundImage: 'linear-gradient(to right, var(--color-muted) 0%, transparent 50%, var(--color-muted) 100%)', backgroundSize: '200% 100%' }} />
            </div>
            <div className="h-7 w-14 animate-pulse rounded-full bg-muted" style={{ animation: 'shimmer 1.8s ease-in-out infinite', backgroundImage: 'linear-gradient(to right, var(--color-muted) 0%, transparent 50%, var(--color-muted) 100%)', backgroundSize: '200% 100%' }} />
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
            <div className="h-4 w-40 animate-pulse rounded-xl bg-muted" style={{ animation: 'shimmer 1.8s ease-in-out infinite', backgroundImage: 'linear-gradient(to right, var(--color-muted) 0%, transparent 50%, var(--color-muted) 100%)', backgroundSize: '200% 100%' }} />
            <div className="h-9 w-28 animate-pulse rounded-2xl bg-muted" style={{ animation: 'shimmer 1.8s ease-in-out infinite', backgroundImage: 'linear-gradient(to right, var(--color-muted) 0%, transparent 50%, var(--color-muted) 100%)', backgroundSize: '200% 100%' }} />
        </div>
    </div>
);

const MyRequest = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myRequest = [], isLoading, isError } = useQuery({
        queryKey: ["myRequest", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure(`/my-request/${user.email}`)
            return result.data
        }
    })
    // console.log(myRequest);


    if (isError) console.log("there are a error");
    return (
        <div className='px-4 sm:px-6 lg:px-10 pb-10'>
            {/* ── Header Section ── */}
            <section className="bg-hero-medical border-b mx-auto rounded-xl mb-6 mt-5 border-border">
                <div className="px-5 sm:px-8 lg:px-16 py-10 sm:py-16">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blush text-primary">
                            <ClipboardList className="size-6" />
                        </div>
                        <div>
                            <h1 className="font-display text-3xl font-black sm:text-4xl lg:text-6xl">
                                My Requests
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm sm:text-lg text-muted-foreground">
                                All request cards keep statuses, actions, and urgency easy to scan.
                            </p>
                        </div>
                    </div>

                    {/* Request Count Badge */}
                    {!isLoading && (
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {myRequest.length}
                            </span>
                            {myRequest.length === 1 ? 'Request' : 'Requests'} found
                        </div>
                    )}
                </div>
            </section>

            {/* ── Loading Skeleton ── */}
            {isLoading && (
                <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
                    {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                </div>
            )}

            {/* ── Request Cards Grid ── */}
            {!isLoading && myRequest.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
                    {myRequest.map((request) => <RequestCard key={request._id || request.name} request={request} />)}
                </div>
            )}

            {/* ── Empty State ── */}
            {!isLoading && myRequest.length === 0 && (
                <div className="mx-auto mt-12 max-w-md text-center">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blush">
                        <Inbox className="size-10 text-primary" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                        No requests yet
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                        You haven't created any blood donation requests. When you submit a request, it will appear here.
                    </p>
                    <a
                        href="/dashboard/create-request"
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-blood-deep hover:-translate-y-0.5"
                    >
                        + Create Your First Request
                    </a>
                </div>
            )}
        </div>
    );
};

export default MyRequest;