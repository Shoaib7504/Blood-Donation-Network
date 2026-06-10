import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Activity, CheckCircle, Clock, TrendingUp } from "lucide-react";
import LoadingSpiner from "../../Components/LoadingSpiner";


const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axiosSecure.get("/request");
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpiner />;
  if (isError) return <p>Error loading requests...</p>;

  // statistics data
  const totalRequests = requests.length;
  const completedDonations = requests.filter((r) => r.status === "completed").length;
  const activeRequests = requests.filter((r) => r.status === "pending").length;
  const completionRate = totalRequests > 0 ? Math.round((completedDonations / totalRequests) * 100) : 0;

  const statsData = [
    {
      id: 1,
      label: "Total Requests",
      value: totalRequests,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
      ring: "ring-blue-100",
    },
    {
      id: 2,
      label: "Completed",
      value: completedDonations,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      ring: "ring-green-100",
    },
    {
      id: 3,
      label: "Active",
      value: activeRequests,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      ring: "ring-amber-100",
    },
    {
      id: 4,
      label: "Success Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-blush",
      ring: "ring-primary/10",
    },
  ];

  const dashboardRows = requests.slice(0, 5);

  return (
    <div className="px-3 sm:px-5 lg:px-8 py-4 sm:py-6">

      {/* Hero Section */}
      <section className="bg-hero-medical border-b rounded-xl mb-6 border-border">
        <div className="px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
          <p className="text-sm font-semibold text-primary/80 uppercase tracking-wider">
            Dashboard Overview
          </p>
          <h1 className="mt-2 font-display text-2xl sm:text-4xl lg:text-5xl font-black text-foreground">
            Welcome back,{" "}
            <span className="text-primary">
              {user ? user.displayName?.split(" ")[0] : "User"}
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            Here's a quick view of request activity and donor response.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-sm hover-lift"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                {item.label}
              </p>
              <span className={`flex size-8 sm:size-10 items-center justify-center rounded-xl ${item.bg} ring-1 ${item.ring}`}>
                <item.icon className={`size-4 sm:size-5 ${item.color}`} />
              </span>
            </div>

            <strong className={`mt-2 sm:mt-3 block font-display text-2xl sm:text-4xl ${item.color}`}>
              {item.value}
            </strong>
          </div>
        ))}
      </div>

      {/* Recent Requests Table */}
      <div className="mt-6">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-4">
            <h2 className="font-display text-base sm:text-xl font-bold">
              Recent Requests
            </h2>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              Last {dashboardRows.length}
            </span>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/50 text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Recipient</th>
                  <th className="px-5 py-3.5 font-semibold">Location</th>
                  <th className="px-5 py-3.5 font-semibold">Blood</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboardRows.map((row) => (
                  <tr
                    key={row._id}
                    className="border-t border-border/60 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {row.name}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {typeof row.location === "string"
                        ? row.location
                        : `${row.location?.district || ""}, ${row.location?.hospital || ""}`}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                        {row.blood}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-border/60">
            {dashboardRows.map((row) => (
              <div key={row._id} className="px-4 py-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{row.name}</p>
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    {row.blood}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {typeof row.location === "string"
                      ? row.location
                      : `${row.location?.district || ""}`}
                  </span>
                  <span>{row.date}</span>
                </div>
              </div>
            ))}
          </div>

          {dashboardRows.length === 0 && (
            <div className="px-5 py-12 text-center text-muted-foreground">
              No requests found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;