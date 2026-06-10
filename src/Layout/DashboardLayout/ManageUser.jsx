import { Users, ShieldCheck, HandHeart, Droplets, Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../Components/LoadingSpiner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    badge: "bg-blue-50 text-blue-600",
    btn: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  volunteer: {
    label: "Volunteer",
    icon: HandHeart,
    badge: "bg-emerald-50 text-emerald-600",
    btn: "bg-emerald-500 hover:bg-emerald-600 text-white",
  },
  donor: {
    label: "Donor",
    icon: Droplets,
    badge: "bg-blush text-primary",
    btn: "bg-primary hover:opacity-90 text-white",
  },
};

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null); // email being updated

  const {
    data: managedUsers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  const handleRoleChange = async (email, newRole) => {
    setUpdating(email + newRole);
    try {
      await axiosSecure.patch("/update-role", { email, role: newRole });
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(null);
    }
  };

  if (isLoading) return <LoadingSpiner />;
  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">
        Error loading users. Please try again.
      </p>
    );
  }

  const filtered = managedUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

  return (
    <div className="manage-user-page min-h-screen px-4 sm:px-6 lg:px-10 py-6">
      <style>{`
        .manage-user-page { animation: mu-fade 0.45s ease both; }
        @keyframes mu-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* row stagger */
        .mu-row {
          animation: mu-row-in 0.4s ease both;
          transition: background 0.15s ease;
        }
        .mu-row:hover { background: color-mix(in oklch, var(--primary) 4%, transparent); }
        @keyframes mu-row-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* role action buttons */
        .role-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .role-btn:hover { transform: translateY(-1px); }
        .role-btn:active { transform: scale(0.97); }
        .role-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* search box */
        .mu-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--card);
          width: 100%;
          max-width: 320px;
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .mu-search:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
        }
        .mu-search input {
          border: none;
          outline: none;
          background: transparent;
          color: var(--foreground);
          flex: 1;
          font-size: 0.875rem;
        }
        .mu-search input::placeholder { color: var(--muted-foreground); }

        /* card count badge */
        .mu-count {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 999px;
          background: color-mix(in oklch, var(--primary) 10%, transparent);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
        }

        /* mobile card layout */
        @media (max-width: 639px) {
          .mu-table-wrap { display: none; }
          .mu-cards { display: flex; flex-direction: column; gap: 12px; }
        }
        @media (min-width: 640px) {
          .mu-cards { display: none; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="bg-hero-medical border border-border rounded-2xl mb-8 overflow-hidden">
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3"
            style={{
              background: "color-mix(in oklch, var(--primary) 12%, transparent)",
              color: "var(--primary)",
            }}
          >
            <Users size={12} />
            Admin Panel
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
            Manage{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--foreground)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Users
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            View all registered users and update their roles across the{" "}
            <span className="text-foreground font-semibold">LifeDrop</span> network.
          </p>
        </div>
      </section>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        {/* search */}
        <label className="mu-search">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {/* count */}
        <span className="mu-count">
          <Users size={13} />
          {filtered.length} of {managedUsers.length} users
        </span>
      </div>

      {/* ── Desktop Table ── */}
      <div className="mu-table-wrap overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  User
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Current Role
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">
                  Assign Role
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, i) => {
                const roleConf = ROLE_CONFIG[u.role] ?? ROLE_CONFIG.donor;
                return (
                  <tr
                    key={u._id}
                    className="mu-row border-t border-border"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-bold text-primary">
                          {getInitials(u.name)}
                        </span>
                        <div>
                          <div className="font-semibold text-foreground leading-tight">
                            {u.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold capitalize ${roleConf.badge}`}
                      >
                        <roleConf.icon size={11} />
                        {u.role}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
                        {Object.entries(ROLE_CONFIG).map(([role, conf]) => (
                          <button
                            key={role}
                            onClick={() => handleRoleChange(u.email, role)}
                            disabled={
                              u.role === role || updating === u.email + role
                            }
                            className={`role-btn ${conf.btn} ${
                              u.role === role ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                          >
                            <conf.icon size={11} />
                            {conf.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <Users size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No users found</p>
              <p className="text-xs mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="mu-cards">
        {filtered.map((u, i) => {
          const roleConf = ROLE_CONFIG[u.role] ?? ROLE_CONFIG.donor;
          return (
            <div
              key={u._id}
              className="mu-row rounded-2xl border border-border bg-card p-4 shadow-card"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* top */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-bold text-primary">
                  {getInitials(u.name)}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground truncate">
                    {u.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {u.email}
                  </div>
                </div>
                <span
                  className={`ml-auto shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${roleConf.badge}`}
                >
                  <roleConf.icon size={10} />
                  {u.role}
                </span>
              </div>

              {/* role buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(ROLE_CONFIG).map(([role, conf]) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(u.email, role)}
                    disabled={u.role === role || updating === u.email + role}
                    className={`role-btn ${conf.btn} ${
                      u.role === role ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    <conf.icon size={11} />
                    {conf.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Users size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;