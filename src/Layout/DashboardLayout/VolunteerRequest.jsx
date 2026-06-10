import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import LoadingSpiner from "../../Components/LoadingSpiner";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const VolunteerRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: managedUsers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["volunteer-request", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/volunteer-request`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpiner />;
  if (isError) console.log(isError);

  const handleUpdate = async (email) => {
    try {
      await axiosSecure.patch("/update-role", { email, role: "volunteer" });
      toast.success("Role updated successfully");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">

      {/* ── Header ── */}
      <section className="bg-hero-medical border border-border rounded-2xl mb-6 overflow-hidden">
        <div className="px-6 py-10 sm:px-10 sm:py-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Admin · Role Management
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-foreground leading-tight">
              Volunteer Requests
            </h1>
            <p className="mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
              Donors requesting to transition into a volunteer role. Review and
              approve each entry below.
            </p>
          </div>

          {/* Pending count badge */}
          <div className="flex-shrink-0">
            <div className="inline-flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-8 py-4 shadow-card">
              <span className="text-4xl font-black text-foreground leading-none">
                {managedUsers.length}
              </span>
              <span className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pending
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Empty state ── */}
      {managedUsers.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-8 py-20 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl">
            🎉
          </div>
          <p className="text-base font-semibold text-foreground">All caught up!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            No pending volunteer requests right now.
          </p>
        </div>
      ) : (
        <>
          {/* ── Desktop / Tablet table (sm+) ── */}
          <div className="hidden sm:block overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">

                <thead className="bg-secondary">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-12">
                      #
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      User Email
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Request
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {managedUsers.map((u, index) => (
                    <tr
                      key={u.email}
                      className="transition-colors hover:bg-secondary/50"
                    >
                      {/* Row number */}
                      <td className="px-5 py-4 text-xs font-mono text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          {/* Live pulse dot */}
                          <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                          </span>
                          <span className="font-medium text-foreground truncate max-w-[240px] lg:max-w-sm">
                            {u.email}
                          </span>
                        </div>
                      </td>

                      {/* Request badge */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-bold">
                          {/* Arrow icon */}
                          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                          Donor → Volunteer
                        </span>
                      </td>

                      {/* Approve button */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleUpdate(u.email)}
                          className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700 transition-all hover:bg-green-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          {/* ── Mobile cards (< sm) ── */}
          <div className="sm:hidden space-y-3">
            {managedUsers.map((u, index) => (
              <div
                key={u.email}
                className="rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                {/* Top row: email + index */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2 flex-shrink-0 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    </span>
                    <p className="text-sm font-medium text-foreground break-all leading-snug">
                      {u.email}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-mono text-muted-foreground">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom row: badge + button */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-bold">
                    Donor → Volunteer
                  </span>
                  <button
                    onClick={() => handleUpdate(u.email)}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700 transition-all hover:bg-green-200 active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Footer note ── */}
      <p className="mt-5 text-center text-xs text-muted-foreground">
        Approving a request permanently upgrades the donor's role to Volunteer.
      </p>

    </div>
  );
};

export default VolunteerRequest;