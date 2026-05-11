import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../Components/LoadingSpiner";
import useRole from "../../Hooks/useRole";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
   const {role } = useRole();
  console.log("ROLE", role);
  
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
  const statsData = [
    {
      id: 1,
      label: "Total Requests",
      value: requests.length,
    },
    {
      id: 2,
      label: "Donations Completed",
      value: requests.filter(
        (r) => r.status === "completed"
      ).length,
    },
    {
      id: 3,
      label: "Active Requests",
      value: requests.filter(
        (r) => r.status === "pending"
      ).length,
    },
  ];

  const dashboardRows = requests.slice(0, 3);

  return (
    <div className="px-10">
      {/* Hero Section */}
      <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">
            Welcome back,{" "}
            {user ? user.displayName : "Aysha Raham"}
          </h1>

          <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">
            Here is a quick view of request activity and donor response.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-card"
          >
            <p className="text-sm text-muted-foreground">
              {item.label}
            </p>

            <strong className="mt-3 block font-display text-4xl text-primary">
              {item.value}
            </strong>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="mt-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="border-b border-border p-5 font-display text-xl font-bold">
            Recent Requests
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-155 text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Recipient</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Blood</th>
                  <th className="px-5 py-4">Time</th>
                </tr>
              </thead>

              <tbody>
                {dashboardRows.map((row) => (
                  <tr
                    key={row._id}
                    className="border-t border-border"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {row.name}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {row.location}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-glow">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;