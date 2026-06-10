import { Droplets, HeartHandshake, Users, WalletCards, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpiner from "../../Components/LoadingSpiner";

const Statistic = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading: requestsLoading,
    isError: requestsError,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const result = await axiosSecure.get("/request");
      return result.data;
    },
  });

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  if (requestsLoading || usersLoading) return <LoadingSpiner />;

  if (requestsError || usersError) {
    return (
      <p className="text-center text-red-500 py-10">
        Error loading data. Please try again.
      </p>
    );
  }

  const totalUsers = users.length;
  const totalRequests = requests.length;
  const activeDonors = users.filter((u) => u.role === "donor").length;
  const completedDonations = requests.filter((r) => r.status === "completed").length;

  const adminStats = [
    {
      label: "Total Users",
      value: totalUsers,
      delta: "+5.2%",
      icon: Users,
      accent: "bg-blue-50 text-blue-600",
      bar: "bg-blue-400",
    },
    {
      label: "Completed Donations",
      value: completedDonations,
      delta: "+12.4%",
      icon: WalletCards,
      accent: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-400",
    },
    {
      label: "Total Requests",
      value: totalRequests,
      delta: "+2.1%",
      icon: Droplets,
      accent: "bg-blush text-primary",
      bar: "bg-primary",
    },
    {
      label: "Active Donors",
      value: activeDonors,
      delta: "+8.0%",
      icon: HeartHandshake,
      accent: "bg-rose-50 text-rose-500",
      bar: "bg-rose-400",
    },
  ];

  return (
    <div className="statistic-page min-h-screen px-4 sm:px-6 lg:px-10 py-6">
      <style>{`
        /* ── page fade-in ── */
        .statistic-page { animation: stat-fade 0.5s ease both; }
        @keyframes stat-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── hero gradient pill ── */
        .stat-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 14px;
          border-radius: 999px;
          background: color-mix(in oklch, var(--primary) 12%, transparent);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        /* ── stat card animation ── */
        .stat-card {
          animation: stat-card-in 0.55s ease both;
        }
        .stat-card:nth-child(1) { animation-delay: 0.05s; }
        .stat-card:nth-child(2) { animation-delay: 0.12s; }
        .stat-card:nth-child(3) { animation-delay: 0.19s; }
        .stat-card:nth-child(4) { animation-delay: 0.26s; }
        @keyframes stat-card-in {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── progress bar fill ── */
        .stat-bar-fill {
          height: 4px;
          border-radius: 999px;
          animation: bar-grow 1.1s cubic-bezier(.4,0,.2,1) both;
          animation-delay: 0.5s;
          width: 0;
        }
        @keyframes bar-grow {
          from { width: 0%; }
          to   { width: var(--bar-w); }
        }

        /* ── hover lift ── */
        .stat-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px -8px color-mix(in oklch, var(--primary) 18%, transparent);
        }

        /* ── summary row ── */
        .summary-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 12px;
          background: var(--card);
          border: 1px solid var(--border);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted-foreground);
        }
        .summary-chip strong { color: var(--foreground); }
      `}</style>

      {/* ── Hero ── */}
      <section className="bg-hero-medical border border-border rounded-2xl mb-8 overflow-hidden">
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <div className="stat-hero-tag">
            <TrendingUp size={12} />
            Live Dashboard
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-tight text-foreground max-w-2xl">
            Statistics{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--foreground)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Overview
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Operational metrics across users, requests, and donations for the{" "}
            <span className="text-foreground font-semibold">LifeDrop</span> network.
          </p>

          {/* Quick-summary chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="summary-chip">
              <Users size={13} />
              <strong>{totalUsers}</strong> users
            </span>
            <span className="summary-chip">
              <Droplets size={13} />
              <strong>{totalRequests}</strong> requests
            </span>
            <span className="summary-chip">
              <HeartHandshake size={13} />
              <strong>{activeDonors}</strong> active donors
            </span>
            <span className="summary-chip">
              <WalletCards size={13} />
              <strong>{completedDonations}</strong> completed
            </span>
          </div>
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map(({ label, value, delta, icon: Icon, accent, bar }, i) => {
          // bar width as a proportion (max 96 %)
          const max = Math.max(totalUsers, totalRequests, activeDonors, completedDonations, 1);
          const pct = Math.round((value / max) * 96);

          return (
            <div
              key={label}
              className="stat-card rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card"
            >
              {/* top row */}
              <div className="flex items-start justify-between gap-3">
                <span className={`flex size-11 items-center justify-center rounded-xl ${accent}`}>
                  <Icon className="size-5" />
                </span>
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success whitespace-nowrap">
                  {delta}
                </span>
              </div>

              {/* label */}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </p>

              {/* value */}
              <strong className="mt-1 block font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
                {value.toLocaleString()}
              </strong>

              {/* progress bar */}
              <div className="mt-4 h-1 w-full rounded-full bg-border overflow-hidden">
                <div
                  className={`stat-bar-fill ${bar}`}
                  style={{ "--bar-w": `${pct}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {pct}% of peak volume
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistic;