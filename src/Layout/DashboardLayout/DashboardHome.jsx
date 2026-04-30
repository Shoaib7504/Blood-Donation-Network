// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../../Hooks/useAuth';

const DashboardHome = () => {
  const { user } = useAuth()
  console.log(user);
  
  const statsData = [
    { id: 1, label: "Total Requests", value: "28" },
    { id: 2, label: "Donations Completed", value: "16" },
    { id: 3, label: "Active Requests", value: "06" },

  ];

  const requests = [
    {
      name: "Ayesha Rahman",
      location: "Dhanmondi, Dhaka",
      group: "A+",
      time: "Today, 6:30 PM",
      status: "Pending",
    },
    {
      name: "Mahir Hasan",
      location: "Chattogram Medical",
      group: "O-",
      time: "Tomorrow, 9:00 AM",
      status: "Urgent",
    },
    {
      name: "Nusrat Jahan",
      location: "Sylhet Sadar",
      group: "B+",
      time: "Apr 28, 11:15 AM",
      status: "Pending",
    },
    {
      name: "Reza Karim",
      location: "Rajshahi Central",
      group: "AB+",
      time: "Apr 29, 3:45 PM",
      status: "Matched",
    },
  ];
  const tone =
    status === "Matched"
      ? "bg-success text-success-foreground"
      : status === "Urgent"
        ? "bg-destructive text-destructive-foreground"
        : "bg-warning text-warning-foreground";

  const dashboardRows = requests.slice(0, 3)
  return (
    <div>
      <section className="bg-hero-medical border-b mx-auto rounded-xl mb-1 mt-5 border-border">
        <div className="  px-4 py-16  sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl ml-20 font-black sm:text-6xl">Welcome back, {user?('Aysha Raham') :user.displayName}
          </h1>
          <p className="mt-4 max-w-2xl ml-20 text-lg text-muted-foreground">Here is a quick view of request activity and donor response.

          </p>
        </div>
      </section>
      <div className="grid gap-5 md:grid-cols-3">
        {statsData.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-border bg-card p-6 shadow-card"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <strong className="mt-3 block font-display text-4xl text-primary">
              {item.value}
            </strong>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="border-b border-border p-5 font-display text-xl font-bold">
            Recent requests
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-155 text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Recipient</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Blood</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {dashboardRows.map((row) => (
                  <tr key={row.name} className="border-t border-border">
                    <td className="px-5 py-4 font-semibold">{row.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.location}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-glow">
                        {row.group}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tone}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{row.time}</td>
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